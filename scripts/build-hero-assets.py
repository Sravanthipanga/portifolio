#!/usr/bin/env python3
"""
Build the hero assets from the raw intro video.

  media/intro.mp4  ->  public/hero/hero.webm, public/hero/hero.mp4,
                       public/portrait-bust.webp, public/og.jpg

Pipeline
  1. Detect the person (dark pixels on the light backdrop) across sampled frames
     and build a tight, centred, head-to-toe crop with a 768:960 aspect ratio.
  2. Whiten the backdrop with colorlevels so it melts into the page under
     mix-blend-mode: multiply.
  3. Seamless loop: the clip plays from LOOP_FADE to LOOP_LEN and its last
     LOOP_FADE seconds are cross-faded into the first LOOP_FADE seconds
     (ffmpeg xfade for picture, numpy equal-power fade for sound, sample
     accurate). Nothing is stretched or retimed, so lips stay in sync.
  4. Export H.264/AAC mp4 and VP9/Opus webm.
  5. Export a head-to-shirt portrait (480x600 webp) from the sharpest frame and
     a 1200x630 og.jpg.

Usage
  python3 scripts/build-hero-assets.py [--src media/intro.mp4]
         [--crop W:H:X:Y] [--len 10] [--fade 0.5]

Requires ffmpeg/ffprobe on PATH and numpy.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT_W, OUT_H = 768, 960  # hero video size (aspect 0.8)
PAPER = (0xF4, 0xF2, 0xEE)
SR = 48000


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=True, **kw)


def probe(src: Path) -> dict:
    out = run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height,r_frame_rate:format=duration",
         "-of", "json", str(src)],
        capture_output=True,
    ).stdout
    data = json.loads(out)
    s = data["streams"][0]
    num, den = s["r_frame_rate"].split("/")
    return {
        "w": int(s["width"]),
        "h": int(s["height"]),
        "fps": float(num) / float(den),
        "dur": float(data["format"]["duration"]),
    }


def grab_gray(src: Path, t: float, w: int, h: int) -> np.ndarray:
    raw = run(
        ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(src),
         "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
        capture_output=True,
    ).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w)


def detect_bbox(src: Path, info: dict, samples: int = 9) -> tuple[int, int, int, int]:
    """Union bbox of 'not backdrop' pixels over a handful of frames."""
    x0, y0, x1, y1 = info["w"], info["h"], 0, 0
    for i in range(samples):
        t = (i + 0.5) * min(info["dur"], 10) / samples
        g = grab_gray(src, t, info["w"], info["h"])
        mask = g < 200
        cols = np.where(mask.sum(0) > info["h"] * 0.01)[0]
        rows = np.where(mask.sum(1) > info["w"] * 0.003)[0]
        if len(cols) and len(rows):
            x0, x1 = min(x0, cols[0]), max(x1, cols[-1])
            y0, y1 = min(y0, rows[0]), max(y1, rows[-1])
    if x1 <= x0:
        sys.exit("Could not detect the person; pass --crop W:H:X:Y")
    return int(x0), int(y0), int(x1), int(y1)


def crop_from_bbox(bbox, info) -> tuple[int, int, int, int]:
    x0, y0, x1, y1 = bbox
    pad = 48
    h = min(info["h"], (y1 - y0) + pad * 2)
    w = int(round(h * OUT_W / OUT_H))
    cx = (x0 + x1) // 2
    x = max(0, min(info["w"] - w, cx - w // 2))
    y = max(0, min(info["h"] - h, y0 - pad))
    return w - w % 2, h - h % 2, x, y


def sharpest_time(src: Path, info: dict, n: int = 20) -> float:
    best, best_t = -1.0, 0.0
    for i in range(n):
        t = (i + 0.5) * min(info["dur"], 10) / n
        g = grab_gray(src, t, info["w"], info["h"]).astype(np.float32)
        lap = np.abs(4 * g[1:-1, 1:-1] - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:])
        v = float(lap.var())
        if v > best:
            best, best_t = v, t
    return best_t


def build_audio(src: Path, length: float, fade: float, tmp: Path) -> Path:
    """Decode audio, cross-fade the tail into the head in numpy, write WAV."""
    wav_in = tmp / "in.wav"
    run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-t", f"{length}",
         "-ac", "2", "-ar", str(SR), "-c:a", "pcm_s16le", str(wav_in)])
    with wave.open(str(wav_in)) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), np.int16).reshape(-1, 2).astype(np.float64)
    total = int(round(length * SR))
    if len(a) < total:
        a = np.vstack([a, np.zeros((total - len(a), 2))])
    a = a[:total]
    n = int(round(fade * SR))
    head = a[:n]
    body = a[n:].copy()  # plays from `fade` to `length`
    t = np.linspace(0, 1, n, endpoint=False)[:, None]
    fade_out, fade_in = np.cos(t * np.pi / 2), np.sin(t * np.pi / 2)  # equal power
    body[-n:] = body[-n:] * fade_out + head * fade_in
    out = np.clip(body, -32768, 32767).astype(np.int16)
    wav_out = tmp / "loop.wav"
    with wave.open(str(wav_out), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(out.tobytes())
    return wav_out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=str(ROOT / "media" / "intro.mp4"))
    ap.add_argument("--crop", help="W:H:X:Y crop override")
    ap.add_argument("--len", type=float, default=10.0, help="seconds of source to use")
    ap.add_argument("--fade", type=float, default=0.5, help="loop cross-fade seconds")
    args = ap.parse_args()

    src = Path(args.src)
    info = probe(src)
    length = min(args.len, info["dur"])
    fade = args.fade

    if args.crop:
        cw, ch, cx, cy = (int(v) for v in args.crop.split(":"))
    else:
        bbox = detect_bbox(src, info)
        cw, ch, cx, cy = crop_from_bbox(bbox, info)
        print(f"person bbox {bbox} -> crop={cw}:{ch}:{cx}:{cy}")

    look = (f"crop={cw}:{ch}:{cx}:{cy},scale={OUT_W}:{OUT_H}:flags=lanczos,"
            f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,setsar=1,fps={info['fps']:g}")

    hero = ROOT / "public" / "hero"
    hero.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        wav = build_audio(src, length, fade, tmp)

        body_len = length - fade
        vf = (
            f"[0:v]{look},split[a][b];"
            f"[a]trim={fade}:{length},setpts=PTS-STARTPTS[body];"
            f"[b]trim=0:{fade},setpts=PTS-STARTPTS[head];"
            f"[body][head]xfade=transition=fade:duration={fade}:offset={body_len - fade:.4f},"
            f"format=yuv420p[v]"
        )
        common = ["ffmpeg", "-v", "error", "-y", "-i", str(src), "-i", str(wav),
                  "-filter_complex", vf, "-map", "[v]", "-map", "1:a", "-t", f"{body_len:.4f}"]

        run(common + ["-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
                      "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(hero / "hero.mp4")])
        run(common + ["-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1",
                      "-deadline", "good", "-cpu-used", "2", "-pix_fmt", "yuv420p",
                      "-c:a", "libopus", "-b:a", "80k", str(hero / "hero.webm")])

    # Portrait: head-to-shirt crop from the sharpest frame.
    t = sharpest_time(src, info)
    bbox = detect_bbox(src, info) if not args.crop else (cx, cy, cx + cw, cy + ch)
    x0, y0, x1, y1 = bbox
    bh = y1 - y0
    ph = int(bh * 0.40)
    pw = int(ph * 0.8)
    px = max(0, (x0 + x1) // 2 - pw // 2)
    py = max(0, y0 - int(bh * 0.03))
    run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(src), "-frames:v", "1",
         "-vf", f"crop={pw}:{ph}:{px}:{py},scale=480:600:flags=lanczos,"
                f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98",
         "-c:v", "libwebp", "-quality", "86", str(ROOT / "public" / "portrait-bust.webp")])

    # OG image: the full figure on paper, right-weighted.
    paper = "0x%02x%02x%02x" % PAPER
    run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(src),
         "-f", "lavfi", "-i", f"color=c={paper}:s=1200x630",
         "-filter_complex",
         f"[0:v]crop={cw}:{ch}:{cx}:{cy},scale=-2:600:flags=lanczos,"
         f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,format=rgb24[p];"
         f"[1:v]format=rgb24,split[bg][bg2];"
         f"[bg][p]overlay=x=W-w-120:y=30:format=rgb,format=rgb24[o0];"
         f"[bg2][o0]blend=all_mode=multiply",
         "-frames:v", "1", "-q:v", "3", str(ROOT / "public" / "og.jpg")])

    for f in [hero / "hero.mp4", hero / "hero.webm", ROOT / "public/portrait-bust.webp", ROOT / "public/og.jpg"]:
        print(f"{f.relative_to(ROOT)}  {f.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()

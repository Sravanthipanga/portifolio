import { CSSProperties } from "react";
import { EDUCATION, EXPERIENCE, PROFILE } from "@/lib/data";
import { asset } from "@/lib/asset";
import IdCard from "../ui/IdCard";

const CSS = `
.about-grid { display: grid; grid-template-columns: minmax(0,1fr) 320px minmax(0,1fr); gap: clamp(24px, 3vw, 48px);
  align-items: stretch; }
.about-left, .about-right { display: flex; flex-direction: column; }
.about-left .lede { margin-top: 28px; }
.about-left .lede + .lede { margin-top: 14px; color: var(--mute); }
.about-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
.about-mid { position: relative; min-height: 520px; }
.about-right { justify-content: flex-end; gap: 28px; }
.facts { border-top: 1px solid var(--line); }
.facts h3 { font: 400 12px/1 var(--nf-mono); text-transform: uppercase; letter-spacing: .04em; color: var(--mute);
  padding: 18px 0 6px; }
.facts dl > div { display: grid; grid-template-columns: 110px minmax(0,1fr); gap: 12px; padding: 14px 0;
  border-bottom: 1px solid var(--line); font-size: 15px; }
.facts dt { color: var(--mute); font-size: 13px; }
.facts dd { font-weight: 500; overflow-wrap: anywhere; }
.about-quote { font-family: var(--nf-serif); font-style: italic; font-size: clamp(24px, 2vw, 30px); line-height: 1.15;
  letter-spacing: -0.01em; color: var(--ink); }
.about-quote::before { content: "“"; display: block; font-size: 2em; line-height: .6; color: var(--faint); }
.about-quote figcaption { margin-top: 12px; font: 400 12px/1.4 var(--nf-mono); font-style: normal; color: var(--mute); }

@media (max-width: 960px) {
  .about-grid { grid-template-columns: minmax(0,1fr); }
  .about-mid { min-height: 0; padding-block: 8px 12px; }
}
`;

export default function About() {
  const ms = EDUCATION[0];
  const now = EXPERIENCE[0];
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <style href="about" precedence="default">
        {CSS}
      </style>
      <div className="wrap about-grid">
        <div className="about-left">
          <p className="tag rv">
            <span>01 — About</span>
          </p>
          <h2 id="about-title" className="h-section" style={{ marginTop: 22 }}>
            <span className="rv-mask" style={{ "--i": 1 } as CSSProperties}>
              <span>
                Hi, I&apos;m <span className="serif">{PROFILE.firstName}.</span>
              </span>
            </span>
          </h2>
          <p className="lede rv" style={{ "--i": 2 } as CSSProperties}>
            {PROFILE.resumeSummary[0]}
          </p>
          <p className="lede rv" style={{ "--i": 3 } as CSSProperties}>
            {PROFILE.resumeSummary[5]}
          </p>
          <div className="about-btns rv" style={{ "--i": 4 } as CSSProperties}>
            <a href={asset(PROFILE.resume)} download className="btn btn-primary">
              Résumé <span aria-hidden="true">↓</span>
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="about-mid">
          <IdCard />
        </div>

        <div className="about-right">
          <div className="facts rv" style={{ "--i": 2 } as CSSProperties}>
            <h3>Quick facts</h3>
            <dl>
            <div>
              <dt>Location</dt>
              <dd>{PROFILE.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {ms.degree}, {ms.school}
              </dd>
            </div>
            <div>
              <dt>Current role</dt>
              <dd>
                {now.title}, {now.company}
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </dd>
            </div>
            </dl>
          </div>
          <figure className="about-quote rv" style={{ "--i": 3 } as CSSProperties}>
            <blockquote>Quality and consistency across every project — built side by side with product and engineering.</blockquote>
            <figcaption>— paraphrased from my résumé summary</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

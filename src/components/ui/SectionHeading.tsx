import { CSSProperties } from "react";

type Props = {
  index: string;
  label: string;
  /** heading text before the serif accent word */
  lead: string;
  /** one italic serif word (or short phrase) that ends the heading */
  accent: string;
  id?: string;
  className?: string;
};

/** Section tag ("03 — Selected work") plus a masked-reveal heading. */
export default function SectionHeading({ index, label, lead, accent, id, className = "" }: Props) {
  return (
    <div className={className}>
      <p className="tag rv">
        <span>
          {index} — {label}
        </span>
      </p>
      <h2 id={id} className="h-section" style={{ marginTop: 22 }}>
        <span className="rv-mask" style={{ "--i": 1 } as CSSProperties}>
          <span>
            {lead} <span className="serif">{accent}</span>
          </span>
        </span>
      </h2>
    </div>
  );
}

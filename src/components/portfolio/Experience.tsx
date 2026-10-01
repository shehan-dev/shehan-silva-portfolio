import { Briefcase, ChevronDown, GraduationCap } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { timeline } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";

const views = [
  { id: "all", label: "Everything" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
] as const;

type View = (typeof views)[number]["id"];

export function Experience() {
  const revealRef = useReveal<HTMLElement>();
  const [view, setView] = useState<View>("all");
  const [expanded, setExpanded] = useState<string | null>(timeline[0]?.title ?? null);
  const entries = view === "all" ? timeline : timeline.filter((entry) => entry.kind === view);

  return (
    <section ref={revealRef} className="section" id="experience" data-reveal>
      <div className="section-heading-row">
        <div>
          <div className="section-label">
            <span>03</span> Experience
          </div>
          <h2>
            Where I've <em>worked &amp; studied.</em>
          </h2>
        </div>
        <div className="segmented" role="group" aria-label="Filter timeline">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="timeline">
        {entries.map((entry, index) => {
          const isOpen = expanded === entry.title;
          const panelId = `timeline-${index}-${view}`;
          const Icon = entry.kind === "work" ? Briefcase : GraduationCap;
          return (
            <li
              className="timeline-item stagger"
              key={`${view}-${entry.title}`}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="timeline-period">{entry.period}</span>
              <span className={`timeline-mark ${entry.kind}`} aria-hidden="true">
                {entry.mark}
              </span>
              <div className={isOpen ? "timeline-card is-open" : "timeline-card"}>
                <button
                  type="button"
                  className="timeline-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpanded(isOpen ? null : entry.title)}
                >
                  <span className="timeline-kind">
                    <Icon size={13} /> {entry.kind === "work" ? "Work" : "Education"}
                  </span>
                  <span className="timeline-title">{entry.title}</span>
                  <span className="timeline-org">{entry.org}</span>
                  <ChevronDown className="timeline-chevron" size={18} aria-hidden="true" />
                </button>
                <p className="timeline-summary">{entry.summary}</p>
                <div className="timeline-panel" id={panelId} hidden={!isOpen}>
                  <ul>
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <ul className="tag-list">
                  {entry.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

import { Blocks, BrainCircuit, Server } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { focusAreas, skillGroups, skills, type SkillGroup } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";

const focusIcons = [Blocks, Server, BrainCircuit];

export function About() {
  const revealRef = useReveal<HTMLElement>();
  const [group, setGroup] = useState<SkillGroup>("All");
  const visible = group === "All" ? skills : skills.filter((skill) => skill.group === group);

  return (
    <section ref={revealRef} className="section" id="about" data-reveal>
      <div className="section-label">
        <span>01</span> About
      </div>
      <div className="about-grid">
        <h2>
          Engineering with <em>clarity and intent.</em>
        </h2>
        <div className="about-copy">
          <p>
            I'm Shehan, a full-stack software engineer with 4+ years building production systems for
            international clients, from Angular frontends to Node.js microservices and serverless
            backends.
          </p>
          <p>
            At Random Software I've architected customer-portal frontends, led framework and backend
            migrations, and explored AI-assisted development workflows. My MSc research at SLIIT
            looks at making AI-generated code documentation aware of enterprise context.
          </p>
        </div>
      </div>

      <div className="focus-grid">
        {focusAreas.map((area, index) => {
          const Icon = focusIcons[index] ?? Blocks;
          return (
            <article
              className="focus-card stagger"
              key={area.title}
              style={{ "--i": index } as CSSProperties}
            >
              <Icon size={22} aria-hidden="true" />
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          );
        })}
      </div>

      <div className="toolkit">
        <div className="toolkit-head">
          <h3>Toolkit</h3>
          <div className="segmented" role="group" aria-label="Filter skills">
            {skillGroups.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={group === item}
                onClick={() => setGroup(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <ul className="skill-cloud">
          {visible.map((skill, index) => (
            <li
              key={`${group}-${skill.name}`}
              className={skill.core ? "skill-pill is-core" : "skill-pill"}
              style={{ "--i": index } as CSSProperties}
            >
              {skill.name}
            </li>
          ))}
        </ul>
        <p className="toolkit-note">
          <span className="legend-dot" /> Core stack I use day to day
        </p>
      </div>
    </section>
  );
}

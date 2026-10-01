import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpenText } from "lucide-react";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { projectFilters, projects, type Project } from "../../data/portfolio";
import { GitHubActivity } from "./GitHubActivity";
import { Modal } from "./Modal";
import { useReveal } from "../../hooks/use-reveal";

type Filter = (typeof projectFilters)[number];

function spotlight(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function PipelineVisual() {
  return (
    <div className="pipeline-visual" aria-hidden="true">
      <span className="pv-node">code</span>
      <span className="pv-link" />
      <span className="pv-node">SBERT + FAISS</span>
      <span className="pv-link" />
      <span className="pv-node">CodeT5 + LoRA</span>
      <span className="pv-link" />
      <span className="pv-node pv-out">/** comment */</span>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image.src}
        alt={project.image.alt}
        loading="lazy"
        width={1200}
        height={720}
      />
    );
  }
  return <PipelineVisual />;
}

function ProjectLink({
  link,
  onNavigate,
}: {
  link: Project["links"][number];
  onNavigate?: () => void;
}) {
  return (
    <a
      className="text-link"
      href={link.href}
      onClick={link.external ? undefined : onNavigate}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label} <ArrowUpRight size={14} />
    </a>
  );
}

export function Projects() {
  const revealRef = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);
  const open = openIndex === null ? null : projects[openIndex];

  function step(direction: 1 | -1) {
    setOpenIndex((index) =>
      index === null ? null : (index + direction + projects.length) % projects.length,
    );
  }

  return (
    <section ref={revealRef} className="section" id="projects" data-reveal>
      <div className="section-heading-row">
        <div>
          <div className="section-label">
            <span>02</span> Selected work
          </div>
          <h2>
            Projects I'm <em>proud of.</em>
          </h2>
        </div>
        <div className="segmented" role="group" aria-label="Filter projects">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {visible.map((project, index) => (
          <article
            className="project-card stagger"
            key={`${filter}-${project.slug}`}
            style={{ "--i": index } as CSSProperties}
            onPointerMove={spotlight}
          >
            <div className="project-media">
              <ProjectMedia project={project} />
              <span className="project-year">{project.year}</span>
              {project.badge && <span className="project-badge">{project.badge}</span>}
            </div>
            <div className="project-body">
              <span className="project-eyebrow">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.short}</p>
              <ul className="tag-list" aria-label="Tech stack">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="project-actions">
                <button
                  type="button"
                  className="case-button"
                  onClick={() => setOpenIndex(projects.indexOf(project))}
                >
                  <BookOpenText size={15} /> Case study
                </button>
                {project.links
                  .filter((link) => link.external)
                  .map((link) => (
                    <ProjectLink key={link.href} link={link} />
                  ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <GitHubActivity />

      <Modal
        open={open !== null}
        onClose={() => setOpenIndex(null)}
        label={open ? `${open.title} case study` : "Case study"}
        className="case-modal"
      >
        {open && (
          <article className="case-study" key={open.slug}>
            <div className="case-hero">
              <ProjectMedia project={open} />
            </div>
            <div className="case-body">
              <span className="project-eyebrow">
                {open.domain} · {open.year}
              </span>
              <h2>{open.title}</h2>
              <p className="case-tldr">
                <strong>TL;DR</strong> {open.overview}
              </p>

              <div className="case-columns">
                <section>
                  <h3>
                    <span>01</span> Problem
                  </h3>
                  <p>{open.problem}</p>
                </section>
                <section>
                  <h3>
                    <span>02</span> Approach
                  </h3>
                  <ul>
                    {open.solution.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>
                    <span>03</span> Impact
                  </h3>
                  <ul>
                    {open.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>
                    <span>04</span> Tech stack
                  </h3>
                  <ul className="tag-list">
                    {open.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="case-footer">
                <div className="case-links">
                  {open.links.map((link) => (
                    <ProjectLink
                      key={link.href}
                      link={link}
                      onNavigate={() => setOpenIndex(null)}
                    />
                  ))}
                </div>
                <div className="case-nav">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <span>
                    {(openIndex ?? 0) + 1} / {projects.length}
                  </span>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => step(1)}
                    aria-label="Next project"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}

import { ArrowUpRight, Award, Check, Copy, Expand } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { awards, researchSnippet, researchSteps } from "../../data/portfolio";
import { Modal } from "./Modal";
import { useReveal } from "../../hooks/use-reveal";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
};

const gallery: { eyebrow: string; title: string; copy: string; photos: Photo[] }[] = [
  {
    eyebrow: "NBQSA · 2023",
    title: "Merit Award",
    copy: "Tertiary Student Projects, Business category.",
    photos: [
      {
        src: "/mbqsa.jpg",
        width: 1024,
        height: 657,
        alt: "Shehan Silva and fellow award recipients at the NBQSA 2023 ceremony",
        caption: "NBQSA 2023 award ceremony",
      },
    ],
  },
  {
    eyebrow: "InnoServe · 2023 · Taipei",
    title: "Runner-Up",
    copy: "Bright Minds: International Exchange, English Group.",
    photos: [
      {
        src: "/innoserve.jpg",
        width: 1280,
        height: 853,
        alt: "Bright Minds team receiving second place at InnoServe Awards 2023",
        caption: "InnoServe Awards 2023 ceremony",
      },
      {
        src: "/innoserve_certificate.jpg",
        width: 909,
        height: 1286,
        alt: "InnoServe Awards 2023 second-place certificate for the Bright Minds team",
        caption: "InnoServe 2023 certificate",
        className: "achievement-certificate",
      },
    ],
  },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="code-block">
      <figcaption>
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-lang">{language}</span>
        <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre>
        <code>
          {code.split("\n").map((line, index) => {
            const hash = line.indexOf("#");
            return (
              <span key={index}>
                {hash === -1 ? line : line.slice(0, hash)}
                {hash !== -1 && <span className="tok-comment">{line.slice(hash)}</span>}
                {"\n"}
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}

function ResearchPipeline() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || interacted || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry?.isIntersecting)
          timer = window.setInterval(
            () => setActive((step) => (step + 1) % researchSteps.length),
            2800,
          );
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [interacted]);

  return (
    <div className="pipeline" ref={ref}>
      <ol className="pipeline-steps">
        {researchSteps.map((step, index) => (
          <li key={step.label}>
            <button
              type="button"
              aria-pressed={active === index}
              className={index < active ? "is-done" : undefined}
              onClick={() => {
                setInteracted(true);
                setActive(index);
              }}
            >
              <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
              {step.label}
            </button>
          </li>
        ))}
      </ol>
      <p className="pipeline-detail" key={active} aria-live="polite">
        {researchSteps[active]?.detail}
      </p>
    </div>
  );
}

export function Research() {
  const revealRef = useReveal<HTMLElement>();
  const [photo, setPhoto] = useState<Photo | null>(null);

  function openPhoto(event: MouseEvent<HTMLAnchorElement>, item: Photo) {
    event.preventDefault();
    setPhoto(item);
  }

  return (
    <section ref={revealRef} className="section" id="research" data-reveal>
      <div className="section-label">
        <span>04</span> Research &amp; recognition
      </div>

      <div className="research-grid">
        <div className="research-intro">
          <span className="project-eyebrow">MSc research · SLIIT · 2024–2026</span>
          <h2>
            Enterprise-aware <em>code documentation.</em>
          </h2>
          <p>
            Generic AI tools write generic comments. My research generates code comments that
            understand enterprise context, combining Retrieval-Augmented Transformers (CodeT5 +
            LoRA) with sentence embeddings (Sentence-BERT, FAISS) to speed up developer onboarding
            and improve code comprehension.
          </p>
          <ResearchPipeline />
        </div>

        <div className="research-side">
          <CodeBlock code={researchSnippet} language="python" />
          <div className="deliverables">
            <h3>
              Deliverables <small>available on request</small>
            </h3>
            <ul>
              <li>Research summary &amp; paper</li>
              <li>Code &amp; dataset</li>
              <li>Reproducible notebook demos</li>
            </ul>
            <p>
              Open to collaborations on reproducible ML experiments and engineering integrations.
            </p>
            <a className="text-link" href="#contact">
              Talk about the research <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="recognition" id="recognition">
        <h3 className="sub-heading">Recognition</h3>
        <ul className="award-grid">
          {awards.map((award, index) => (
            <li
              className="award-card stagger"
              key={award.name}
              style={{ "--i": index } as CSSProperties}
            >
              <Award size={22} aria-hidden="true" />
              <strong>{award.result}</strong>
              <span>{award.name}</span>
              <small>{award.detail}</small>
            </li>
          ))}
        </ul>

        <div className="achievement-gallery" aria-label="Highlighted achievements">
          {gallery.map((item) => (
            <article className="achievement-item" key={item.title}>
              <div className={item.photos.length > 1 ? "achievement-photo-pair" : undefined}>
                {item.photos.map((entry) => (
                  <a
                    key={entry.src}
                    className={
                      entry.className ? `achievement-photo ${entry.className}` : "achievement-photo"
                    }
                    href={entry.src}
                    onClick={(event) => openPhoto(event, entry)}
                    aria-label={`Enlarge: ${entry.caption}`}
                  >
                    <img
                      src={entry.src}
                      width={entry.width}
                      height={entry.height}
                      loading="lazy"
                      alt={entry.alt}
                    />
                    <span>
                      <Expand size={14} /> View
                    </span>
                  </a>
                ))}
              </div>
              <div className="achievement-caption">
                <span className="project-eyebrow">{item.eyebrow}</span>
                <h4>{item.title}</h4>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal
        open={photo !== null}
        onClose={() => setPhoto(null)}
        label={photo?.caption ?? "Photo"}
        className="lightbox"
      >
        {photo && (
          <figure>
            <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}

import { ArrowUpRight, Download, Github } from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";
import { heroStats, links } from "../../data/portfolio";
import { CountUp } from "./CountUp";

const focusWords = [
  "Angular frontends",
  "Node.js APIs",
  "serverless on AWS",
  "AI-assisted workflows",
  "developer tooling",
];

const codeMotif = `@Component({ selector: 'app-portal', standalone: true })
export class PortalComponent {
  readonly customers = signal<Customer[]>([]);
  readonly active = computed(() => this.customers().filter(c => c.active));
}

fastify.get('/api/quotes/:id', async (req, reply) => {
  const quote = await quotes.findById(req.params.id);
  return reply.send(quote);
});

context = faiss_index.search(sbert.encode(code), k=5)
comment = codet5_lora.generate(build_prompt(code, context))`;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setWordIndex((index) => (index + 1) % focusWords.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, []);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--ry", `${x * 12}deg`);
    event.currentTarget.style.setProperty("--rx", `${y * -12}deg`);
    event.currentTarget.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    ["--rx", "--ry", "--gx", "--gy"].forEach((name) =>
      event.currentTarget.style.removeProperty(name),
    );
  }

  return (
    <section className="hero" id="home">
      <div className="hero-backdrop" aria-hidden="true">
        <pre>{codeMotif}</pre>
        <span className="blob blob-one" />
        <span className="blob blob-two" />
      </div>

      <div className="hero-grid">
        <div className="hero-visual">
          <div className="avatar-card" onPointerMove={tilt} onPointerLeave={resetTilt}>
            <img
              src="/avatar-hero.jpg"
              width={880}
              height={880}
              fetchPriority="high"
              alt="Illustrated portrait of Shehan Silva at his desk with a laptop and a code editor in the background"
            />
            <span className="avatar-glare" aria-hidden="true" />
          </div>
          <span className="float-chip chip-one" aria-hidden="true">
            <i /> Angular 21 · Signals
          </span>
          <span className="float-chip chip-two" aria-hidden="true">
            <i /> Fastify · NestJS
          </span>
          <span className="float-chip chip-three" aria-hidden="true">
            <i /> MSc · RAG research
          </span>
        </div>

        <div className="hero-content">
          <h1>
            Shehan Silva
            <span className="hero-role">Full-stack Software Engineer</span>
          </h1>
          <p className="hero-tagline">
            Building enterprise web apps &amp; developer tools that scale:{" "}
            <span className="mono-accent">Angular • Node.js • AI-assisted workflows</span>
          </p>
          <p className="hero-copy">
            I build enterprise web applications and developer tooling, specialising in Angular
            frontends, Node.js backends and AI-assisted workflows that speed up delivery and
            developer onboarding.
          </p>
          <p className="hero-focus">
            <span className="mono-muted">currently_building(</span>
            <span className="focus-word" key={wordIndex} aria-hidden="true">
              {focusWords[wordIndex]}
            </span>
            <span className="sr-only">{focusWords.join(", ")}</span>
            <span className="mono-muted">)</span>
          </p>
          <div className="hero-actions">
            <a className="button-base button-solid" href="#contact">
              Hire me <ArrowUpRight size={17} />
            </a>
            <a
              className="button-base button-outline"
              href={links.resume}
              download="Shehan_Silva_Software_Engineer_CV.pdf"
            >
              Download CV <Download size={16} />
            </a>
            <a
              className="button-base button-outline icon-only"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      <dl className="hero-stats">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

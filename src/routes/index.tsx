import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Github, Linkedin, Mail, PenLine } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { About } from "../components/portfolio/About";
import { CommandPalette } from "../components/portfolio/CommandPalette";
import { Contact } from "../components/portfolio/Contact";
import { Experience } from "../components/portfolio/Experience";
import { Hero } from "../components/portfolio/Hero";
import { Projects } from "../components/portfolio/Projects";
import { Research } from "../components/portfolio/Research";
import { SiteHeader } from "../components/portfolio/SiteHeader";
import { links } from "../data/portfolio";
import { useTheme } from "../hooks/use-theme";

const title = "Shehan Silva, Full-stack Software Engineer (Angular, TypeScript, Node.js)";
const description =
  "Shehan Silva builds enterprise web apps and developer tools that scale: Angular, Node.js and AI-assisted workflows. Projects, experience, MSc research and CV.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/avatar-hero.jpg" },
      { property: "og:image:alt", content: "Illustrated portrait of Shehan Silva at his desk" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "/avatar-hero.jpg" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const toastTimer = useRef(0);

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    const observer = hero
      ? new IntersectionObserver(([entry]) => entry && setShowTop(!entry.isIntersecting))
      : null;
    if (hero) observer?.observe(hero);

    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      observer?.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <SiteHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Research />
        <Contact onNotify={notify} />
      </main>

      <footer>
        <a href="#home" className="monogram">
          <span className="monogram-bracket">&lt;</span>SS
          <span className="monogram-bracket">/&gt;</span>
        </a>
        <p>
          © {new Date().getFullYear()} Shehan Silva · Built with React, TanStack Start &amp; care.
          Press <kbd>Ctrl</kbd> <kbd>K</kbd> to explore.
        </p>
        <div>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={links.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <PenLine size={18} />
          </a>
          <a href={`mailto:${links.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </footer>

      <a
        href="#home"
        className={showTop ? "back-to-top is-shown" : "back-to-top"}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={18} />
      </a>
      <div className={toast ? "toast is-shown" : "toast"} role="status" aria-live="polite">
        {toast}
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        onNotify={notify}
      />
    </div>
  );
}

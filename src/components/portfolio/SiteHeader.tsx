import { Command, Download, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { links, navItems } from "../../data/portfolio";
import type { Theme } from "../../hooks/use-theme";

type SiteHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
};

export function SiteHeader({ theme, onToggleTheme, onOpenPalette }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="header-inner">
        <a
          href="#home"
          className="monogram"
          aria-label="Shehan Silva, home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="monogram-bracket">&lt;</span>SS
          <span className="monogram-bracket">/&gt;</span>
        </a>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "is-active" : undefined}
              aria-current={active === id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button palette-trigger"
            onClick={onOpenPalette}
            aria-label="Open command menu (Ctrl+K)"
          >
            <Command size={15} />
            <kbd>K</kbd>
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            className="button-base button-solid header-cv"
            href={links.resume}
            download="Shehan_Silva_Software_Engineer_CV.pdf"
          >
            <Download size={15} /> <span>Download CV</span>
          </a>
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}

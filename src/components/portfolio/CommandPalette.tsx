import {
  ArrowRight,
  Download,
  Github,
  Hash,
  Linkedin,
  Mail,
  Moon,
  PenLine,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { links, navItems } from "../../data/portfolio";
import { Modal } from "./Modal";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onNotify: (message: string) => void;
};

type Action = { id: string; label: string; hint: string; icon: LucideIcon; run: () => void };

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

export function CommandPalette({ open, onClose, onToggleTheme, onNotify }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const actions = useMemo<Action[]>(
    () => [
      ...navItems.map(({ label, id }) => ({
        id,
        label: `Go to ${label}`,
        hint: "Section",
        icon: Hash,
        run: () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "cv",
        label: "Download CV",
        hint: "PDF",
        icon: Download,
        run: () => {
          const anchor = document.createElement("a");
          anchor.href = links.resume;
          anchor.download = "Shehan_Silva_Software_Engineer_CV.pdf";
          anchor.click();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "@shehan-dev",
        icon: Github,
        run: () => openExternal(links.github),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "Profile",
        icon: Linkedin,
        run: () => openExternal(links.linkedin),
      },
      {
        id: "medium",
        label: "Read on Medium",
        hint: "Writing",
        icon: PenLine,
        run: () => openExternal(links.medium),
      },
      {
        id: "email",
        label: "Copy email address",
        hint: links.email,
        icon: Mail,
        run: () => {
          navigator.clipboard.writeText(links.email).then(
            () => onNotify("Email address copied"),
            () => (window.location.href = `mailto:${links.email}`),
          );
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        hint: "Theme",
        icon: Moon,
        run: onToggleTheme,
      },
    ],
    [onNotify, onToggleTheme],
  );

  const results = actions.filter((action) =>
    action.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  function runAction(action: Action | undefined) {
    if (!action) return;
    onClose();
    action.run();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((index) => (index + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((index) => (index - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      runAction(results[cursor]);
    }
  }

  return (
    <Modal open={open} onClose={onClose} label="Command menu" className="palette">
      <div className="palette-search">
        <Search size={17} aria-hidden="true" />
        <input
          data-autofocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setCursor(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[cursor] ? `palette-${results[cursor].id}` : undefined}
        />
        <kbd>Esc</kbd>
      </div>
      <ul className="palette-list" id="palette-list" role="listbox" aria-label="Commands">
        {results.length === 0 && <li className="palette-empty">No matching commands</li>}
        {results.map((action, index) => {
          const Icon = action.icon;
          return (
            <li
              key={action.id}
              id={`palette-${action.id}`}
              role="option"
              aria-selected={index === cursor}
              className={index === cursor ? "is-active" : undefined}
              onMouseEnter={() => setCursor(index)}
              onClick={() => runAction(action)}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{action.label}</span>
              <small>{action.hint}</small>
              <ArrowRight size={14} className="palette-arrow" aria-hidden="true" />
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

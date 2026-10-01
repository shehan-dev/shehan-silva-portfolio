import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  PenLine,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import avatar from "../../assets/shehan-avatar.png";
import { links } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";

const roles = [
  "Full-time role",
  "Contract / freelance",
  "Research collaboration",
  "Something else",
];

export function Contact({ onNotify }: { onNotify: (message: string) => void }) {
  const revealRef = useReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      onNotify("Email address copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const role = String(data.get("role") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const subject = `${role}: message from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onNotify("Opening your email app…");
  }

  return (
    <section ref={revealRef} className="contact-section" id="contact" data-reveal>
      <div className="contact-grid">
        <div className="contact-intro">
          <div className="section-label">
            <span>05</span> Contact
          </div>
          <div className="contact-avatar">
            <img
              src={avatar}
              width={96}
              height={96}
              loading="lazy"
              alt="Illustrated avatar of Shehan Silva"
            />
            <p className="speech-bubble">Hi! I usually reply within 48 hours.</p>
          </div>
          <h2>
            Let's build something <em>that scales.</em>
          </h2>
          <p>
            I'm open to full-time or contract roles focused on frontend architecture, developer
            productivity tooling and AI-assisted engineering workflows. Let's talk.
          </p>

          <div className="email-row">
            <a href={`mailto:${links.email}`} className="email-link">
              <Mail size={17} /> {links.email}
            </a>
            <button
              type="button"
              className="icon-button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div className="social-row">
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} /> GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={links.medium} target="_blank" rel="noopener noreferrer">
              <PenLine size={17} /> Medium
            </a>
            <a href={links.resume} download="Shehan_Silva_Software_Engineer_CV.pdf">
              <Download size={17} /> Resume
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="field-row">
            <label>
              <span>Name</span>
              <input name="name" autoComplete="name" required placeholder="Jane Doe" />
            </label>
            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="jane@company.com"
              />
            </label>
          </div>
          <fieldset>
            <legend>Interested in</legend>
            <div className="role-options">
              {roles.map((role, index) => (
                <label key={role} className="role-chip">
                  <input type="radio" name="role" value={role} defaultChecked={index === 0} />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Tell me a little about the role or project…"
            />
          </label>
          <button type="submit" className="button-base button-solid">
            Send message <Send size={16} />
          </button>
          <p className="form-note">
            Opens your email app with the message pre-filled.{" "}
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              Prefer LinkedIn? <ArrowUpRight size={12} />
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { personal } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "@/components/ui/BrandIcons";

const contactLinks = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: "GitHub", value: personal.github.replace("https://", ""), href: personal.github, icon: GithubIcon },
  { label: "LinkedIn", value: personal.linkedin.replace("https://", ""), href: personal.linkedin, icon: LinkedinIcon },
  { label: "Medium", value: personal.medium.replace("https://", ""), href: personal.medium, icon: MediumIcon },
  { label: "Instagram", value: personal.instagram?.replace("https://", ""), href: personal.instagram ?? "https://www.instagram.com/ayushgnawali/", icon: InstagramIcon },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No backend on this static site — hand off to the visitor's own mail
    // client with the message pre-filled, rather than silently pretending
    // to "send" something.
    const subject = encodeURIComponent(`Portfolio contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="06 · Contact"
          title="Let's talk about a role"
          description="Open to remote backend, DevOps, DevSecOps, and AI/ML opportunities. The fastest way to reach me is email."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-3">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-5 py-4 transition-colors duration-200 hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-surface-hover)]"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} className="text-[var(--color-accent-bright)]" />
                    <span>
                      <span className="block text-xs text-[var(--color-text-tertiary)]">
                        {label}
                      </span>
                      <span className="block text-sm text-[var(--color-text-primary)]">
                        {value}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-[var(--color-text-tertiary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-text-primary)]"
                  />
                </a>
              ))}
            </div>

            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              <a
                href={personal.medium}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              >
                <MediumIcon size={22} className="text-[var(--color-accent-bright)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                    Publish & follow
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Medium
                  </p>
                </div>
              </a>
              <a
                href={personal.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
              >
                <InstagramIcon size={22} className="text-[var(--color-accent-bright)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                    Visual updates
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Instagram
                  </p>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    Your email client should now be open.
                  </p>
                  <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                    If nothing happened, email {personal.email} directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-[var(--color-accent-bright)] underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs text-[var(--color-text-tertiary)]"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs text-[var(--color-text-tertiary)]"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs text-[var(--color-text-tertiary)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      maxLength={600}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)]"
                      placeholder="Tell me a bit about the role and team..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--color-accent-bright)] sm:w-auto"
                  >
                    Send message
                    <ArrowUpRight size={15} />
                  </button>
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

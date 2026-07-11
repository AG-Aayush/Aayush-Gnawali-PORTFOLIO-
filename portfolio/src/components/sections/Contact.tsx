"use client";

import { useState, type FormEvent } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { personal } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "@/components/ui/BrandIcons";

const contactHandles = [
  {
    label: "Email Me",
    tagline: "SAY HELLO",
    href: `mailto:${personal.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    tagline: "CODE & REPOSITORIES",
    href: personal.github,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    tagline: "PROFESSIONAL NETWORK",
    href: personal.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Medium",
    tagline: "PUBLISH & FOLLOW",
    href: personal.medium,
    icon: MediumIcon,
  },
  {
    label: "Instagram",
    tagline: "VISUAL UPDATES",
    href: personal.instagram ?? "https://www.instagram.com/ayushgnawali/",
    icon: InstagramIcon,
  },
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

        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.25fr]">
          <Reveal>
            <div className="grid gap-4">
              <div className="flex flex-wrap gap-4">
                {contactHandles.map(({ label, tagline, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex min-w-[220px] flex-col gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-5 py-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-hover)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-tertiary)]">
                          {tagline}
                        </p>
                        <p className="mt-1 text-base font-semibold text-[var(--color-text-primary)]">
                          {label}
                        </p>
                      </div>
                      <Icon size={22} className="text-[var(--color-accent-bright)]" />
                    </div>
                  </a>
                ))}
              </div>
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:opacity-95 hover:scale-105 focus:outline-none sm:w-auto"
                  >
                    <span className="relative z-10">Send message</span>
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

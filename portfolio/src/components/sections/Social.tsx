"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/data/resume";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const socialLinks = [
  { label: "GitHub", href: personal.github, icon: GithubIcon },
  { label: "LinkedIn", href: personal.linkedin, icon: LinkedinIcon },
  { label: "Instagram", href: personal.instagram ?? "https://www.instagram.com/ayushgnawali/", icon: InstagramIcon },
  { label: "Medium", href: personal.medium, icon: MediumIcon },
];

export function Social() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="social" className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="06 · Social / Connect"
          title="Find me across the internet"
          description="Here are the places where I publish, code, and share the work I’m building."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {socialLinks.map(({ label, href, icon: Icon }, index) => (
            <Reveal key={label} delay={index * 0.08}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] px-5 py-5 shadow-[0_14px_24px_var(--color-shadow)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-surface-hover)] hover:shadow-[0_18px_32px_var(--color-shadow)]"
              >
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-accent-dim)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:scale-105"
                  >
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[var(--color-accent-bright)]">
                      {label}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                      connect
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={16}
                  className="transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  color="var(--color-accent)"
                />
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

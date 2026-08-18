"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/data/resume";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const socialLinks = [
  { label: "GitHub", href: personal.github, icon: GithubIcon, accent: "#31b6ff" },
  { label: "LinkedIn", href: personal.linkedin, icon: LinkedinIcon, accent: "#59a7ff" },
  { label: "Instagram", href: personal.instagram ?? "https://www.instagram.com/ayushgnawali/", icon: InstagramIcon, accent: "#ff5db1" },
  { label: "Medium", href: personal.medium, icon: MediumIcon, accent: "#9d8cff" },
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
          {socialLinks.map(({ label, href, icon: Icon, accent }, index) => (
            <Reveal key={label} delay={index * 0.08}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
                style={{
                  boxShadow: `0 0 0 1px ${accent}26, 0 14px 24px rgba(15, 23, 42, 0.1)`,
                  backgroundImage: `linear-gradient(135deg, ${accent}1f 0%, transparent 62%)`,
                }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: accent }}
                />
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 group-hover:-translate-y-0.5 group-hover:scale-105"
                    style={{
                      borderColor: `${accent}66`,
                      backgroundColor: accent,
                      color: "#ffffff",
                      boxShadow: `0 0 0 1px ${accent}22`,
                    }}
                  >
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-base font-semibold transition-colors duration-200" style={{ color: accent }}>
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
                  style={{ color: accent }}
                />
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

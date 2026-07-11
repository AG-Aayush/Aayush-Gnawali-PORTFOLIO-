"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { personal } from "@/data/resume";
import { Button } from "@/components/ui/Button";
import { NodeGraphBackground } from "@/components/ui/NodeGraphBackground";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Signature background visual — quiet, positioned right, never full-bleed */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] items-center lg:flex">
        <NodeGraphBackground />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(181,108,75,0.14),_transparent_22%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Photo placeholder — swap the div's background for an <Image> once
              a real photo is available, at /public/avatar.jpg. Kept small and
              quiet so it doesn't compete with the name as the focal point. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] font-mono-tag text-lg text-[var(--color-text-secondary)]"
            role="img"
            aria-label={`${personal.name} — profile photo placeholder`}
          >
            AG
          </motion.div>

          {/* Status line — the signature element: a health-check-style status readout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/70 px-3 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-positive)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-positive)]" />
            </span>
            <span className="font-mono-tag text-[11px] text-[var(--color-text-secondary)]">
              Open to work · API · Auth · Infrastructure · ML
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
            className="mt-4 text-xl text-[var(--color-text-secondary)] sm:text-2xl"
          >
            {personal.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: easeOut }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-text-secondary)]"
          >
            {personal.tagline} Building toward backend, DevOps, and applied ML roles —
            remote, and ready to learn fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#contact" variant="primary" icon={<ArrowUpRight size={15} />}>
              Get in touch
            </Button>
            <Button
              href={personal.resumeFile}
              variant="secondary"
              external
              download
            >
              Download résumé
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.5, ease: easeOut }}
            className="mt-10 flex items-center gap-5"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send email"
              className="text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              <Mail size={19} />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}

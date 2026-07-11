"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { personal } from "@/data/resume";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { NodeGraphBackground } from "@/components/ui/NodeGraphBackground";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "@/components/ui/BrandIcons";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { theme } = useTheme();
  const profilePicture =
    theme === "dark" ? personal.profilePictureDark ?? personal.profilePicture : personal.profilePicture;

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
          <motion.a
            href={profilePicture}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="group mb-6 relative block h-28 w-28 overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_25px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-110"
          >
            <span className="avatar-ring pointer-events-none" aria-hidden="true" />
            <span className="absolute inset-3 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.14),_transparent_55%)]" />
            <img
              src={profilePicture}
              alt={`${personal.name} profile picture`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="relative h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="avatar-fallback absolute inset-0 flex items-center justify-center rounded-full bg-[var(--color-bg-elevated)] text-sm text-[var(--color-text-secondary)] opacity-0 transition-opacity duration-200">
              {personal.name.slice(0, 2)}
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 px-4 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <span className="typewriter font-mono-tag text-[11px] text-[var(--color-text-secondary)]">
              Exploring Tech • Building Systems • Automating Workflows
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
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              href={personal.medium}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Medium profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <MediumIcon size={19} />
            </a>
            <a
              href={personal.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <InstagramIcon size={19} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send email"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
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

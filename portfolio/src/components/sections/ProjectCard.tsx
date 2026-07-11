"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { type Project } from "@/data/resume";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  highlightedTech?: string | null;
  onTechHover?: (tech: string | null) => void;
  onTechLeave?: () => void;
};

export function ProjectCard({
  project,
  highlightedTech,
  onTechHover,
  onTechLeave,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isMuted = highlightedTech ? !project.stack.includes(highlightedTech) : false;

  return (
    <div className="group overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-card-bg)]/95 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] html.dark:border-[var(--color-dark-border)] html.dark:bg-[var(--color-dark-card-bg)] html.dark:shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <div className="grid gap-8 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[var(--color-accent)]">
              Project
            </p>
            <h3 className="text-2xl font-semibold leading-tight text-[var(--color-text-primary)]">
              {project.name}
            </h3>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-text-secondary)]">
              {project.pitch}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.stack.map((tech) => {
              const active = highlightedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onMouseEnter={() => onTechHover?.(tech)}
                  onMouseLeave={() => onTechLeave?.()}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all duration-200",
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]"
                      : "border-[var(--color-border-strong)] bg-white/80 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] hover:-translate-y-0.5 html.dark:bg-[var(--color-dark-surface)] html.dark:text-[var(--color-dark-text-secondary)]"
                  )}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[var(--color-text-secondary)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)] html.dark:hover:text-[var(--color-dark-text-primary)]"
              >
                <GithubIcon size={18} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)] html.dark:hover:text-[var(--color-dark-text-primary)]"
              >
                <ExternalLink size={18} />
                Live demo
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] html.dark:bg-[var(--color-dark-surface)] html.dark:text-[var(--color-dark-text-primary)]"
          >
            {expanded ? "Hide details" : "Details"}
            <ChevronDown size={16} className={cn("transition-transform duration-300", expanded && "rotate-180")} />
          </button>
        </div>

        <div className="relative flex items-center justify-center rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] html.dark:border-[var(--color-dark-border)] html.dark:bg-[var(--color-dark-surface)]">
          <div className="absolute inset-x-6 top-6 h-5 rounded-full bg-[var(--color-border)]/50 blur-sm" />
          <div className="relative h-full w-full rounded-[1rem] border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] html.dark:border-[var(--color-dark-border)] html.dark:bg-[var(--color-dark-card-bg)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
              <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
              <span className="h-3 w-3 rounded-full bg-[#10b981]" />
            </div>
            <div className="h-[260px] rounded-[0.85rem] bg-[linear-gradient(135deg,#dbeafe_0%,#f8fafc_100%)] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] html.dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.08)_100%)]" />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 html.dark:border-[var(--color-dark-border)] html.dark:bg-[var(--color-dark-surface)]"
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Summary
                </p>
                <p className="text-base leading-8 text-[var(--color-text-secondary)]">
                  {project.description}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Challenge
                </p>
                <p className="text-base leading-8 text-[var(--color-text-secondary)]">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  What I learned
                </p>
                <p className="text-base leading-8 text-[var(--color-text-secondary)]">
                  {project.learned}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

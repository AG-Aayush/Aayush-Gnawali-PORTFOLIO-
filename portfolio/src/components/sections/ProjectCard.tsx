"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { type Project } from "@/data/resume";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  highlightedTech?: string | null;
  onTechHover?: (tech: string | null) => void;
  onTechLeave?: () => void;
  className?: string;
};

export function ProjectCard({
  project,
  highlightedTech,
  onTechHover,
  onTechLeave,
  className,
}: ProjectCardProps) {
  const isMuted = highlightedTech ? !project.stack.includes(highlightedTech) : false;

  return (
    <GlassCard
      tilt
      className={cn(
        "h-full w-full overflow-hidden rounded-[1.5rem] border border-[var(--color-glass-border)] bg-[var(--color-surface-strong)] p-0",
        isMuted && "opacity-80",
        className
      )}
    >
      <div className="grid gap-5 px-4 py-5 sm:px-5 sm:py-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-6 lg:px-5 lg:py-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Project
            </p>
            <h3 className="max-w-[11.5ch] text-[clamp(2.1rem,2vw+1.15rem,3.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-[var(--color-text-primary)]">
              {project.name}
            </h3>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base sm:leading-8">
              {project.pitch}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.stack.map((tech) => {
              const active = highlightedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onMouseEnter={() => onTechHover?.(tech)}
                  onMouseLeave={() => onTechLeave?.()}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition-colors duration-200",
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]"
                      : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
                  )}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-secondary)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-text-primary)]"
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
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-text-primary)]"
              >
                <ExternalLink size={18} />
                Live demo
              </a>
            )}
          </div>
        </div>

        <div className="block">
          <div className="relative flex min-h-[220px] items-center justify-center rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] sm:p-4">
            <div className="absolute inset-x-5 top-4 h-4 rounded-full bg-[var(--color-border)]/50 blur-sm" />
            <div className="relative h-full w-full rounded-[0.9rem] border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                <span className="h-3 w-3 rounded-full bg-[#10b981]" />
              </div>
              {project.images && project.images.length > 0 ? (
                <div className="relative h-[200px] overflow-hidden rounded-[0.85rem] bg-[linear-gradient(135deg,#eef8ff_0%,#f8fbff_100%)] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] sm:h-[220px] lg:h-[250px]">
                  <Image
                    src={project.images[0]}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-[0.85rem] bg-[linear-gradient(135deg,#f5f7ff_0%,#edf2ff_100%)] text-center shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] sm:h-[220px] lg:h-[250px]">
                  <div className="space-y-2 px-8">
                    <div className="mx-auto h-10 w-10 rounded-full border border-[var(--color-border-strong)] bg-white/70" />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                      Preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

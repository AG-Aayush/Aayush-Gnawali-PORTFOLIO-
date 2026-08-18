"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { type Project } from "@/data/resume";
import { GithubIcon } from "@/components/ui/BrandIcons";
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
    <div
      className={cn(
        "group w-full overflow-visible rounded-[1.5rem] border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] shadow-[0_28px_90px_var(--color-shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_100px_var(--color-shadow)]",
        isMuted && "opacity-80",
        className
      )}
    >
      <div className="grid gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-6 lg:py-8 lg:items-start">
        <div className="space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <p className="uppercase tracking-[0.24em] text-xs font-semibold text-[var(--color-accent)]">
              Project
            </p>
            <h3 className="text-2xl font-semibold leading-tight text-[var(--color-text-primary)] sm:text-3xl">
              {project.name}
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base sm:leading-8">
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
                      : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] hover:-translate-y-0.5"
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
                className="inline-flex items-center gap-2 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
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
                className="inline-flex items-center gap-2 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
              >
                <ExternalLink size={18} />
                Live demo
              </a>
            )}
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="relative flex items-center justify-center rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] sm:p-6">
            <div className="absolute inset-x-6 top-6 h-5 rounded-full bg-[var(--color-border)]/50 blur-sm" />
            <div className="relative h-full w-full rounded-[1rem] border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                <span className="h-3 w-3 rounded-full bg-[#10b981]" />
              </div>
              {project.images && project.images.length > 0 ? (
                <div className="relative h-[220px] overflow-hidden rounded-[0.85rem] bg-[linear-gradient(135deg,#eef8ff_0%,#f8fbff_100%)] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] sm:h-[220px] lg:h-[300px]">
                  <Image
                    src={project.images[0]}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-[220px] rounded-[0.85rem] bg-[linear-gradient(135deg,#eef8ff_0%,#f8fbff_100%)] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] sm:h-[220px] lg:h-[300px]" />
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

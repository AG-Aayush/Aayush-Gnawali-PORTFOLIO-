"use client";

import { projects } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Projects" title="Projects I’ve built" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="space-y-5">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} className="h-full w-full bg-[var(--color-surface-strong)]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



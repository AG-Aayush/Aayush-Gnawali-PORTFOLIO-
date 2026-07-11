"use client";

import { useState } from "react";
import { projects } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="03 · Projects"
          title="Things I have built"
          description="Every project sits in a full-width stacked row with split content and a clean preview frame."
        />

        <div className="space-y-10">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <ProjectCard
                project={project}
                highlightedTech={highlightedTech}
                onTechHover={setHighlightedTech}
                onTechLeave={() => setHighlightedTech(null)}
              />
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-16 space-y-10">
            <Reveal>
              <p className="font-mono-tag mb-6 text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
                Also built
              </p>
            </Reveal>
            {others.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <ProjectCard
                  project={project}
                  highlightedTech={highlightedTech}
                  onTechHover={setHighlightedTech}
                  onTechLeave={() => setHighlightedTech(null)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

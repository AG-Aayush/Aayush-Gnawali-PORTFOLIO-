import { experience } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="02 · Experience"
          title="Internships & hands-on work"
          description="Real production internships and project-driven team experience with backend, DevOps, QA, and infrastructure."
        />

        <ol className="relative border-l border-[var(--color-border-strong)] pl-8 sm:pl-10">
          {experience.map((role, i) => (
            <Reveal as="li" key={role.id} delay={i * 0.1} className="relative mb-14 last:mb-0">
              <span
                className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-[9px] w-[9px] rounded-full border-2 border-[var(--color-accent-bright)] bg-[var(--color-bg)] sm:-left-[calc(2.5rem+4.5px)]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {role.role}
                  <span className="font-normal text-[var(--color-text-secondary)]"> · {role.org}</span>
                </h3>
                <span className="font-mono-tag text-xs text-[var(--color-text-tertiary)]">
                  {role.period}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
                {role.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {role.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-dim)]" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </Reveal>
          ))}

        </ol>
      </div>
    </section>
  );
}

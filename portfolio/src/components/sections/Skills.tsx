import { skills, softSkills } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 · Skills"
          title="Working across the stack"
          description="Backend-first, with DevOps and applied ML as close second interests — organized the way I actually reach for these tools."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.06}>
              <GlassCard className="h-full p-5 transition-colors duration-300 hover:border-[var(--color-accent-dim)]">
                <p className="font-mono-tag mb-4 text-[11px] uppercase tracking-widest text-[var(--color-accent-bright)]">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-8">
            <p className="font-mono-tag text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Also
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {softSkills.join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { achievements } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="02.5 · Achievements"
          title="Recognition for work and leadership"
          description="Awards and leadership roles that speak to execution, communication, and a practical approach to technical projects."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {achievements.map((achievement, i) => (
            <Reveal key={achievement.id} delay={i * 0.08}>
              <GlassCard className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {achievement.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--color-text-tertiary)]">
                      {achievement.org}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {achievement.description}
                  </p>
                  <p className="font-mono-tag text-[11px] text-[var(--color-text-tertiary)]">
                    {achievement.date}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

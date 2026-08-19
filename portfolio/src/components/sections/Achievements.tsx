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
              <GlassCard tilt className="p-6 sm:p-7">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-9 w-1 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent-dim)]" />
                      <div>
                        <p className="text-base font-semibold text-[var(--color-text-primary)]">
                          {achievement.title}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                          {achievement.org}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-[var(--color-accent-dim)] bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono-tag text-[10px] text-[var(--color-accent-bright)]">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {achievement.description}
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

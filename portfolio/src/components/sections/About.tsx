import { about, education } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="01 · About" title="Building the layer things depend on" />

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            {about.story.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            <Reveal>
              <GlassCard className="p-5">
                <p className="font-mono-tag mb-3 text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)]">
                  Snapshot
                </p>
                <dl className="space-y-3">
                  {about.highlights.map((h) => (
                    <div key={h.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-xs text-[var(--color-text-tertiary)]">{h.label}</dt>
                      <dd className="text-right text-sm text-[var(--color-text-primary)]">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard className="p-5">
                <p className="font-mono-tag mb-3 text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)]">
                  Education
                </p>
                <div className="space-y-4">
                  {education.map((e) => (
                    <div key={e.id}>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">
                        {e.degree}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                        {e.school}
                      </p>
                      <p className="font-mono-tag mt-1 text-[11px] text-[var(--color-text-tertiary)]">
                        {e.period}
                        {"note" in e && e.note ? ` · ${e.note}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

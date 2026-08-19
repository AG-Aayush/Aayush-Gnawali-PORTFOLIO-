import { certifications } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="05 · Certifications" title="Training & workshops" />

        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <GlassCard tilt className="flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-icon-border)] bg-[var(--color-icon-bg)] text-[var(--color-icon)] shadow-[0_0_18px_var(--color-accent-soft)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <Award size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {cert.name}
                    </h3>
                    <span className="font-mono-tag text-[11px] text-[var(--color-text-tertiary)]">
                      {cert.date}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{cert.issuer}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {cert.note}
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

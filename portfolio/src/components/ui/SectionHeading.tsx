import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--color-accent)]" aria-hidden="true" />
        <span className="font-mono-tag text-xs uppercase tracking-widest text-[var(--color-accent-bright)]">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </Reveal>
  );
}

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="group mb-12 max-w-2xl md:mb-16">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="h-px w-8 bg-[var(--color-accent)] transition-[width,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16 group-hover:bg-[var(--color-accent-bright)]"
          aria-hidden="true"
        />
        <span className="origin-left font-sans text-base font-semibold tracking-tight text-[var(--color-text-primary)] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:text-[var(--color-accent)] sm:text-lg">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-[var(--color-accent-bright)] sm:text-4xl">
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

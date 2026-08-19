import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono-tag inline-flex items-center rounded-full border border-[var(--color-chip-border)] bg-[var(--color-chip-bg)] px-4 py-1.5 text-[12px] text-[var(--color-text-secondary)] shadow-[inset_0_1px_0_var(--color-glass-highlight)] backdrop-blur-lg transition-all duration-200",
        "hover:-translate-y-1 hover:scale-105 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent-bright)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.2)]",
        className
      )}
    >
      {children}
    </span>
  );
}

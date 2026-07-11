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
        "font-mono-tag inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-4 py-1.5 text-[12px] text-[var(--color-text-secondary)] transition duration-200",
        "hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text-primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}

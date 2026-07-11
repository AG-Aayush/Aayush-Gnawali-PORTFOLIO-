import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
  download = false,
  className,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-[1.25rem] px-5 py-2.5 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none";

  const variants = {
    primary:
      "bg-[var(--color-accent)] text-white shadow-[0_16px_24px_rgba(177,108,75,0.16)] hover:bg-[var(--color-accent-bright)]",
    secondary:
      "border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[0_10px_16px_rgba(0,0,0,0.06)] hover:bg-[var(--color-bg-elevated)]",
    ghost:
      "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
  };

  const content = (
    <>
      {children}
      {icon && (
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        download={download}
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}

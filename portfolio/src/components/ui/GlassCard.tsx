import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  return (
    <Tag
      className={cn(
        "group relative overflow-hidden rounded-[1rem] border border-white/45 bg-[rgba(248,250,252,0.24)] backdrop-blur-2xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_30px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:scale-[1.01] hover:border-[var(--color-accent)] hover:shadow-[0_22px_48px_rgba(59,130,246,0.22)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -top-10 h-24 bg-white/35 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-white/90 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

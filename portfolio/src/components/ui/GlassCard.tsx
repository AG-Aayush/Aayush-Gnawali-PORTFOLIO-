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
        "rounded-[1rem] border border-[var(--color-card-border)] bg-[var(--color-card-bg)]/90 backdrop-blur-xl",
        "shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useRef } from "react";

export function GlassCard({
  children,
  className,
  as: Tag = "div",
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  tilt?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | HTMLElement | null>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!tilt || event.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -9}deg) rotateY(${x * 9}deg) translateY(-10px) scale(1.015)`;
  }

  function handlePointerLeave() {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform = "";
  }

  return (
    <Tag
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative overflow-hidden rounded-[1rem] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] backdrop-blur-2xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_30px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out",
        !tilt && "hover:-translate-y-2 hover:scale-[1.01]",
        "hover:border-[var(--color-accent)] hover:shadow-[0_22px_48px_rgba(59,130,246,0.22)]",
        className
      )}
      style={tilt ? { transformStyle: "preserve-3d" } : undefined}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -top-10 h-24 bg-[var(--color-glass-highlight)] opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-[var(--color-glass-highlight)] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

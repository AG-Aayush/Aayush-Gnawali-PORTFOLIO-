"use client";

import { useEffect, useRef } from "react";

export function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handlePointerMove = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX - 8}px, ${event.clientY - 8}px, 0)`;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[80] h-4 w-4 rounded-full opacity-40"
      style={{
        background:
          "radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(59, 130, 246, 0) 72%)",
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}

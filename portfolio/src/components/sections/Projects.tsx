"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

type ProjectStackCardProps = {
  project: (typeof projects)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
  activeIndex: number;
  isMobile: boolean;
};

function ProjectStackCard({ project, index, total, progress, activeIndex, isMobile }: ProjectStackCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const offset = useTransform(progress, (value) => {
    const start = index / total;
    const span = 1.2 / total;
    const raw = (value - start) / span;
    return Math.min(1, Math.max(0, raw));
  });

  const behindOffset = index === 0 ? 0 : index * 0.18;

  const x = useTransform(offset, [0, 0.16, 0.4, 0.7, 1], [
    isMobile ? -16 : -150,
    isMobile ? -10 : -88,
    0,
    isMobile ? 8 + behindOffset * 8 : 30 + behindOffset * 20,
    isMobile ? 18 + behindOffset * 10 : 86 + behindOffset * 24,
  ]);
  const y = useTransform(offset, [0, 0.2, 0.5, 0.8, 1], [
    isMobile ? 10 + behindOffset * 7 : 24 + behindOffset * 12,
    isMobile ? 6 + behindOffset * 5 : 14 + behindOffset * 10,
    0,
    isMobile ? 4 + behindOffset * 3 : 12 + behindOffset * 8,
    isMobile ? 9 + behindOffset * 5 : 26 + behindOffset * 12,
  ]);
  const rotate = useTransform(offset, [0, 0.2, 0.5, 0.8, 1], [
    isMobile ? -4 - behindOffset * 2 : -10 - behindOffset * 5,
    isMobile ? -2 - behindOffset : -6 - behindOffset * 2,
    0,
    isMobile ? 1 + behindOffset : 3 + behindOffset * 2,
    isMobile ? 4 + behindOffset * 2 : 10 + behindOffset * 5,
  ]);
  const scale = useTransform(offset, [0, 0.2, 0.5, 0.8, 1], [
    isMobile ? 0.96 : 0.9,
    isMobile ? 0.98 : 0.95,
    1,
    isMobile ? 0.99 : 0.98 - behindOffset * 0.05,
    isMobile ? 0.97 : 0.94 - behindOffset * 0.06,
  ]);
  const opacity = useTransform(offset, [0, 0.08, 0.25, 0.72, 0.9, 1], [0, 0.15, 0.62, 1, 0.95, 1]);
  const blur = useTransform(offset, [0, 0.18, 0.5, 0.8, 1], ["2px", "1px", "0px", "0.5px", "1px"]);

  const style = shouldReduceMotion
    ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
    : { x, y, rotate, scale, opacity, filter: blur };

  const isActive = index === activeIndex;

  return (
    <motion.div
      style={{
        ...style,
        zIndex: isActive ? total + 10 : index + 1,
        pointerEvents: "auto",
      }}
      className="absolute inset-0 overflow-visible transition-all duration-300"
    >
      <ProjectCard
        project={project}
        className={`h-auto min-h-[420px] bg-[var(--color-surface-strong)] sm:min-h-[520px] lg:min-h-[560px] ${
          isMobile ? "min-h-[380px]" : ""
        } ${isActive ? "ring-2 ring-[var(--color-accent)]/55 shadow-[0_0_0_1px_rgba(124,58,237,0.18)]" : ""}`}
      />
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.9,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextIndex = Math.min(projects.length - 1, Math.max(0, Math.round(latest * (projects.length - 1))));
    setActiveIndex(nextIndex);
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-24 border-t border-[var(--color-border)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="03 · Projects" title="Projects I’ve built" />
      </div>

      <div className="relative h-[420vh] lg:h-[500vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
            <div className={isMobile ? "relative mx-auto h-[48vh] min-h-[360px] w-full max-w-sm" : "relative mx-auto h-[82vh] min-h-[620px] w-full max-w-6xl"}>
              {projects.map((project, index) => (
                <ProjectStackCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={projects.length}
                  progress={smoothProgress}
                  activeIndex={activeIndex}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



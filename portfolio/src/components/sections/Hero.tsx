"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { personal } from "@/data/resume";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { NodeGraphBackground } from "@/components/ui/NodeGraphBackground";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "@/components/ui/BrandIcons";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number }>>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const tx = event.clientX;
      const ty = event.clientY;
      const dx = tx - pointerTarget.current.x;
      const dy = ty - pointerTarget.current.y;
      const speed = Math.min(Math.hypot(dx, dy), 40);

      pointerTarget.current = { x: tx, y: ty };
      velocityRef.current = { x: dx * 0.7, y: dy * 0.7 };

      if (speed > 0.35) {
        trailRef.current.push({
          x: tx,
          y: ty,
          vx: dx,
          vy: dy,
          radius: 18 + speed * 0.8,
        });
      }

      if (trailRef.current.length > 18) {
        trailRef.current.shift();
      }
    };

    const handlePointerLeave = () => {
      trailRef.current = [];
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const dx = pointerTarget.current.x - pointerCurrent.current.x;
      const dy = pointerTarget.current.y - pointerCurrent.current.y;
      pointerCurrent.current.x += dx * 0.18;
      pointerCurrent.current.y += dy * 0.18;

      const baseSpeed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
      const trailIntensity = Math.min(1, baseSpeed / 32);

      for (let i = 0; i < trailRef.current.length; i += 1) {
        const point = trailRef.current[i];
        const alpha = (i + 1) / trailRef.current.length;
        const blobRadius = Math.max(12, point.radius * (0.4 + alpha * 1.4));
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          blobRadius * 1.7
        );

        gradient.addColorStop(0, `rgba(224, 231, 255, ${0.72 * alpha})`);
        gradient.addColorStop(0.18, `rgba(196, 181, 253, ${0.56 * alpha})`);
        gradient.addColorStop(0.42, `rgba(129, 140, 248, ${0.32 * alpha})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, blobRadius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(
        pointerCurrent.current.x,
        pointerCurrent.current.y,
        0,
        pointerCurrent.current.x,
        pointerCurrent.current.y,
        36 + trailIntensity * 18
      );
      glow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      glow.addColorStop(0.28, "rgba(191, 219, 254, 0.8)");
      glow.addColorStop(0.56, "rgba(165, 180, 252, 0.42)");
      glow.addColorStop(1, "rgba(96, 165, 250, 0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pointerCurrent.current.x, pointerCurrent.current.y, 28 + trailIntensity * 18, 0, Math.PI * 2);
      ctx.fill();

      const smallDot = ctx.createRadialGradient(
        pointerCurrent.current.x,
        pointerCurrent.current.y,
        0,
        pointerCurrent.current.x,
        pointerCurrent.current.y,
        10
      );
      smallDot.addColorStop(0, "rgba(255,255,255,0.95)");
      smallDot.addColorStop(0.25, "rgba(196,181,253,0.88)");
      smallDot.addColorStop(1, "rgba(96,165,250,0)");
      ctx.fillStyle = smallDot;
      ctx.beginPath();
      ctx.arc(pointerCurrent.current.x, pointerCurrent.current.y, 11, 0, Math.PI * 2);
      ctx.fill();

      frameRef.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resizeCanvas);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Signature background visual — quiet, positioned right, never full-bleed */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] items-center lg:flex">
        <NodeGraphBackground />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(181,108,75,0.14),_transparent_22%)]"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Photo placeholder — swap the div's background for an <Image> once
              a real photo is available, at /public/avatar.jpg. Kept small and
              quiet so it doesn't compete with the name as the focal point. */}
          <motion.div
            initial={useReducedMotion() ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={useReducedMotion() ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={useReducedMotion() ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
            className="group relative mb-6 block h-28 w-28 overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_25px_60px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-[1.04]"
          >
            <span className="avatar-ring pointer-events-none" aria-hidden="true" />
            <span className="absolute inset-3 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.14),_transparent_55%)]" />
            <div className="relative h-full w-full">
              <Image
                src={personal.profilePicture}
                alt={`${personal.name} profile picture (light)`}
                fill
                sizes="112px"
                className={`absolute inset-0 rounded-full object-cover transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
              />
              <Image
                src={personal.profilePictureDark ?? personal.profilePicture}
                alt={`${personal.name} profile picture (dark)`}
                fill
                sizes="112px"
                className={`absolute inset-0 rounded-full object-cover transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 px-4 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <span className="typewriter font-mono-tag text-[11px] text-[var(--color-text-secondary)]">
              Exploring Tech • Building Systems • Automating Workflows
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
            className="mt-4 text-xl text-[var(--color-text-secondary)] sm:text-2xl"
          >
            DevOps • DevSecOps • AI/ML • Backend
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: easeOut }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-text-secondary)]"
          >
            {personal.tagline} Building toward backend, DevOps, and applied ML roles —
            remote, and ready to learn fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#contact" variant="primary" icon={<ArrowUpRight size={15} />}>
              Get in touch
            </Button>
            <Button
              href={personal.resumeFile}
              variant="secondary"
              external
              download
            >
              Download resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.5, ease: easeOut }}
            className="mt-10 flex items-center gap-5"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              href={personal.medium}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Medium profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <MediumIcon size={19} />
            </a>
            <a
              href={personal.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram profile"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <InstagramIcon size={19} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Send email"
              className="text-[var(--color-text-tertiary)] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)]"
            >
              <Mail size={19} />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}

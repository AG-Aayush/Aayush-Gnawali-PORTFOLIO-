"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";

type Particle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  delay: number;
  size: number;
  r: number;
  g: number;
  b: number;
  a: number;
  wobble: number;
};

type IntroLoaderProps = {
  onComplete?: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];

    const image = new Image();
    image.decoding = "async";
    image.src = theme === "dark" ? "/Aayush-profile.jpeg" : "/Aayush.jpeg";
    image.style.display = "none";
    image.alt = "";

    const drawBackground = (width: number, height: number, alpha = 1) => {
      const rootStyles = getComputedStyle(document.documentElement);
      const bgColor = rootStyles.getPropertyValue("--color-bg") || "#eef3f9";
      const accentColor = rootStyles.getPropertyValue("--color-accent") || "#3b82f6";
      const accent = accentColor.startsWith("#") ? hexToRgb(accentColor) : { r: 59, g: 130, b: 246 };

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
      glow.addColorStop(0, `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${0.18 * alpha})`);
      glow.addColorStop(0.35, `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${0.08 * alpha})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const buildParticles = (width: number, height: number) => {
      const portraitRadius = Math.min(width * 0.09, 92);
      const centerX = width / 2;
      const centerY = height / 2 - 12;
      const sampleSize = shouldReduceMotion ? 82 : 104;

      const square = document.createElement("canvas");
      square.width = sampleSize;
      square.height = sampleSize;
      const squareCtx = square.getContext("2d");
      if (!squareCtx) return [] as Particle[];

      const cropSize = Math.min(image.width, image.height);
      const offsetX = (image.width - cropSize) / 2;
      const offsetY = (image.height - cropSize) / 2;

      squareCtx.clearRect(0, 0, sampleSize, sampleSize);
      squareCtx.beginPath();
      squareCtx.arc(sampleSize / 2, sampleSize / 2, sampleSize / 2, 0, Math.PI * 2);
      squareCtx.closePath();
      squareCtx.clip();
      squareCtx.drawImage(
        image,
        offsetX,
        offsetY,
        cropSize,
        cropSize,
        0,
        0,
        sampleSize,
        sampleSize
      );

      const pixelData = squareCtx.getImageData(0, 0, sampleSize, sampleSize).data;
      const step = shouldReduceMotion ? 2 : 1;
      const newParticles: Particle[] = [];

      for (let y = 0; y < sampleSize; y += step) {
        for (let x = 0; x < sampleSize; x += step) {
          const dx = x - sampleSize / 2;
          const dy = y - sampleSize / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const radiusBounds = sampleSize / 2;
          if (distance > radiusBounds) continue;

          const index = (y * sampleSize + x) * 4;
          const alpha = pixelData[index + 3];
          if (alpha < 20) continue;

          const targetX = centerX + (dx / sampleSize) * (portraitRadius * 2.1);
          const targetY = centerY + (dy / sampleSize) * (portraitRadius * 2.1);
          const edgeRoll = Math.random();

          let startX = 0;
          let startY = 0;

          if (edgeRoll < 0.2) {
            startX = -120 - Math.random() * width * 0.8;
            startY = Math.random() * (height + 200) - 100;
          } else if (edgeRoll < 0.4) {
            startX = width + 120 + Math.random() * width * 0.8;
            startY = Math.random() * (height + 200) - 100;
          } else if (edgeRoll < 0.65) {
            startX = Math.random() * (width + 240) - 120;
            startY = -120 - Math.random() * height * 0.8;
          } else {
            startX = Math.random() * (width + 240) - 120;
            startY = height + 120 + Math.random() * height * 0.8;
          }

          if (Math.random() < 0.14) {
            startX += Math.random() < 0.5 ? -Math.random() * 220 : Math.random() * 220;
            startY += Math.random() < 0.5 ? -Math.random() * 220 : Math.random() * 220;
          }

          newParticles.push({
            startX,
            startY,
            targetX,
            targetY,
            delay: Math.random() * (shouldReduceMotion ? 180 : 1400),
            size: shouldReduceMotion ? 1.5 : 1.2 + Math.random() * 1.1,
            r: pixelData[index],
            g: pixelData[index + 1],
            b: pixelData[index + 2],
            a: clamp(alpha / 255, 0.35, 1),
            wobble: Math.random() * Math.PI * 2,
          });
        }
      }

      return newParticles;
    };

    const startAnimation = () => {
      const rect = wrapper.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = buildParticles(width, height);
      if (!particles.length) {
        setIsVisible(false);
        return;
      }

      const totalDuration = shouldReduceMotion ? 1300 : 5000;
      const travelDuration = shouldReduceMotion ? 900 : 2200;
      const finalAssembleStart = shouldReduceMotion ? 700 : 1800;
      const zoomStart = shouldReduceMotion ? 1100 : 4200;
      const zoomDuration = shouldReduceMotion ? 400 : 800;
      const fadeOutDelay = shouldReduceMotion ? 200 : 450;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        drawBackground(width, height, 1);

        const centerX = width / 2;
        const centerY = height / 2 - 12;

        for (const particle of particles) {
          const localProgress = clamp((elapsed - particle.delay) / travelDuration, 0, 1);
          const eased = easeOutCubic(localProgress);
          const x = particle.startX + (particle.targetX - particle.startX) * eased;
          const y = particle.startY + (particle.targetY - particle.startY) * eased;
          const shimmer = 0.7 + Math.sin(now * 0.018 + particle.wobble) * 0.3;
          const size = particle.size * (0.85 + shimmer * 0.45);
          const alpha = clamp(particle.a * shimmer, 0.35, 1);

          if (elapsed > particle.delay) {
            ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${alpha})`;
            ctx.fillRect(x, y, size, size);
          }
        }

        const assembleProgress = clamp((elapsed - finalAssembleStart) / (shouldReduceMotion ? 300 : 900), 0, 1);
        if (assembleProgress > 0) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.scale(1 + assembleProgress * 0.08, 1 + assembleProgress * 0.08);
          ctx.translate(-centerX, -centerY);

          for (const particle of particles) {
            const targetAlpha = clamp(particle.a * (0.25 + assembleProgress), 0.2, 1);
            const size = particle.size * (0.9 + assembleProgress * 0.2);
            const wobbleX = Math.sin(now * 0.02 + particle.wobble) * (1 - assembleProgress) * 1.6;
            const wobbleY = Math.cos(now * 0.022 + particle.wobble) * (1 - assembleProgress) * 1.6;

            ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${targetAlpha})`;
            ctx.fillRect(particle.targetX + wobbleX, particle.targetY + wobbleY, size, size);
          }

          ctx.restore();
        }

        if (elapsed > zoomStart) {
          const zoomProgress = clamp((elapsed - zoomStart) / zoomDuration, 0, 1);
          const scaler = 1 + easeInOutCubic(zoomProgress) * (shouldReduceMotion ? 0.12 : 0.18);

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.scale(scaler, scaler);
          ctx.translate(-centerX, -centerY);

          for (const particle of particles) {
            const size = particle.size * 0.96;
            ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${clamp(particle.a * 1.05, 0.3, 1)})`;
            ctx.fillRect(particle.targetX, particle.targetY, size, size);
          }

          ctx.restore();
        }

        if (elapsed > totalDuration + fadeOutDelay) {
          setIsVisible(false);
          onComplete?.();
          return;
        }

        raf = window.requestAnimationFrame(animate);
      };

      raf = window.requestAnimationFrame(animate);
    };

    image.onload = startAnimation;
    image.onerror = () => setIsVisible(false);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [theme, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[120] overflow-hidden bg-[var(--color-bg)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(167,139,250,0.09),_transparent_22%)]" />
          <canvas ref={canvasRef} className="h-full w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3 ? normalized.split("").map((digit) => digit + digit).join("") : normalized;
  const int = Number.parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

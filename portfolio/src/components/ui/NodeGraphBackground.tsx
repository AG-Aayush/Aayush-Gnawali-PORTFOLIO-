"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = { id: string; x: number; y: number; label: string };

const nodes: Node[] = [
  { id: "api", x: 200, y: 90, label: "api" },
  { id: "auth", x: 380, y: 60, label: "auth" },
  { id: "db", x: 120, y: 220, label: "db" },
  { id: "queue", x: 320, y: 230, label: "queue" },
  { id: "deploy", x: 470, y: 170, label: "deploy" },
  { id: "monitor", x: 60, y: 130, label: "monitor" },
];

const edges: [string, string][] = [
  ["api", "auth"],
  ["api", "db"],
  ["api", "queue"],
  ["queue", "deploy"],
  ["db", "monitor"],
  ["api", "monitor"],
  ["auth", "deploy"],
];

/**
 * A quiet, abstract diagram of connected services — the visual equivalent
 * of what this candidate actually builds (APIs, auth, queues, deploy
 * pipelines) rather than a decorative gradient orb. Pulses gently to imply
 * a live system; respects prefers-reduced-motion.
 */
export function NodeGraphBackground() {
  const shouldReduceMotion = useReducedMotion();
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 540 300"
      className="h-full w-full opacity-[0.55]"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {edges.map(([from, to], i) => {
        const a = nodeMap[from];
        const b = nodeMap[to];
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edgeGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.2,
              delay: shouldReduceMotion ? 0 : 0.12 * i,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}

      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="var(--color-bg)"
            stroke="var(--color-accent-bright)"
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.15 * i + 0.4,
              ease: "easeOut",
            }}
          />
          {!shouldReduceMotion && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3.5"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
              transition={{
                duration: 2.4,
                delay: 1 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeOut",
              }}
            />
          )}
          <motion.text
            x={node.x}
            y={node.y - 12}
            textAnchor="middle"
            fontSize="9"
            fill="var(--color-text-tertiary)"
            fontFamily="ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.15 * i + 0.6, duration: 0.4 }}
          >
            {node.label}
          </motion.text>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="10"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.7 }}
          />
        </g>
      ))}
    </svg>
  );
}

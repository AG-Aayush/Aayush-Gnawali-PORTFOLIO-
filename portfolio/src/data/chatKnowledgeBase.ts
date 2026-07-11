/**
 * Local knowledge base for the on-site assistant.
 *
 * This is intentionally NOT a call to an LLM or external API. It's a small,
 * fast, privacy-friendly keyword-matched FAQ engine grounded entirely in
 * `resume.ts`. It only ever says things that are already on this page.
 */

import {
  personal,
  about,
  experience,
  projects,
  skills,
  certifications,
  achievements,
  education,
} from "./resume";

export type KnowledgeEntry = {
  id: string;
  /** Keywords/phrases that trigger this answer (lowercase). */
  triggers: string[];
  answer: () => string;
};

const list = (items: readonly string[]) => items.join(", ");

const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "intro",
    triggers: ["tell me about", "who is", "about aayush", "introduce", "who are you working with"],
    answer: () => `${personal.name} is a ${personal.role}. ${personal.summary}`,
  },
  {
    id: "technologies",
    triggers: ["technologies", "tech stack", "what does he use", "languages", "programming languages"],
    answer: () => {
      const backend = skills.find((s) => s.id === "backend")?.skills ?? [];
      const devops = skills.find((s) => s.id === "devops")?.skills ?? [];
      return `On the backend side: ${list(backend)}. For DevOps: ${list(
        devops
      )}. He also works with AI/ML tools like ${list(
        skills.find((s) => s.id === "ai-ml")?.skills ?? []
      )}.`;
    },
  },
  {
    id: "devops-experience",
    triggers: ["devops experience", "devops", "docker", "ci/cd", "infrastructure"],
    answer: () => {
      const legoRole = experience.find((e) => e.id === "lego-tech");
      if (!legoRole) return "No DevOps experience on record.";
      return `He worked as a ${legoRole.role} at ${legoRole.org} (${legoRole.period}), where he ${legoRole.points[1].toLowerCase()} and ${legoRole.points[2].toLowerCase()}`;
    },
  },
  {
    id: "backend-experience",
    triggers: ["backend experience", "backend development", "api development", "fastapi"],
    answer: () => {
      const role = experience.find((e) => e.id === "e-digital-nepal");
      const proj = projects.find((p) => p.id === "fastapi-notes");
      return `He worked as a ${role?.role} at ${role?.org}, developing a production module with FastAPI on a live ERP system. On the project side, his ${proj?.name} implements JWT authentication, async SQLAlchemy, and PostgreSQL — it's a solid example of his backend work.`;
    },
  },
  {
    id: "projects",
    triggers: ["projects", "what has he built", "built", "portfolio projects", "show me projects"],
    answer: () => {
      const featured = projects.filter((p) => p.featured);
      return `A few highlights: ${featured
        .map((p) => `${p.name} (${list(p.stack.slice(0, 3))})`)
        .join("; ")}. Scroll to the Projects section for the full breakdown, including challenges and what he learned from each.`;
    },
  },
  {
    id: "ai-ml",
    triggers: ["ai experience", "machine learning", "ai/ml", "ml experience", "pytorch", "mlops"],
    answer: () => {
      const ml = skills.find((s) => s.id === "ai-ml")?.skills ?? [];
      return `He's worked with ${list(
        ml
      )}, including deploying a real model — his House Price Prediction project takes a Scikit-learn regression model from notebook to a live Streamlit interface with real-time inference. He's actively building toward MLOps: not just training models, but operating them.`;
    },
  },
  {
    id: "hire-backend",
    triggers: ["hire him", "hire for backend", "available", "open to work", "looking for", "recruit"],
    answer: () =>
      `Yes — ${personal.firstName} is open to remote opportunities in ${list(
        personal.focusAreas
      )}. The best next step is reaching out via the Contact section or emailing ${personal.email} directly.`,
  },
  {
    id: "career-goals",
    triggers: ["career goals", "goals", "what does he want", "future", "long term"],
    answer: () =>
      `${personal.firstName} is looking for remote backend and DevOps roles now, with a longer-term focus on DevSecOps, MLOps, and cloud infrastructure. He's specifically drawn to systems that fail predictably and can be operated reliably, not just built.`,
  },
  {
    id: "education",
    triggers: ["education", "degree", "university", "college", "studying", "gpa"],
    answer: () =>
      education
        .map((e) => `${e.degree} at ${e.school} (${e.period})`)
        .join(". "),
  },
  {
    id: "certifications",
    triggers: ["certifications", "certificates", "workshop", "training"],
    answer: () =>
      certifications
        .map((c) => `${c.name} — ${c.issuer}, ${c.date}: ${c.note}`)
        .join(" "),
  },
  {
    id: "internships",
    triggers: ["internship", "internships", "work experience", "companies"],
    answer: () =>
      experience
        .map((e) => `${e.role} at ${e.org} (${e.period})`)
        .join(". "),
  },
  {
    id: "achievements",
    triggers: ["achievements", "hult prize", "leadership", "awards"],
    answer: () =>
      achievements.map((a) => `${a.title}, ${a.org} — ${a.description}`).join(" "),
  },
  {
    id: "skills-full",
    triggers: ["skills", "what can he do", "capabilities"],
    answer: () =>
      skills.map((s) => `${s.label}: ${list(s.skills)}`).join(". "),
  },
  {
    id: "contact",
    triggers: ["contact", "reach him", "email", "linkedin", "github", "get in touch"],
    answer: () =>
      `You can reach ${personal.firstName} at ${personal.email}, on LinkedIn (${personal.linkedin.replace(
        "https://",
        ""
      )}), or GitHub (${personal.github.replace("https://", "")}). There's also a contact form on this page.`,
  },
  {
    id: "about-story",
    triggers: ["career story", "background", "how did he start", "journey"],
    answer: () => about.story[0],
  },
];

const PRIVATE_TOPIC_PATTERNS = [
  "phone",
  "address",
  "location",
  "password",
  "salary",
  "date of birth",
  "birthday",
  "ssn",
  "national id",
  "bank",
  "personal email",
  "home",
  "live",
];

const OFF_TOPIC_FALLBACK =
  "I can only answer questions about Aayush's background, skills, projects, and experience — I don't have information beyond what's on this page. Try asking about his projects, DevOps experience, or how to get in touch.";

const PRIVATE_FALLBACK =
  "I'm not able to share personal details like that. For anything beyond what's on this site, please reach out directly through the Contact section.";

function normalize(input: string): string {
  return input.toLowerCase().trim();
}

/**
 * Matches a user query against the knowledge base using simple keyword
 * scoring — no network calls, no model inference. Deterministic and fast.
 */
export function answerQuery(rawQuery: string): string {
  const query = normalize(rawQuery);

  if (PRIVATE_TOPIC_PATTERNS.some((p) => query.includes(p))) {
    return PRIVATE_FALLBACK;
  }

  let best: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of knowledgeBase) {
    for (const trigger of entry.triggers) {
      if (query.includes(trigger)) {
        const score = trigger.length;
        if (!best || score > best.score) {
          best = { entry, score };
        }
      }
    }
  }

  if (best) return best.entry.answer();

  // Loose fallback: word-overlap match if no direct phrase hit.
  const queryWords = new Set(query.split(/\s+/).filter((w) => w.length > 3));
  let looseBest: { entry: KnowledgeEntry; overlap: number } | null = null;
  for (const entry of knowledgeBase) {
    const triggerWords = entry.triggers.join(" ").split(/\s+/);
    const overlap = triggerWords.filter((w) => queryWords.has(w)).length;
    if (overlap > 0 && (!looseBest || overlap > looseBest.overlap)) {
      looseBest = { entry, overlap };
    }
  }
  if (looseBest) return looseBest.entry.answer();

  return OFF_TOPIC_FALLBACK;
}

export const suggestedPrompts = [
  "Tell me about Aayush",
  "What technologies does he use?",
  "Explain his DevOps experience",
  "What projects has he built?",
  "What AI experience does he have?",
  "Can I hire him for backend development?",
  "What are his career goals?",
] as const;

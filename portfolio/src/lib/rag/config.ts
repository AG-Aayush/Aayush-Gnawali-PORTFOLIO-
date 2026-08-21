const getNumber = (key: string, fallback: number) => {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  LLM_API_KEY: process.env.LLM_API_KEY ?? "",
  LLM_MODEL: process.env.LLM_MODEL ?? "gpt-4o-mini",
  RAG_DOCUMENT_VERSION: process.env.RAG_DOCUMENT_VERSION ?? "portfolio-v1",
  RAG_MIN_SIMILARITY: getNumber("RAG_MIN_SIMILARITY", 0.55),
} as const;

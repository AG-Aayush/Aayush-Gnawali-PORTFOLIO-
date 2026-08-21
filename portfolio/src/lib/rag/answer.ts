import OpenAI from "openai";
import { z } from "zod";
import { env } from "@/lib/rag/config";
import type { RetrievedChunk } from "@/lib/rag/types";

const RagAnswerSchema = z.object({
  answer: z.string().min(1).max(1500),
  citations: z
    .array(
      z.object({
        chunkId: z.string(),
        source: z.string(),
        section: z.string(),
      })
    )
    .max(8),
  grounded: z.boolean(),
  needsClarification: z.boolean(),
});

const client = env.LLM_API_KEY ? new OpenAI({ apiKey: env.LLM_API_KEY }) : null;

function parseJsonResponse(raw: string) {
  const trimmed = raw.trim();
  const withoutCodeFence = trimmed.replace(/^```json\s*/i, "").replace(/```$/i, "");
  return JSON.parse(withoutCodeFence);
}

export async function generateGroundedAnswer(prompt: string, chunks: RetrievedChunk[]) {
  if (!client) {
    throw new Error("LLM_API_KEY is missing");
  }

  const completion = await client.responses.create({
    model: env.LLM_MODEL,
    input: prompt,
    temperature: 0.2,
  });

  const text = completion.output_text ?? "";
  const parsed = parseJsonResponse(text);
  const validated = RagAnswerSchema.parse(parsed);

  const validChunkIds = new Set(chunks.map((chunk) => chunk.id));
  const citations = validated.citations.filter((citation) => validChunkIds.has(citation.chunkId));

  return {
    ...validated,
    citations,
  };
}

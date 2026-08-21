import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/rag/prompt";
import { generateGroundedAnswer } from "@/lib/rag/answer";
import { env } from "@/lib/rag/config";
import { chunkText } from "@/lib/rag/chunk";
import { serializeResume } from "@/lib/rag/serializeResume";
import { ChatRequestSchema, containsPrivateTopic, SAFE_FALLBACK } from "@/lib/rag/safety";
import type { RetrievedChunk } from "@/lib/rag/types";

export const runtime = "nodejs";

function buildMatches(question: string): RetrievedChunk[] {
  const normalizedQuestion = question.toLowerCase();
  const records = serializeResume().flatMap((record) =>
    chunkText(record.content).map((content, index) => ({
      id: `${record.section}-${index}`,
      sourceName: "resume.ts",
      sourceType: "resume" as const,
      visibility: "public" as const,
      documentVersion: env.RAG_DOCUMENT_VERSION,
      title: record.title,
      section: record.section,
      chunkIndex: index,
      content,
      similarity: 0,
    }))
  );

  return records
    .map((record) => {
      const text = `${record.title} ${record.section} ${record.content}`.toLowerCase();
      const isRelevant =
        text.includes(normalizedQuestion) ||
        normalizedQuestion.includes(record.title.toLowerCase()) ||
        record.content.toLowerCase().includes(normalizedQuestion);

      return {
        ...record,
        similarity: isRelevant ? 0.9 : 0,
      };
    })
    .filter((record) => record.similarity > 0)
    .slice(0, 6);
}

export async function POST(request: Request) {
  try {
    const body = ChatRequestSchema.parse(await request.json());

    if (containsPrivateTopic(body.message)) {
      return NextResponse.json({
        answer: SAFE_FALLBACK,
        citations: [],
        grounded: false,
        needsClarification: true,
      });
    }

    const relevant = buildMatches(body.message);

    if (relevant.length === 0) {
      return NextResponse.json({
        answer: SAFE_FALLBACK,
        citations: [],
        grounded: false,
        needsClarification: true,
      });
    }

    const prompt = buildPrompt(body.message, relevant);
    const result = await generateGroundedAnswer(prompt, relevant);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        answer: "The assistant is temporarily unavailable. Please use the Contact section.",
        citations: [],
        grounded: false,
        needsClarification: true,
      },
      { status: 500 }
    );
  }
}

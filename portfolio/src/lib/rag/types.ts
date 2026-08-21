export type RagChunk = {
  id: string;
  sourceName: string;
  sourceType: "resume" | "cv" | "portfolio";
  visibility: "public" | "private";
  documentVersion: string;
  title: string;
  section: string;
  chunkIndex: number;
  content: string;
};

export type RetrievedChunk = RagChunk & {
  similarity: number;
};

export type RagCitation = {
  chunkId: string;
  source: string;
  section: string;
};

export type RagAnswer = {
  answer: string;
  citations: RagCitation[];
  grounded: boolean;
  needsClarification: boolean;
};

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

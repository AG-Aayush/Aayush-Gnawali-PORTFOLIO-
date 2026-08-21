import { z } from "zod";

export const ChatRequestSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .max(12)
    .default([]),
});

export const PRIVATE_PATTERNS = [
  "password",
  "api key",
  "secret",
  "home address",
  "phone number",
  "salary",
  "date of birth",
  "birthday",
  "ssn",
  "national id",
  "bank",
  "personal email",
  "live in",
  "residence",
];

export const SAFE_FALLBACK =
  "I could not find enough verified public portfolio information to answer that accurately.";

export function containsPrivateTopic(input: string): boolean {
  const normalized = input.toLowerCase();
  return PRIVATE_PATTERNS.some((pattern) => normalized.includes(pattern));
}

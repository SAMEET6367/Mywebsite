import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chatbot-persona";

// Sam — Sameet's AI Assistant — chat endpoint.
// Runs on the server only — Gemini API keys never reach the browser.
//
// Setup:
//   1. Get free keys at https://aistudio.google.com/app/apikey
//      (create up to 10 separate API keys — separate Google accounts/
//      projects give you separate free-tier quotas, which is the point
//      of rotating across several)
//   2. Add them to .env.local (see .env.local.example) as
//      GEMINI_API_KEY_1 .. GEMINI_API_KEY_10
//   3. Restart `npm run dev`

const GEMINI_MODEL = "gemini-3.1-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Collect every configured key: GEMINI_API_KEY_1 .. GEMINI_API_KEY_10.
// Falls back to plain GEMINI_API_KEY too, so a single-key setup still works.
function loadApiKeys(): string[] {
  const keys: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const key = process.env[`GEMINI_API_KEY_${i}`];
    if (key) keys.push(key);
  }
  if (keys.length === 0 && process.env.GEMINI_API_KEY) {
    keys.push(process.env.GEMINI_API_KEY);
  }
  return keys;
}

// Simple in-memory rotation pointer. Resets on server restart/redeploy,
// which is fine — it just needs to spread load, not be perfectly fair.
let nextKeyIndex = 0;

function pickStartIndex(total: number): number {
  const start = nextKeyIndex % total;
  nextKeyIndex = (nextKeyIndex + 1) % total;
  return start;
}

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export async function POST(req: NextRequest) {
  const apiKeys = loadApiKeys();

  if (apiKeys.length === 0) {
    return NextResponse.json(
      {
        error:
          "No Gemini API keys are set on the server. Add GEMINI_API_KEY_1..GEMINI_API_KEY_10 to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Keep the request small and cheap — only send the last N turns.
  const MAX_TURNS = 12;
  const recentMessages = messages.slice(-MAX_TURNS);

  const contents = recentMessages.map((m) => ({
    role: m.role === "model" ? "model" : "user",
    parts: [{ text: m.text }],
  }));

  const requestBody = JSON.stringify({
    contents,
    systemInstruction: {
      role: "system",
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  });

  // Try keys in rotation starting from a moving pointer. A key that's
  // rate-limited (429) or otherwise erroring just gets skipped in favor
  // of the next one, instead of failing the whole request.
  const startIndex = pickStartIndex(apiKeys.length);
  let lastErrorStatus: number | null = null;
  let lastErrorText = "";

  for (let attempt = 0; attempt < apiKeys.length; attempt++) {
    const key = apiKeys[(startIndex + attempt) % apiKeys.length];

    try {
      const response = await fetch(`${GEMINI_URL}?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      if (!response.ok) {
        lastErrorStatus = response.status;
        lastErrorText = await response.text();
        console.error(
          `Gemini API error on key #${(startIndex + attempt) % apiKeys.length}:`,
          response.status,
          lastErrorText
        );
        // Rate-limited or server error — move on to the next key.
        if (response.status === 429 || response.status >= 500) continue;
        // Anything else (bad key, bad request) — no point retrying other keys.
        break;
      }

      const data = await response.json();

      const reply: string | undefined =
        data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text ?? "")
          .join("") ?? undefined;

      if (!reply) {
        // Most common cause: the response was blocked by a safety filter.
        const blockReason = data?.candidates?.[0]?.finishReason;
        console.error("Gemini returned no text. finishReason:", blockReason, data);
        return NextResponse.json(
          { error: "I couldn't come up with a reply to that one — try rephrasing?" },
          { status: 502 }
        );
      }

      return NextResponse.json({ reply });
    } catch (err) {
      console.error("Failed to reach Gemini API:", err);
      lastErrorStatus = 502;
      lastErrorText = String(err);
      continue;
    }
  }

  console.error("All Gemini API keys failed.", lastErrorStatus, lastErrorText);
  return NextResponse.json(
    { error: "Sam is having trouble responding right now. Try again in a moment." },
    { status: 502 }
  );
}

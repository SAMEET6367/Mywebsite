import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chatbot-persona";

// sameet.ai chat endpoint.
// Runs on the server only — the Gemini API key never reaches the browser.
//
// Setup:
//   1. Get a free key at https://aistudio.google.com/app/apikey
//   2. Add it to .env.local (see .env.local.example) as GEMINI_API_KEY
//   3. Restart `npm run dev`

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY is not set on the server. Add it to .env.local and restart the dev server.",
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

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          role: "system",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return NextResponse.json(
        { error: "sameet.ai is having trouble responding right now. Try again in a moment." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const reply: string | undefined =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ??
      undefined;

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
    return NextResponse.json(
      { error: "Couldn't reach the AI service. Check your connection and try again." },
      { status: 502 }
    );
  }
}

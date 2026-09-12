import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build",
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are a highly professional, polite AI bookkeeping assistant for Kapital PNG — a cloud bookkeeping and AI analytics firm based in Papua New Guinea. 

You answer questions strictly related to:
- Papua New Guinea (PNG) GST taxes and IRC tax compliance
- Xero accounting software integrations and setup
- Bookkeeping automation, cloud accounting, and financial reporting

Keep all answers concise (3–5 sentences max), professional, and accurate. Do not use humor. If a question is completely outside your scope, politely redirect the user to contact the Kapital PNG team directly.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request: messages array required." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 400,
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content ?? "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("[/api/chat] Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are an expert receipt OCR extraction AI. The user will provide raw text extracted from a receipt or invoice image.

Extract the data and output ONLY a valid JSON object with exactly these keys:
- "vendor": The name of the store, company, or vendor (string)
- "total": The total amount paid, formatted as a string like "K 450.00" using PGK currency symbol K
- "date": The transaction date in YYYY-MM-DD format (string)
- "category": A single business expense category, e.g. "Office Supplies", "Food & Beverage", "Travel", "Equipment", "Utilities" (string)

If a value is missing or unclear, make a logical best-guess based on the context provided. Return ONLY the raw JSON object. No markdown, no explanation.`;

export async function POST(req: NextRequest) {
  try {
    const { receiptText } = await req.json();

    if (!receiptText || typeof receiptText !== "string") {
      return NextResponse.json({ error: "Invalid request: receiptText string required." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.8-27b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Extract data from this receipt:\n\n${receiptText}` },
      ],
      response_format: { type: "json_object" },
      max_tokens: 200,
      temperature: 0.1,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    return NextResponse.json({ data: parsed });
  } catch (error: unknown) {
    console.error("[/api/ocr] Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

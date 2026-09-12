import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}

// GET — fetch all approved reviews
export async function GET() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, role, company, industry, quote, rating, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST — submit a new review (goes into moderation queue)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, role, company, industry, quote, rating } = body;

  if (!name || !quote || !rating) {
    return NextResponse.json(
      { error: "name, quote and rating are required." },
      { status: 400 }
    );
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
  }

  const supabase = await getSupabase();
  const { error } = await supabase.from("reviews").insert({
    name,
    role: role || null,
    company: company || null,
    industry: industry || null,
    quote,
    rating,
    approved: false, // requires admin approval before going live
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

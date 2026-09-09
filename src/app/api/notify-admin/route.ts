import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message." }, { status: 400 });
    }

    // Attempt to get the dynamic admin email from Supabase
    let adminEmail = process.env.GMAIL_USER; // Default fallback
    
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('admin_email')
        .eq('id', 1)
        .single();
        
      if (data && !error && data.admin_email) {
        adminEmail = data.admin_email;
      }
    } catch (e) {
      console.warn("Could not fetch admin settings from DB, using fallback email.", e);
    }

    await transporter.sendMail({
      from: `"Kapital PNG System" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `New Client Message on Kapital PNG Dashboard`,
      html: `
        <h2>New Message Received</h2>
        <p>A client has sent you a new message from their secure dashboard.</p>
        <br />
        <p><strong>Message Content:</strong></p>
        <p style="padding: 12px; background: #f4f4f4; border-left: 4px solid #1C8E76;">
          ${message.replace(/\n/g, "<br />")}
        </p>
        <br />
        <p>Log in to your <a href="http://localhost:3000/admin">Admin Dashboard</a> to view and reply.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[/api/notify-admin] Error:", error);
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

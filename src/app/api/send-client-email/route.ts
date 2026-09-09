import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Helps avoid local dev cert issues
  }
});

export async function POST(req: NextRequest) {
  try {
    const { toEmail, clientName, subject, message } = await req.json();

    if (!toEmail || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Kapital PNG" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #08192d; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Kapital <span style="color: #2FAEA3;">PNG</span></h1>
            <p style="color: #64748b; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">Cloud Bookkeeping & Advisory</p>
          </div>

          <div style="background-color: #ffffff; padding: 35px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Hi ${clientName || 'there'},</h2>
            
            <div style="color: #475569; font-size: 16px; line-height: 1.6; margin-top: 20px;">
              ${message.replace(/\n/g, "<br />")}
            </div>

            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-top: 30px; margin-bottom: 0;">
              Best Regards,<br/>
              <strong style="color: #08192d;">The Kapital PNG Team</strong>
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">A trading division of Das Kapital Limited</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0;">P.O. Box 414, Vision City, Waigani, Port Moresby</p>
          </div>
          
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[/api/send-client-email] Error:", error);
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

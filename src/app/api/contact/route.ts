import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // 1. Send the email to the Admin (You)
    await transporter.sendMail({
      from: `"Kapital PNG Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Lead from Kapital PNG: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    // 2. Send the confirmation auto-reply to the Visitor
    await transporter.sendMail({
      from: `"Kapital PNG" <${process.env.GMAIL_USER}>`,
      to: email, // Send to the visitor
      subject: `We've received your message! - Kapital PNG`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #08192d; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Kapital <span style="color: #2FAEA3;">PNG</span></h1>
            <p style="color: #64748b; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">Cloud Bookkeeping & Advisory</p>
          </div>

          <div style="background-color: #ffffff; padding: 35px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Hi ${name},</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              Thanks for reaching out! This is an automated note to let you know that we've securely received your message. 
            </p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
              Our expert team in Port Moresby is already reviewing your inquiry. We pride ourselves on fast communication and will be in touch with you shortly to discuss how we can elevate your financial operations.
            </p>

            <div style="background-color: #f1f5f9; border-left: 4px solid #2FAEA3; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #64748b; font-size: 13px; margin-top: 0; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">Your Message to Us:</p>
              <p style="color: #334155; font-size: 15px; margin: 0; font-style: italic;">
                "${message.replace(/\n/g, "<br />")}"
              </p>
            </div>

            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
              Talk to you soon,<br/>
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
    console.error("[/api/contact] Error:", error);
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}


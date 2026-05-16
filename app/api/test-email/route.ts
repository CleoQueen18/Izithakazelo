import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log("API Key exists?", !!process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["cleo.izithakazelo@outlook.com"],
      subject: "Test Email",
      html: "<p>This is a test email from Izithakazelo</p>",
    });

    if (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Catch error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
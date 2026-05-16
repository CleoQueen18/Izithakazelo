import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Messages appear in your terminal (where npm run dev is running)
    console.log("\n📧 NEW CONTACT MESSAGE");
    console.log("━━━━━━━━━━━━━━━━━━━━");
    console.log("Name:", name);
    console.log("User Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("━━━━━━━━━━━━━━━━━━━━\n");

    return NextResponse.json({ 
      success: true, 
      message: "Message received! We'll reply soon." 
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
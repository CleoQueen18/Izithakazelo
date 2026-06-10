import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stories = await prisma.featuredStory.findMany({
      orderBy: { displayOrder: "asc" },
      include: { clan: true },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET Featured Stories Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured stories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, summary, content, clanId, imageUrl, displayOrder, scheduledDate } = body;
    
    const story = await prisma.featuredStory.create({
      data: {
        title,
        summary,
        content,
        clanId: clanId || null,
        imageUrl: imageUrl || null,
        displayOrder: displayOrder || 0,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        isActive: true,
      },
    });
    
    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error("POST Featured Story Error:", error);
    return NextResponse.json(
      { error: "Failed to create featured story" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const story = await prisma.featuredStory.findUnique({
      where: { id: parseInt(id) },
      include: { clan: true },
    });
    
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }
    
    return NextResponse.json(story);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}
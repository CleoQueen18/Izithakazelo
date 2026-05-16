import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const story = await prisma.featuredStory.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        summary: body.summary,
        content: body.content,
        clanId: body.clanId || null,
        imageUrl: body.imageUrl || null,
        displayOrder: body.displayOrder,
        scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : null,
        isActive: body.isActive,
      },
    });
    
    return NextResponse.json(story);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.featuredStory.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
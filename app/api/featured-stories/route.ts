import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET active featured stories (with daily rotation)
export async function GET() {
  try {
    // Get today's date (without time) for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // First, check if there's a story scheduled for today
    let stories = await prisma.featuredStory.findMany({
      where: {
        isActive: true,
        scheduledDate: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        clan: true,
      },
      orderBy: { scheduledDate: "asc" },
    });
    
    // If no stories scheduled for today, use displayOrder rotation
    if (stories.length === 0) {
      // Get all active stories
      const allStories = await prisma.featuredStory.findMany({
        where: { isActive: true },
        include: { clan: true },
        orderBy: { displayOrder: "asc" },
      });
      
      if (allStories.length > 0) {
        // Use day of month to rotate through stories
        const dayOfMonth = today.getDate();
        const storyIndex = (dayOfMonth - 1) % allStories.length;
        stories = [allStories[storyIndex]];
      }
    }
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET Featured Stories Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured stories" },
      { status: 500 }
    );
  }
}

// POST create a new featured story
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
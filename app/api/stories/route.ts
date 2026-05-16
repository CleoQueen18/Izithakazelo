import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stories = await prisma.featuredStory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        clan: true,
      },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET Stories Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
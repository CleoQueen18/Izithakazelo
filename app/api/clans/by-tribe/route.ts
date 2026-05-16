import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tribe = searchParams.get('tribe');
  
  try {
    if (tribe) {
      // Get specific tribe with all its clans and surnames
      const clans = await prisma.clan.findMany({
        where: { tribe: tribe },
        include: {
          surnames: true,
        },
      });
      return NextResponse.json(clans);
    } else {
      // Get all tribes with their clans
      const allClans = await prisma.clan.findMany({
        include: {
          surnames: true,
        },
      });
      return NextResponse.json(allClans);
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clans" },
      { status: 500 }
    );
  }
}
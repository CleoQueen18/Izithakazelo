import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { tribeName: string } }
) {
  try {
    const { tribeName } = await params;
    
    // Find all clans in this tribe
    const clans = await prisma.clan.findMany({
      where: {
        tribe: {
          mode: 'insensitive',
          equals: tribeName,
        },
      },
      include: {
        surnames: {
          include: {
            surname: true,
          },
        },
      },
    });
    
    if (clans.length === 0) {
      return NextResponse.json(
        { error: `No clans found for tribe: ${tribeName}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      tribe: tribeName,
      clans: clans,
      totalClans: clans.length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tribe data" },
      { status: 500 }
    );
  }
}
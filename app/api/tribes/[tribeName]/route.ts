import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tribeName: string }> }
) {
  try {
    const { tribeName } = await params;
    
    const clans = await prisma.clan.findMany({
      where: {
        tribe: {
          equals: tribeName,
          mode: 'insensitive',
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
    
    return NextResponse.json({
      tribe: tribeName,
      clans,
      count: clans.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch tribes" }, { status: 500 });
  }
}
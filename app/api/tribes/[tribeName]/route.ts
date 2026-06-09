import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tribeName: string }> }
) {
  try {
    const { tribeName } = await params;
    
    // Capitalize first letter to match database format
    const formattedTribeName = tribeName.charAt(0).toUpperCase() + tribeName.slice(1).toLowerCase();
    
    const clans = await prisma.clan.findMany({
      where: {
        tribe: formattedTribeName,
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
    
    return NextResponse.json(clans);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tribe data" },
      { status: 500 }
    );
  }
}

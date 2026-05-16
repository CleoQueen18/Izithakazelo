import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tribeName: string }> }
) {
  try {
    // Await the params Promise
    const { tribeName } = await params;
    
    // Capitalize first letter (zulu -> Zulu)
    const formattedName = tribeName.charAt(0).toUpperCase() + tribeName.slice(1).toLowerCase();
    
    const clans = await prisma.clan.findMany({
      where: {
        tribe: formattedName,
      },
      include: {
        surnames: {
          include: {
            surname: true,
          },
        },
      },
    });
    
    return NextResponse.json(clans);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
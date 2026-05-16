import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surnameName: string }> }
) {
  try {
    const { surnameName } = await params;
    
    const surname = await prisma.surname.findFirst({
      where: {
        name: {
          equals: surnameName,
          mode: 'insensitive',
        },
      },
      include: {
        clans: {
          include: {
            clan: true,
          },
        },
      },
    });
    
    if (!surname) {
      return NextResponse.json({ error: "Surname not found" }, { status: 404 });
    }
    
    return NextResponse.json(surname);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch surname" }, { status: 500 });
  }
}
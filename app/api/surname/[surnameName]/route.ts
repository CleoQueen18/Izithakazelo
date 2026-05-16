import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ surnameName: string }> }
) {
  try {
    const { surnameName } = await params;
    
    // Find the surname
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
      return NextResponse.json(
        { error: `Surname "${surnameName}" not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(surname);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch surname data" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all clans with their surnames
export async function GET() {
  try {
    const clans = await prisma.clan.findMany({
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
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clans" },
      { status: 500 }
    );
  }
}

// POST: Add a new clan-surname relationship
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { surname: surnameName, clanName, clan_praise, origin, language } = body;
    
    // Find or create the surname
    let surname = await prisma.surname.findFirst({
      where: { name: surnameName },
    });
    
    if (!surname) {
      surname = await prisma.surname.create({
        data: {
          name: surnameName,
          origin: origin || null,
          language: language || null,
        },
      });
    }
    
    // Find the clan
    const clan = await prisma.clan.findFirst({
      where: { name: clanName },
    });
    
    if (!clan) {
      return NextResponse.json(
        { error: `Clan "${clanName}" not found` },
        { status: 404 }
      );
    }
    
    // Create the relationship - using 'clanSurname' (lowercase c, capital S)
    const clanSurname = await prisma.clanSurname.create({
      data: {
        clanId: clan.id,
        surnameId: surname.id,
        clan_praise: clan_praise,
      },
    });
    
    return NextResponse.json(clanSurname, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create relationship" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a clan-surname relationship
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    
    await prisma.clanSurname.delete({
      where: { id: id },
    });
    
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}
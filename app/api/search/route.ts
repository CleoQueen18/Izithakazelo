import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    
    if (!query.trim()) {
      return NextResponse.json({ results: [] });
    }
    
    const searchTerm = query.toLowerCase();
    
    // Search in clans
    const clans = await prisma.clan.findMany({
      where: {
        OR: [
          { name: { mode: 'insensitive', contains: searchTerm } },
          { tribe: { mode: 'insensitive', contains: searchTerm } },
          { description: { mode: 'insensitive', contains: searchTerm } },
        ],
      },
      include: {
        surnames: {
          include: {
            surname: true,
          },
        },
      },
    });
    
    // Search in surnames
    const surnames = await prisma.surname.findMany({
      where: {
        OR: [
          { name: { mode: 'insensitive', contains: searchTerm } },
          { origin: { mode: 'insensitive', contains: searchTerm } },
          { language: { mode: 'insensitive', contains: searchTerm } },
        ],
      },
      include: {
        clans: {
          include: {
            clan: true,
          },
        },
      },
    });
    
    // Search in clan praises (via ClanSurname)
    const praises = await prisma.clanSurname.findMany({
      where: {
        clan_praise: { mode: 'insensitive', contains: searchTerm },
      },
      include: {
        clan: true,
        surname: true,
      },
    });
    
    return NextResponse.json({
      query: query,
      clans: clans,
      surnames: surnames,
      praises: praises,
      totalCount: clans.length + surnames.length + praises.length,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Failed to search" },
      { status: 500 }
    );
  }
}
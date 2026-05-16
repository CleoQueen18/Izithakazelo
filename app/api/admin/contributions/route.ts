import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all contributions (for admin)
export async function GET() {
  try {
    const contributions = await prisma.contribution.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contributions);
  } catch (error) {
    console.error("Admin GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

// PATCH: Approve or reject a contribution
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;
    
    const contribution = await prisma.contribution.update({
      where: { id },
      data: {
        status: status, // "APPROVED" or "REJECTED"
        adminNotes: adminNotes || null,
      },
    });
    
    // If approved, process the contribution data
    if (status === "APPROVED") {
      const data = JSON.parse(contribution.data);
      
      if (contribution.type === "NEW_SURNAME") {
        // Check if surname already exists
        const existing = await prisma.surname.findFirst({
          where: { name: data.surname },
        });
        
        if (!existing) {
          await prisma.surname.create({
            data: {
              name: data.surname,
              origin: data.origin || null,
              language: data.language || null,
            },
          });
        }
      } 
      else if (contribution.type === "NEW_PRAISE") {
        // Find or create surname
        let surname = await prisma.surname.findFirst({
          where: { name: data.surname },
        });
        
        if (!surname) {
          surname = await prisma.surname.create({
            data: {
              name: data.surname,
              origin: data.origin || null,
              language: data.language || null,
            },
          });
        }
        
        // Find the clan
        const clan = await prisma.clan.findFirst({
          where: { name: data.clanName },
        });
        
        if (clan) {
          // Check if relationship already exists
          const existing = await prisma.clanSurname.findFirst({
            where: {
              clanId: clan.id,
              surnameId: surname.id,
            },
          });
          
          if (!existing) {
            await prisma.clanSurname.create({
              data: {
                clanId: clan.id,
                surnameId: surname.id,
                clan_praise: data.clan_praise,
              },
            });
          }
        }
      }
    }
    
    return NextResponse.json(contribution);
  } catch (error) {
    console.error("Admin PATCH Error:", error);
    return NextResponse.json(
      { error: "Failed to update contribution" },
      { status: 500 }
    );
  }
}

// DELETE a contribution
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    
    await prisma.contribution.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Contribution deleted" });
  } catch (error) {
    console.error("Admin DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete contribution" },
      { status: 500 }
    );
  }
}
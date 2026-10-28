import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      contributionId,
      clanId,
      surnameId,
      praise,
      source,
      contributorName,
      adminNotes,
    } = body;

    if (!clanId || !surnameId || !praise) {
      return NextResponse.json(
        { error: "Missing clanId, surnameId, or praise" },
        { status: 400 }
      );
    }

    const existing = await prisma.clanSurname.findFirst({
      where: {
        clanId,
        surnameId,
      },
    });

    if (existing) {
      await prisma.clanSurname.update({
        where: { id: existing.id },
        data: {
          clan_praise: praise,
          sourceTitle: source || "Community contribution",
          sourceUrl: null,
          verificationStatus: "COMMUNITY_CONTRIBUTED",
          isRebuilding: false,
        },
      });
    } else {
      await prisma.clanSurname.create({
        data: {
          clanId,
          surnameId,
          clan_praise: praise,
          sourceTitle: source || "Community contribution",
          verificationStatus: "COMMUNITY_CONTRIBUTED",
          isRebuilding: false,
        },
      });
    }

    if (contributionId) {
      await prisma.contribution.update({
        where: { id: contributionId },
        data: {
          status: "APPROVED",
          adminNotes:
            adminNotes || `Approved — contributed by ${contributorName}`,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Approve praise error:", error);
    return NextResponse.json(
      { error: "Failed to approve praise" },
      { status: 500 }
    );
  }
}
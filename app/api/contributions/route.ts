import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all pending contributions
export async function GET() {
  try {
    const contributions = await prisma.contribution.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contributions);
  } catch (error) {
    console.error("GET Contributions Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

// Submit a new contribution
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data, contributorName, contributorEmail } = body;
    
    const contribution = await prisma.contribution.create({
      data: {
        type, // "NEW_SURNAME", "NEW_PRAISE", "CORRECTION"
        data: JSON.stringify(data),
        contributorName: contributorName || "Anonymous",
        contributorEmail: contributorEmail || null,
        status: "PENDING",
      },
    });
    
    return NextResponse.json(contribution, { status: 201 });
  } catch (error) {
    console.error("POST Contribution Error:", error);
    return NextResponse.json(
      { error: "Failed to submit contribution" },
      { status: 500 }
    );
  }
}
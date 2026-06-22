import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to check if request is from admin
function isAdmin(request: NextRequest): boolean {
  // Check for admin cookie
  const adminToken = request.cookies.get("admin_token")?.value;
  return adminToken === process.env.ADMIN_SECRET;
}

// GET all contributions
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contributions = await prisma.contribution.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contributions);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
  }
}

// PATCH update contribution status
export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    const contribution = await prisma.contribution.update({
      where: { id },
      data: { status, adminNotes },
    });

    return NextResponse.json({ success: true, contribution });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE contribution
export async function DELETE(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.contribution.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

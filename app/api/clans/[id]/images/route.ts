import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const prisma = new PrismaClient();

// GET all images for a clan
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const images = await prisma.clanImage.findMany({
      where: { clanId: parseInt(params.id) },
      orderBy: { isPrimary: "desc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error("GET images error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// POST upload a new image for a clan
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const altText = formData.get("altText") as string;
    
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." }, { status: 400 });
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/clans");
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Save file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const imageUrl = `/uploads/clans/${filename}`;
    
    // Check if this is the first image for this clan
    const existingImages = await prisma.clanImage.count({
      where: { clanId: parseInt(params.id) },
    });
    
    // Create image record in database
    const clanImage = await prisma.clanImage.create({
      data: {
        clanId: parseInt(params.id),
        imageUrl,
        altText: altText || null,
        isPrimary: existingImages === 0, // First image becomes primary
      },
    });
    
    return NextResponse.json({ success: true, image: clanImage });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

// DELETE an image
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");
    
    if (!imageId) {
      return NextResponse.json({ error: "Image ID required" }, { status: 400 });
    }
    
    // Get image info first to delete file
    const image = await prisma.clanImage.findUnique({
      where: { id: parseInt(imageId) },
    });
    
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    
    // Delete the file from disk
    const filepath = path.join(process.cwd(), "public", image.imageUrl);
    if (existsSync(filepath)) {
      await unlink(filepath);
    }
    
    // Delete from database
    await prisma.clanImage.delete({
      where: { id: parseInt(imageId) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}

// Helper function to unlink file (add at top with other imports)
// Add this import: import { unlink } from "fs/promises";
import { unlink } from "fs/promises";
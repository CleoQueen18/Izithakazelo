import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { clanId, clanName, platform, userAgent, referrer } = await request.json();
    
    const analytics = await prisma.shareAnalytics.create({
      data: {
        clanId,
        clanName,
        platform,
        userAgent: userAgent || null,
        referrer: referrer || null,
      },
    });
    
    return NextResponse.json({ success: true, analytics });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to track share" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "week"; // day, week, month, all
    
    let dateFilter = {};
    const now = new Date();
    
    if (period === "day") {
      dateFilter = { sharedAt: { gte: new Date(now.setHours(0, 0, 0, 0)) } };
    } else if (period === "week") {
      dateFilter = { sharedAt: { gte: new Date(now.setDate(now.getDate() - 7)) } };
    } else if (period === "month") {
      dateFilter = { sharedAt: { gte: new Date(now.setMonth(now.getMonth() - 1)) } };
    }
    
    const stats = await prisma.shareAnalytics.groupBy({
      by: ["platform"],
      where: dateFilter,
      _count: { platform: true },
    });
    
    const total = await prisma.shareAnalytics.count({ where: dateFilter });
    const topClans = await prisma.shareAnalytics.groupBy({
      by: ["clanName"],
      where: dateFilter,
      _count: { clanName: true },
      orderBy: { _count: { clanName: "desc" } },
      take: 5,
    });
    
    return NextResponse.json({ stats, total, topClans });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
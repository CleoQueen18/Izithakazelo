import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://izithakazelo.co.za";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/clans`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tribes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/stories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contribute`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Try dynamic pages, fall back to static if database fails
  let clanPages: MetadataRoute.Sitemap = [];
  let surnamePages: MetadataRoute.Sitemap = [];
  let storyPages: MetadataRoute.Sitemap = [];

  try {
    const clans = await prisma.clan.findMany({
      select: { name: true },
    });

    clanPages = clans.map((clan) => ({
      url: `${baseUrl}/clans/${clan.name.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const surnames = await prisma.surname.findMany({
      select: { name: true },
    });

    surnamePages = surnames.map((surname) => ({
      url: `${baseUrl}/surname/${encodeURIComponent(surname.name)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const stories = await prisma.featuredStory.findMany({
      select: { id: true },
    });

    storyPages = stories.map((story) => ({
      url: `${baseUrl}/stories/${story.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: database unavailable, using static pages only", error);
  }

  // Dynamic tribe pages (no database needed)
  const tribes = ["Zulu", "Xhosa", "Swati", "Ndebele", "Sotho", "Tswana", "Venda", "Tsonga", "Pedi"];

  const tribePages: MetadataRoute.Sitemap = tribes.map((tribe) => ({
    url: `${baseUrl}/tribe/${tribe.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...clanPages,
    ...surnamePages,
    ...tribePages,
    ...storyPages,
  ];
}
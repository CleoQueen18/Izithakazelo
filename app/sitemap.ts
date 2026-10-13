import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

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

  // Dynamic clan pages
  const clans = await prisma.clan.findMany({
    select: { name: true },
  });

  const clanPages: MetadataRoute.Sitemap = clans.map((clan) => ({
    url: `${baseUrl}/clans/${clan.name.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic surname pages
  const surnames = await prisma.surname.findMany({
    select: { name: true },
  });

  const surnamePages: MetadataRoute.Sitemap = surnames.map((surname) => ({
    url: `${baseUrl}/surname/${encodeURIComponent(surname.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic tribe pages
  const tribes = ["Zulu", "Xhosa", "Swati", "Ndebele", "Sotho", "Tswana", "Venda", "Tsonga", "Pedi"];

  const tribePages: MetadataRoute.Sitemap = tribes.map((tribe) => ({
    url: `${baseUrl}/tribe/${tribe.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic story pages
  const stories = await prisma.story.findMany({
    select: { id: true },
  });

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...clanPages,
    ...surnamePages,
    ...tribePages,
    ...storyPages,
  ];
}
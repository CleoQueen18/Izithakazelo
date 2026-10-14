import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ surnameName: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surnameName } = await params;
  const decodedName = decodeURIComponent(surnameName);

  try {
    const surname = await prisma.surname.findFirst({
      where: {
        name: {
          equals: decodedName,
          mode: "insensitive",
        },
      },
      include: {
        clans: {
          include: {
            clan: true,
          },
        },
      },
    });

    if (!surname) {
      return {
        title: `${decodedName} - Izithakazelo`,
        description: `Discover the ${decodedName} surname on Izithakazelo, the African heritage platform preserving clan names and praises.`,
      };
    }

    const clanCount = surname.clans.length;
    const clanNames = surname.clans
      .slice(0, 3)
      .map((c) => c.clan.name)
      .join(", ");

    const title = `${decodedName} Izithakazelo & Clan Names - Izithakazelo`;

    const description = clanCount > 0
      ? `Discover the ${decodedName} surname and its connections to ${clanCount} ${clanCount === 1 ? "clan" : "clans"} including ${clanNames}. Explore izithakazelo, praises and heritage.`
      : `Discover the ${decodedName} surname, its origins, and izithakazelo. Preserving African clan names and heritage for future generations.`;

    const ogImage = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png";
    const url = `https://izithakazelo.co.za/surname/${encodeURIComponent(decodedName)}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Izithakazelo",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${decodedName} - Izithakazelo`,
          },
        ],
        locale: "en_ZA",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: `${decodedName} - Izithakazelo`,
      description: `Discover the ${decodedName} surname on Izithakazelo.`,
    };
  }
}

export default function SurnameLayout({ children }: Props) {
  return <>{children}</>;
}
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://izithakazelo.co.za";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/secret-admin-xyz123",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
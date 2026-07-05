import type { MetadataRoute } from "next";
import { getPublicacoes } from "@/lib/publicacoes";

const SITE_URL = "https://www.ortodoxabahia.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/publicacoes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getPublicacoes().map((publicacao) => ({
      url: `${SITE_URL}/publicacoes/${publicacao.slug}`,
      lastModified: new Date(`${publicacao.updated}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

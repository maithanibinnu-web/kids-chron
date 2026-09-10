import type { MetadataRoute } from "next";
import {
  articles,
  categories,
  competitions,
  editions,
  quizzes,
  site,
} from "@/content";

export const dynamic = "force-static";

/** Generated from the content layer, so a new article is in the
 *  sitemap the moment it is published — nothing to remember. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPaths: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/subscribe", 0.95, "monthly"],
    ["/explore", 0.9, "weekly"],
    ["/play", 0.8, "weekly"],
    ["/play/quizzes", 0.75, "weekly"],
    ["/play/puzzles", 0.75, "weekly"],
    ["/create", 0.75, "monthly"],
    ["/create/submit", 0.7, "monthly"],
    ["/reader-corner", 0.7, "weekly"],
    ["/competitions", 0.8, "weekly"],
    ["/editions", 0.8, "monthly"],
    ["/parents", 0.85, "monthly"],
    ["/schools", 0.85, "monthly"],
    ["/about", 0.7, "yearly"],
    ["/why-kidschron", 0.8, "yearly"],
    ["/whats-inside", 0.8, "monthly"],
    ["/resources", 0.5, "monthly"],
    ["/contact", 0.7, "yearly"],
    ["/faq", 0.7, "monthly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ];

  return [
    ...staticPaths.map(([url, priority, changeFrequency]) => ({
      url: `${base}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...categories.map((c) => ({
      url: `${base}/explore/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${base}/article/${a.slug}`,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...quizzes.map((q) => ({
      url: `${base}/play/quizzes/${q.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...competitions.map((c) => ({
      url: `${base}/competitions/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...editions.map((e) => ({
      url: `${base}/editions/${e.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

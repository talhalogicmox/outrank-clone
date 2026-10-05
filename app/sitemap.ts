import type { MetadataRoute } from "next";
import {
  getAllPostSlugs,
  getAllCategories,
  getAllTags,
  getAllAuthors,
  getAllPages,
} from "@/lib/queries";
import { getBaseUrl } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl();

  const [posts, categories, tags, authors, pages] = await Promise.all([
    getAllPostSlugs(),
    getAllCategories(),
    getAllTags(),
    getAllAuthors(),
    getAllPages(),
  ]);

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic CMS Pages (excluding reserved core routes already in coreRoutes)
  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((page) => !["about", "contact"].includes(page.slug))
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "monthly",
      priority: 0.4,
    }));

  // Dynamic Posts
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Categories
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic Tags
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Dynamic Authors
  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: author.createdAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...coreRoutes,
    ...pageRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...authorRoutes,
  ];
}

import { prisma } from "./prisma";

export const POSTS_PER_PAGE = 6;

// ── Posts ─────────────────────────────────────────────────────────────────

export async function getFeaturedPosts(limit = 3) {
  return prisma.post.findMany({
    where: { published: true, featured: true },
    take: limit,
    orderBy: { publishedAt: "desc" },
    include: {
      author: true,
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });
}

export async function getRecentPosts(limit = 6) {
  return prisma.post.findMany({
    where: { published: true },
    take: limit,
    orderBy: { publishedAt: "desc" },
    include: {
      author: true,
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });
}

export async function getPaginatedPosts(page: number) {
  const skip = (page - 1) * POSTS_PER_PAGE;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      skip,
      take: POSTS_PER_PAGE,
      orderBy: { publishedAt: "desc" },
      include: {
        author: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({ where: { published: true } }),
  ]);
  return { posts, total, totalPages: Math.ceil(total / POSTS_PER_PAGE) };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });
}

export async function getAllPostSlugs() {
  return prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
}

// ── Categories ────────────────────────────────────────────────────────────

export async function getAllCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getPaginatedPostsByCategory(categorySlug: string, page: number) {
  const skip = (page - 1) * POSTS_PER_PAGE;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        published: true,
        categories: { some: { category: { slug: categorySlug } } },
      },
      skip,
      take: POSTS_PER_PAGE,
      orderBy: { publishedAt: "desc" },
      include: {
        author: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({
      where: {
        published: true,
        categories: { some: { category: { slug: categorySlug } } },
      },
    }),
  ]);
  return { posts, total, totalPages: Math.ceil(total / POSTS_PER_PAGE) };
}

// ── Tags ──────────────────────────────────────────────────────────────────

export async function getAllTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export async function getTagBySlug(slug: string) {
  return prisma.tag.findUnique({ where: { slug } });
}

export async function getPostsByTag(tagSlug: string) {
  return prisma.post.findMany({
    where: {
      published: true,
      tags: { some: { tag: { slug: tagSlug } } },
    },
    orderBy: { publishedAt: "desc" },
    include: {
      author: true,
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });
}

// ── Authors ───────────────────────────────────────────────────────────────

export async function getAuthorById(id: number) {
  return prisma.author.findUnique({ where: { id } });
}

export async function getAuthorByIdOrSlug(idOrSlug: string | number) {
  const numericId = typeof idOrSlug === "number" ? idOrSlug : parseInt(idOrSlug, 10);
  if (!isNaN(numericId)) {
    const author = await prisma.author.findFirst({
      where: {
        OR: [{ id: numericId }, { slug: String(idOrSlug) }],
      },
    });
    if (author) return author;
  }
  return prisma.author.findUnique({
    where: { slug: String(idOrSlug) },
  });
}

export async function getAllAuthors() {
  return prisma.author.findMany({ orderBy: { name: "asc" } });
}

export async function getPaginatedPostsByAuthor(authorId: number, page: number) {
  const skip = (page - 1) * POSTS_PER_PAGE;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, authorId },
      skip,
      take: POSTS_PER_PAGE,
      orderBy: { publishedAt: "desc" },
      include: {
        author: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.post.count({ where: { published: true, authorId } }),
  ]);
  return { posts, total, totalPages: Math.ceil(total / POSTS_PER_PAGE) };
}

// ── Pages ─────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export async function getAllPages() {
  return prisma.page.findMany({ orderBy: { publishedAt: "desc" } });
}

// ── Search ────────────────────────────────────────────────────────────────

export async function searchPosts(query: string) {
  if (!query.trim()) return [];
  return prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query } },
        { excerpt: { contains: query } },
        { content: { contains: query } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    include: {
      author: true,
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });
}

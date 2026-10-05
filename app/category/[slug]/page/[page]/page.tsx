import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPaginatedPostsByCategory } from "@/lib/queries";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface Props {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.name} | Page ${page}`,
    description: `Browse ${category.name} articles, page ${page}.`,
  };
}

export default async function CategoryPaginatedPage({ params }: Props) {
  const { slug, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);

  if (isNaN(page) || page < 2) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { posts, totalPages } = await getPaginatedPostsByCategory(slug, page);
  if (page > totalPages) notFound();

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">{category.name}</h1>
          <p className="taxonomy-count">Page {page} of {totalPages}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/category/${slug}/page`}
          />
        </div>
      </section>
    </>
  );
}

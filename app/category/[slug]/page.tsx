import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPaginatedPostsByCategory } from "@/lib/queries";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.name} Articles`,
    description: category.description ?? `Browse all articles in the ${category.name} category.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { posts, totalPages } = await getPaginatedPostsByCategory(slug, 1);

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">{category.name}</h1>
          {category.description && (
            <p className="taxonomy-desc">{category.description}</p>
          )}
          <p className="taxonomy-count">{posts.length === 0 ? "No articles yet" : `${totalPages > 1 ? "Page 1 of " + totalPages : ""}`}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📂</div>
              <p className="empty-state-title">No articles in this category yet</p>
              <p>New content is coming soon. Stay tuned!</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          <Pagination
            currentPage={1}
            totalPages={totalPages}
            basePath={`/category/${slug}/page`}
          />
        </div>
      </section>
    </>
  );
}

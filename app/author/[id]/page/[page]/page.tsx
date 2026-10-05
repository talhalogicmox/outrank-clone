import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthorByIdOrSlug, getPaginatedPostsByAuthor } from "@/lib/queries";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface Props {
  params: Promise<{ id: string; page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, page } = await params;
  const author = await getAuthorByIdOrSlug(id);
  if (!author) return { title: "Author not found" };
  return {
    title: `${author.name} | Page ${page}`,
    description: `Articles by ${author.name}, page ${page}.`,
  };
}

export default async function AuthorPaginatedPage({ params }: Props) {
  const { id, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);

  if (isNaN(page) || page < 2) notFound();

  const author = await getAuthorByIdOrSlug(id);
  if (!author) notFound();

  const { posts, totalPages } = await getPaginatedPostsByAuthor(author.id, page);
  if (page > totalPages) notFound();

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">Articles by {author.name}</h1>
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
            basePath={`/author/${id}/page`}
          />
        </div>
      </section>
    </>
  );
}

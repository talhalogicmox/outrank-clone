import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inbox } from "lucide-react";
import { getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/queries";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog | Page ${page}`,
    description: `Browse articles, page ${page}`,
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);

  if (isNaN(page) || page < 2) notFound();

  const { posts, totalPages } = await getPaginatedPosts(page);

  if (page > totalPages) notFound();

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">All Articles</h1>
          <p className="taxonomy-count">Page {page} of {totalPages}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Inbox size={40} style={{ opacity: 0.6 }} />
              </div>
              <p className="empty-state-title">No articles on this page</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          <Pagination currentPage={page} totalPages={totalPages} basePath="/blog/page" />
        </div>
      </section>
    </>
  );
}

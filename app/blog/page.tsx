import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inbox } from "lucide-react";
import { getPaginatedPosts } from "@/lib/queries";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Blog",
  description: "All articles published on DevPulse. Browse by newest first.",
  alternates: {
    canonical: "/blog",
    languages: {
      "en-US": "/blog",
    },
  },
  openGraph: {
    title: "Blog | DevPulse",
    description: "All articles published on DevPulse. Browse by newest first.",
    url: "/blog",
  },
};

export default async function BlogIndexPage() {
  const { posts, totalPages } = await getPaginatedPosts(1);

  if (!posts.length) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <Inbox size={40} style={{ opacity: 0.6 }} />
          </div>
          <p className="empty-state-title">No articles yet</p>
          <p>Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">All Articles</h1>
          <p className="taxonomy-desc">Explore our full library of in-depth technical content.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={totalPages} basePath="/blog/page" />
        </div>
      </section>
    </>
  );
}

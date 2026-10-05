import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag } from "lucide-react";
import { getTagBySlug, getPostsByTag } from "@/lib/queries";
import PostCard from "@/components/PostCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return { title: "Tag not found" };
  return {
    title: `#${tag.name} Articles`,
    description: `All articles tagged with #${tag.name} on DevPulse.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const posts = await getPostsByTag(slug);

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">#{tag.name}</h1>
          <p className="taxonomy-desc">All articles tagged with this topic.</p>
          <p className="taxonomy-count">{posts.length} article{posts.length !== 1 ? "s" : ""}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Tag size={40} style={{ opacity: 0.6 }} />
              </div>
              <p className="empty-state-title">No articles with this tag yet</p>
              <p>New content is on its way. Check back soon!</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

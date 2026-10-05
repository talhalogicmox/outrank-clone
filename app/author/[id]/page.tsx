import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ExternalLink, Mail } from "lucide-react";
import { getAuthorByIdOrSlug, getPaginatedPostsByAuthor } from "@/lib/queries";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthorByIdOrSlug(id);
  if (!author) return { title: "Author not found" };
  return {
    title: `${author.name} | Author`,
    description: author.bio ?? `Articles by ${author.name} on DevPulse.`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;
  const author = await getAuthorByIdOrSlug(id);
  if (!author) notFound();

  const { posts, total, totalPages } = await getPaginatedPostsByAuthor(author.id, 1);

  return (
    <>
      {/* Author Hero */}
      <section className="author-hero">
        <div className="container">
          <div className="author-hero-inner">
            {author.avatarUrl && (
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="author-hero-avatar"
              />
            )}
            <div>
              <h1 className="author-hero-name">{author.name}</h1>
              {author.bio && <p className="author-hero-bio">{author.bio}</p>}
              <div className="author-box-links" style={{ marginTop: "1rem", display: "flex", gap: "12px", alignItems: "center" }}>
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    Website <ExternalLink size={14} />
                  </a>
                )}
                {author.email && (
                  <a href={`mailto:${author.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Mail size={14} /> Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span aria-hidden="true" />
              Articles by {author.name}
            </h2>
            <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
              {total} article{total !== 1 ? "s" : ""}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FileText size={40} style={{ opacity: 0.6 }} />
              </div>
              <p className="empty-state-title">No articles published yet</p>
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
            basePath={`/author/${id}/page`}
          />
        </div>
      </section>
    </>
  );
}

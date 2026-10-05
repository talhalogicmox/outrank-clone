import type { Metadata } from "next";
import Link from "next/link";
import { Search, SearchX } from "lucide-react";
import { searchPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Search",
  description: "Search DevPulse articles by title, excerpt, or content.",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await searchPosts(query) : [];

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">Search Articles</h1>
          {query && (
            <p className="taxonomy-count">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </section>

      <section className="search-section">
        <div className="container-narrow">
          <form action="/search" method="GET" role="search" className="search-form">
            <label htmlFor="search-input" className="sr-only">Search articles</label>
            <input
              id="search-input"
              name="q"
              type="search"
              className="search-input"
              placeholder="Search articles…"
              defaultValue={query}
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Search size={16} /> Search
            </button>
          </form>

          {!query && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Search size={40} style={{ opacity: 0.6 }} />
              </div>
              <p className="empty-state-title">Type something to search</p>
              <p>Try keywords like &ldquo;TypeScript&rdquo;, &ldquo;Docker&rdquo;, or &ldquo;Next.js&rdquo;.</p>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <SearchX size={40} style={{ opacity: 0.6 }} />
              </div>
              <p className="empty-state-title">No results found</p>
              <p>Try a different keyword or <Link href="/blog" style={{ color: "var(--color-accent)" }}>browse all articles</Link>.</p>
            </div>
          )}

          {results.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {results.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-6)",
                  }}
                >
                  <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-2)", flexWrap: "wrap" }}>
                    {post.categories.slice(0, 2).map(({ category }) => (
                      <Link key={category.slug} href={`/category/${category.slug}`} className="badge badge-category">
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginBottom: "var(--space-3)" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                    By{" "}
                    <Link href={`/author/${post.author.id}`} style={{ color: "var(--color-accent)" }}>
                      {post.author.name}
                    </Link>
                    {" · "}
                    <time dateTime={post.publishedAt.toISOString()}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

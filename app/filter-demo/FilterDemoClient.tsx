"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import PostCard from "@/components/PostCard";

// Props are serialized from the server
interface PostSummary {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: Date;
  coverImage?: string | null;
  author: { name: string; slug: string };
  categories: { category: { name: string; slug: string } }[];
  tags: { tag: { name: string; slug: string } }[];
}

interface FilterDemoClientProps {
  posts: PostSummary[];
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
}

export default function FilterDemoClient({ posts, categories, tags }: FilterDemoClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = !activeCategory || post.categories.some((c) => c.category.slug === activeCategory);
      const matchTag = !activeTag || post.tags.some((t) => t.tag.slug === activeTag);
      return matchCat && matchTag;
    });
  }, [posts, activeCategory, activeTag]);

  function resetFilters() {
    setActiveCategory(null);
    setActiveTag(null);
  }

  return (
    <>
      <section className="filter-section">
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: "var(--space-3)" }}>
              Filter by Category
            </h2>
            <div className="filter-bar">
              <button
                className={`filter-chip${!activeCategory ? " active" : ""}`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  className={`filter-chip${activeCategory === cat.slug ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat.slug === activeCategory ? null : cat.slug)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "var(--space-8)" }}>
            <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: "var(--space-3)" }}>
              Filter by Tag
            </h2>
            <div className="filter-bar">
              <button
                className={`filter-chip${!activeTag ? " active" : ""}`}
                onClick={() => setActiveTag(null)}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.slug}
                  className={`filter-chip${activeTag === tag.slug ? " active" : ""}`}
                  onClick={() => setActiveTag(tag.slug === activeTag ? null : tag.slug)}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>

          {(activeCategory || activeTag) && (
            <div style={{ marginBottom: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                Showing {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={resetFilters}
                style={{ fontSize: "var(--text-sm)", color: "var(--color-accent)", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <RotateCcw size={13} /> Clear filters
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <SlidersHorizontal size={40} style={{ opacity: 0.6 }} />
              </div>
              <p className="empty-state-title">No articles match these filters</p>
              <p>Try selecting different categories or tags.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

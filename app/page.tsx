import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, ArrowRight, Rss } from "lucide-react";
import { getFeaturedPosts, getRecentPosts, getAllCategories } from "@/lib/queries";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "DevPulse | Modern Dev Articles",
  description:
    "In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: "DevPulse | Modern Dev Articles",
    description:
      "In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.",
    url: "/",
    siteName: "DevPulse",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DevPulse | Modern Dev Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devpulse",
    creator: "@devpulse",
    title: "DevPulse | Modern Dev Articles",
    description:
      "In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.",
    images: ["/opengraph-image"],
  },
};

export default async function HomePage() {
  const [featured, recent, categories] = await Promise.all([
    getFeaturedPosts(1),
    getRecentPosts(6),
    getAllCategories(),
  ]);

  const hero = featured[0];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <span className="hero-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} /> For developers who ship
          </span>
          <h1 id="hero-heading" className="hero-title">
            Stay Sharp.<br />
            <span className="gradient">Build Better.</span>
          </h1>
          <p className="hero-desc">
            Deep-dive articles on Next.js, TypeScript, DevOps, Design Systems, and AI, published weekly by engineers in the trenches.
          </p>
          <div className="hero-actions">
            <Link href="/blog" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Browse All Articles <ArrowRight size={16} />
            </Link>
            <Link href="/feed.xml" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Rss size={16} /> Subscribe via RSS
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Post ──────────────────────────────────── */}
      {hero && (
        <section className="section" aria-labelledby="featured-heading">
          <div className="container">
            <div className="section-header">
              <h2 id="featured-heading" className="section-title">
                <span aria-hidden="true" />
                Featured Article
              </h2>
            </div>
            <article className="featured-post">
              {hero.coverImage && (
                <img
                  src={hero.coverImage}
                  alt={hero.title}
                  className="featured-post-image"
                />
              )}
              <div className="featured-post-body">
                <span className="featured-badge">
                  <Sparkles size={12} /> Featured
                </span>
                <h3 className="featured-post-title">
                  <Link href={`/blog/${hero.slug}`}>{hero.title}</Link>
                </h3>
                <p className="featured-post-excerpt">{hero.excerpt}</p>
                <div className="featured-post-meta">
                  <Link href={`/author/${hero.author.slug}`} className="author-link">
                    {hero.author.name}
                  </Link>
                  <span>·</span>
                  <time dateTime={new Date(hero.publishedAt).toISOString()}>
                    {new Date(hero.publishedAt).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── Categories ─────────────────────────────────────── */}
      <section className="section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="categories-heading" className="section-title">
              <span aria-hidden="true" />
              Browse by Topic
            </h2>
          </div>
          <nav aria-label="Article categories" className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="category-card">
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Recent Posts ───────────────────────────────────── */}
      <section className="section" aria-labelledby="recent-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="recent-heading" className="section-title">
              <span aria-hidden="true" />
              Recent Articles
            </h2>
            <Link href="/blog" className="section-link" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="posts-grid">
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

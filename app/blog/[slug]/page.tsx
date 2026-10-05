import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
import { getPostBySlug, getAllPostSlugs, getAllCategories } from "@/lib/queries";
import { simpleMarkdownToHtml } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const postUrl = `/blog/${post.slug}`;
  const ogImages = post.coverImage
    ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }];

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
      languages: {
        "en-US": postUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      site: "@devpulse",
      creator: "@devpulse",
      title: post.title,
      description: post.excerpt,
      images: ogImages.map((img) => img.url),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) notFound();

  const htmlContent = simpleMarkdownToHtml(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `/author/${post.author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DevPulse",
      logo: {
        "@type": "ImageObject",
        url: "/opengraph-image",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="breadcrumb" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Link href="/">Home</Link>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <Link href="/blog">Blog</Link>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span>{post.title}</span>
        </nav>
      </div>

      {/* Post Header */}
      <header className="post-header">
        <div className="container-narrow">
          <div className="post-header-meta">
            {post.categories.map(({ category }) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="badge badge-category"
              >
                {category.name}
              </Link>
            ))}
            <time dateTime={post.publishedAt.toISOString()}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{Math.ceil(post.content.split(" ").length / 200)} min read</span>
          </div>

          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="post-cover"
            />
          )}
        </div>
      </header>

      {/* Post Content */}
      <article>
        <div
          className="post-content container-narrow"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Post Footer */}
        <footer className="post-footer">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(({ tag }) => (
                <Link key={tag.slug} href={`/tag/${tag.slug}`} className="badge badge-tag">
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="author-box">
            {post.author.avatarUrl && (
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="author-avatar"
              />
            )}
            <div>
              <p className="author-box-name">
                <Link href={`/author/${post.author.slug}`}>{post.author.name}</Link>
              </p>
              {post.author.bio && (
                <p className="author-box-bio">{post.author.bio}</p>
              )}
              <div className="author-box-links">
                <Link href={`/author/${post.author.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  All posts <ArrowRight size={14} />
                </Link>
                {post.author.website && (
                  <a href={post.author.website} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    Website <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function PostCard({
  post,
}: {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: Date;
    coverImage?: string | null;
    author: { name: string; slug: string };
    categories: { category: { name: string; slug: string } }[];
    tags: { tag: { name: string; slug: string } }[];
  };
}) {
  return (
    <article className="post-card">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            width={600}
            height={340}
            className="post-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <div className="post-card-body">
        <div className="post-card-meta">
          {post.categories.slice(0, 2).map(({ category }) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="badge badge-category"
            >
              {category.name}
            </Link>
          ))}
          <time dateTime={new Date(post.publishedAt).toISOString()}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h2 className="post-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-footer">
          <Link href={`/author/${post.author.slug}`} className="author-link">
            {post.author.name}
          </Link>
          <div className="post-card-tags">
            {post.tags.slice(0, 3).map(({ tag }) => (
              <Link key={tag.slug} href={`/tag/${tag.slug}`} className="badge badge-tag">
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

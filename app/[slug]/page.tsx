import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllPages } from "@/lib/queries";
import { simpleMarkdownToHtml } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

// Protected slugs handled by dedicated routes
const RESERVED_SLUGS = new Set(["about", "contact", "search", "filter-demo", "blog", "routes"]);

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages
    .filter((p) => !RESERVED_SLUGS.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    description: page.metaDesc ?? undefined,
  };
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) notFound();

  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const htmlContent = simpleMarkdownToHtml(page.content);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{page.title}</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: "var(--space-2)" }}>
            Last updated:{" "}
            <time dateTime={page.updatedAt.toISOString()}>
              {new Date(page.updatedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </time>
          </p>
        </div>
      </header>

      <section className="page-content">
        <div className="container-narrow">
          <div
            className="page-body post-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { getRecentPosts, getAllCategories, getAllTags } from "@/lib/queries";
import FilterDemoClient from "./FilterDemoClient";

export const metadata: Metadata = {
  title: "Filter Demo",
  description: "Interactively filter articles by category and tag, a client-side React demo.",
};

export default async function FilterDemoPage() {
  const [posts, categories, tags] = await Promise.all([
    getRecentPosts(12),
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <>
      <section className="taxonomy-header">
        <div className="container">
          <h1 className="taxonomy-title">Filter Demo</h1>
          <p className="taxonomy-desc">
            Interactively filter articles by category and tag with no page reload required.
          </p>
        </div>
      </section>

      <FilterDemoClient
        posts={posts.map((p) => ({
          ...p,
          publishedAt: p.publishedAt,
        }))}
        categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
        tags={tags.map((t) => ({ name: t.name, slug: t.slug }))}
      />
    </>
  );
}

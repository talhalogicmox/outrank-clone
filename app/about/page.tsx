import type { Metadata } from "next";
import Link from "next/link";
import { getAllAuthors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the team behind DevPulse and our mission to make technical education accessible.",
};

export default async function AboutPage() {
  const authors = await getAllAuthors();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">About DevPulse</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container-narrow">
          <div className="page-body">
            <h2>Who We Are</h2>
            <p>
              DevPulse is a small team of engineers and designers passionate about sharing knowledge. We believe great technical content should be detailed, honest, and accessible, not locked behind paywalls.
            </p>

            <h2>Our Mission</h2>
            <p>
              Make high-quality technical education available to every developer, regardless of background or experience level. We publish articles on Next.js, TypeScript, DevOps, AI, Design, and career growth every week.
            </p>

            <h2>What We Cover</h2>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>Deep-dives into modern web frameworks (Next.js, React)</li>
              <li>TypeScript patterns and best practices</li>
              <li>CI/CD, containers, and infrastructure</li>
              <li>UI/UX and design systems</li>
              <li>AI engineering and LLM applications</li>
              <li>Career growth and developer productivity</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="container" style={{ marginTop: "var(--space-12)" }}>
          <h2 className="section-title" style={{ marginBottom: "var(--space-2)" }}>
            <span aria-hidden="true" />
            Meet the Authors
          </h2>
          <div className="team-grid">
            {authors.map((author) => (
              <article key={author.id} className="team-card">
                {author.avatarUrl && (
                  <img src={author.avatarUrl} alt={author.name} className="team-avatar" />
                )}
                <h3 className="team-name">
                  <Link href={`/author/${author.slug}`}>{author.name}</Link>
                </h3>
                {author.bio && <p className="team-bio">{author.bio}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

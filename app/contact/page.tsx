import type { Metadata } from "next";
import { Mail, Send, Briefcase, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the DevPulse team: questions, pitches, and feedback welcome.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="container-narrow">
          <div className="page-body">
            <p>
              We love hearing from our readers. Whether you have a question, a suggestion for a future article, or just want to say hi, reach out.
            </p>

            <h2>General Inquiries</h2>
            <p>
              Email us at{" "}
              <a href="mailto:hello@example.com" style={{ color: "var(--color-accent)" }}>
                hello@example.com
              </a>
              {" "}or find us on Twitter at{" "}
              <a href="https://twitter.com/devpulse" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>
                @devpulse
              </a>.
            </p>

            <h2>Guest Posts</h2>
            <p>
              Interested in writing for DevPulse? We accept pitches from experienced developers. Send a brief outline and two writing samples to{" "}
              <a href="mailto:pitch@example.com" style={{ color: "var(--color-accent)" }}>
                pitch@example.com
              </a>.
            </p>

            <h2>Sponsorships</h2>
            <p>
              We partner with developer-focused companies for sponsorships and newsletter placements. Email{" "}
              <a href="mailto:sponsors@example.com" style={{ color: "var(--color-accent)" }}>
                sponsors@example.com
              </a>{" "}
              with your proposal.
            </p>

            <h2>Bug Reports</h2>
            <p>
              Found a typo or broken link? Open an issue on{" "}
              <a href="https://github.com/devpulse/blog/issues" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                GitHub <ExternalLink size={14} />
              </a>.
            </p>

            <div style={{
              marginTop: "var(--space-10)",
              padding: "var(--space-8)",
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
            }}>
              <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-lg)" }}>
                Quick Links
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Mail size={16} /> <a href="mailto:hello@example.com" style={{ color: "var(--color-accent)" }}>hello@example.com</a> : General
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Send size={16} /> <a href="mailto:pitch@example.com" style={{ color: "var(--color-accent)" }}>pitch@example.com</a> : Guest posts
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Briefcase size={16} /> <a href="mailto:sponsors@example.com" style={{ color: "var(--color-accent)" }}>sponsors@example.com</a> : Sponsorships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

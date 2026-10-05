import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-desc">
        The page you&apos;re looking for has moved, been deleted, or never existed.
      </p>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <Link href="/blog" className="btn btn-outline">Browse Articles</Link>
      </div>
    </div>
  );
}

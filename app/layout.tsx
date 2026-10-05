import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Zap, Search, Route as RouteIcon } from "lucide-react";
import { DevPulseOnly } from "@/components/DevPulseOnly";
import ImageLightbox from "@/components/ImageLightbox";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    template: "%s | DevPulse Blog",
    default: "DevPulse | Modern Dev Articles",
  },
  description:
    "In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.",
  metadataBase: new URL(siteUrl),
  icons: { icon: "/favicon.ico" },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DevPulse",
    title: "DevPulse | Modern Dev Articles",
    description:
      "In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@devpulse",
    creator: "@devpulse",
    title: "DevPulse | Modern Dev Articles",
    description:
      "In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "DevPulse",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/opengraph-image`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "DevPulse",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <DevPulseOnly>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
        </DevPulseOnly>
      </head>
      <body className={inter.className}>
        <ImageLightbox />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <DevPulseOnly>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="site-logo" aria-label="DevPulse home">
              <span className="logo-icon"><Zap size={18} strokeWidth={2.5} /></span>
              <span className="logo-text">DevPulse</span>
            </Link>

            <nav aria-label="Main navigation" className="main-nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/blog" className="nav-link">Blog</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/routes" className="nav-link nav-spec-pill" aria-label="Route Specification">
                <RouteIcon size={14} className="nav-spec-icon" />
                <span>Route Spec</span>
              </Link>
              <Link href="/search" className="nav-link nav-search-icon" aria-label="Search">
                <Search size={16} />
              </Link>
            </nav>
          </div>
        </header>
        </DevPulseOnly>

        <main id="main-content" className="site-main">
          {children}
        </main>

        <DevPulseOnly>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand">
              <Link href="/" className="site-logo">
                <span className="logo-icon"><Zap size={18} strokeWidth={2.5} /></span>
                <span className="logo-text">DevPulse</span>
              </Link>
              <p>In-depth technical articles for modern developers.</p>
            </div>

            <nav aria-label="Footer navigation" className="footer-nav">
              <div className="footer-nav-col">
                <h3>Content</h3>
                <Link href="/blog">All Articles</Link>
                <Link href="/category/technology">Technology</Link>
                <Link href="/category/design">Design</Link>
                <Link href="/category/devops">DevOps</Link>
                <Link href="/category/ai">AI &amp; ML</Link>
              </div>
              <div className="footer-nav-col">
                <h3>Documentation</h3>
                <Link href="/routes">Route Spec</Link>
                <Link href="/filter-demo">Filter Matrix</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </div>
              <div className="footer-nav-col">
                <h3>Feeds &amp; SEO</h3>
                <Link href="/feed.xml">RSS Feed</Link>
                <Link href="/sitemap.xml">Sitemap</Link>
                <Link href="/robots.txt">Robots.txt</Link>
              </div>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} DevPulse. Built with Next.js &amp; Prisma.</p>
          </div>
        </footer>
        </DevPulseOnly>
      </body>
    </html>
  );
}

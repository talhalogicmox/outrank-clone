"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Route as RouteIcon,
  ExternalLink,
  Copy,
  Check,
  Search,
  Layers,
  FileCode2,
  BookOpen,
  Tag,
  User,
  Sliders,
  Rss,
  Globe,
  Compass,
  Server,
  Flame,
  FileCheck,
  Zap,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
  ChevronUp,
  Terminal,
  ArrowRight,
  Sparkles,
  Share2,
  Code2,
} from "lucide-react";

export interface RouteDetailSpec {
  id: string;
  family: "core" | "blog" | "taxonomy" | "author" | "utility" | "technical";
  familyName: string;
  pattern: string;
  strategy: "Static" | "SSG" | "Dynamic (SSR)" | "Route Handler";
  filePath: string;
  description: string;
  liveLink: string;
  liveLabel: string;
  params?: string;
  dataSources: string;
  fallbackBehavior: string;
  acceptanceCriteria: string;
  curlCommand: string;
}

const ROUTE_DATA: RouteDetailSpec[] = [
  // Core Family
  {
    id: "core-home",
    family: "core",
    familyName: "Core Pages",
    pattern: "/",
    strategy: "Static",
    filePath: "app/page.tsx",
    description: "Hero showcase, featured stories grid, recent publications feed, category filter pills, newsletter block.",
    liveLink: "/",
    liveLabel: "/",
    params: "None (root entry)",
    dataSources: "Prisma Post.findMany (featured & recent), Category.findMany",
    fallbackBehavior: "Graceful empty state banners if no posts exist in database",
    acceptanceCriteria: "Hero loads, featured cards render with proper badges, category pills route to respective hubs",
    curlCommand: "curl -I http://localhost:3000/",
  },
  {
    id: "core-about",
    family: "core",
    familyName: "Core Pages",
    pattern: "/about",
    strategy: "Static",
    filePath: "app/about/page.tsx",
    description: "Company mission, editorial values, team manifesto, platform technical stack details.",
    liveLink: "/about",
    liveLabel: "/about",
    params: "None",
    dataSources: "Static editorial content & metadata definitions",
    fallbackBehavior: "Always returns 200 OK static prerendered HTML",
    acceptanceCriteria: "Full layout header/footer present, semantic article structure, author manifesto visible",
    curlCommand: "curl -I http://localhost:3000/about",
  },
  {
    id: "core-contact",
    family: "core",
    familyName: "Core Pages",
    pattern: "/contact",
    strategy: "Static",
    filePath: "app/contact/page.tsx",
    description: "Interactive editorial contact form with client feedback states, office location, inquiries.",
    liveLink: "/contact",
    liveLabel: "/contact",
    params: "None",
    dataSources: "Static contact structure with interactive client-side form handler",
    fallbackBehavior: "Always renders form with client validation feedback",
    acceptanceCriteria: "Form input fields validate email, text input, and display confirmation notification",
    curlCommand: "curl -I http://localhost:3000/contact",
  },

  // Blog Family
  {
    id: "blog-root",
    family: "blog",
    familyName: "Blog Family",
    pattern: "/blog",
    strategy: "Static",
    filePath: "app/blog/page.tsx",
    description: "Page 1 of chronological blog archive with total post counter and pagination controls.",
    liveLink: "/blog",
    liveLabel: "/blog",
    params: "None (Canonical page 1)",
    dataSources: "Prisma Post.findMany (take: 6, orderBy: publishedAt desc)",
    fallbackBehavior: "Renders friendly empty state when database has 0 published posts",
    acceptanceCriteria: "Displays first 6 posts, Previous button disabled, Next button links to /blog/page/2",
    curlCommand: "curl -I http://localhost:3000/blog",
  },
  {
    id: "blog-pagination",
    family: "blog",
    familyName: "Blog Family",
    pattern: "/blog/page/[page]",
    strategy: "Dynamic (SSR)",
    filePath: "app/blog/page/[page]/page.tsx",
    description: "Paginated blog archive with boundary checks, dynamic skip/take offset, and 404 validation.",
    liveLink: "/blog/page/2",
    liveLabel: "/blog/page/2",
    params: "[page] (Integer, page >= 2)",
    dataSources: "Prisma Post.findMany (skip: (page-1)*6, take: 6)",
    fallbackBehavior: "Throws notFound() 404 for page < 2 or page > totalPages or non-numeric parameter",
    acceptanceCriteria: "Page 1 forbidden to avoid duplicate content canonical penalty, page 2 displays items 7-12",
    curlCommand: "curl -I http://localhost:3000/blog/page/2",
  },
  {
    id: "blog-detail",
    family: "blog",
    familyName: "Blog Family",
    pattern: "/blog/[slug]",
    strategy: "SSG",
    filePath: "app/blog/[slug]/page.tsx",
    description: "Article detail with generateStaticParams, reading estimate, author card, lightbox zoom, related posts.",
    liveLink: "/blog/building-scalable-apis-nextjs-app-router",
    liveLabel: "/blog/building-scalable-apis-...",
    params: "[slug] (Unique URL string, pre-generated at build time)",
    dataSources: "Prisma Post.findUnique with author, category, tags, and related posts",
    fallbackBehavior: "Returns Next.js notFound() 404 if article slug does not exist",
    acceptanceCriteria: "Render markdown HTML, clickable image lightbox, JSON-LD BlogPosting schema, related posts",
    curlCommand: "curl -I http://localhost:3000/blog/building-scalable-apis-nextjs-app-router",
  },

  // Taxonomy Family
  {
    id: "category-root",
    family: "taxonomy",
    familyName: "Taxonomy Family",
    pattern: "/category/[slug]",
    strategy: "Dynamic (SSR)",
    filePath: "app/category/[slug]/page.tsx",
    description: "Category archive page 1 filtering articles by category slug with count badges.",
    liveLink: "/category/technology",
    liveLabel: "/category/technology",
    params: "[slug] (Category slug, e.g. technology, design, ai)",
    dataSources: "Prisma Category.findUnique + Post.findMany filtered by categoryId",
    fallbackBehavior: "Throws notFound() 404 if category slug is not found in database",
    acceptanceCriteria: "Header displays category name and total count, renders first 6 category posts",
    curlCommand: "curl -I http://localhost:3000/category/technology",
  },
  {
    id: "category-pagination",
    family: "taxonomy",
    familyName: "Taxonomy Family",
    pattern: "/category/[slug]/page/[page]",
    strategy: "Dynamic (SSR)",
    filePath: "app/category/[slug]/page/[page]/page.tsx",
    description: "Paginated sub-pages for specific categories with boundary validation.",
    liveLink: "/category/technology/page/2",
    liveLabel: "/category/technology/page/2",
    params: "[slug] (string), [page] (Integer >= 2)",
    dataSources: "Prisma Category.findUnique + Post.findMany with skip/take offset",
    fallbackBehavior: "Throws notFound() 404 if page > total category pages or page < 2",
    acceptanceCriteria: "Category pagination active, breadcrumb links back to canonical category page 1",
    curlCommand: "curl -I http://localhost:3000/category/technology/page/2",
  },
  {
    id: "tag-root",
    family: "taxonomy",
    familyName: "Taxonomy Family",
    pattern: "/tag/[slug]",
    strategy: "Dynamic (SSR)",
    filePath: "app/tag/[slug]/page.tsx",
    description: "Tag article collection linking all articles carrying specific topic tags.",
    liveLink: "/tag/nextjs",
    liveLabel: "/tag/nextjs",
    params: "[slug] (Tag identifier, e.g. nextjs, typescript, devops)",
    dataSources: "Prisma Tag.findUnique with related posts relation",
    fallbackBehavior: "Throws notFound() 404 if tag does not exist",
    acceptanceCriteria: "Lists all tagged articles, displays tag badge and total count indicator",
    curlCommand: "curl -I http://localhost:3000/tag/nextjs",
  },

  // Author Family
  {
    id: "author-detail",
    family: "author",
    familyName: "Author Family",
    pattern: "/author/[id]",
    strategy: "Dynamic (SSR)",
    filePath: "app/author/[id]/page.tsx",
    description: "Author profile page supporting both slug (/author/alice-morgan) and numeric ID (/author/1).",
    liveLink: "/author/alice-morgan",
    liveLabel: "/author/alice-morgan",
    params: "[id] (Dual support: string slug OR integer ID)",
    dataSources: "Prisma User.findFirst with author bio, avatar, and first 6 posts",
    fallbackBehavior: "Throws notFound() 404 if author does not exist by slug or ID",
    acceptanceCriteria: "Displays author bio, social links, post count, and author post cards",
    curlCommand: "curl -I http://localhost:3000/author/alice-morgan",
  },
  {
    id: "author-pagination",
    family: "author",
    familyName: "Author Family",
    pattern: "/author/[id]/page/[page]",
    strategy: "Dynamic (SSR)",
    filePath: "app/author/[id]/page/[page]/page.tsx",
    description: "Paginated author post history supporting author slug or ID across page boundaries.",
    liveLink: "/author/alice-morgan/page/2",
    liveLabel: "/author/alice-morgan/page/2",
    params: "[id] (slug or ID), [page] (Integer >= 2)",
    dataSources: "Prisma User.findFirst + Post.findMany with author filter & offset",
    fallbackBehavior: "Throws notFound() 404 for invalid author or out-of-bounds page",
    acceptanceCriteria: "Renders author header and respective page 2 posts with pagination bar",
    curlCommand: "curl -I http://localhost:3000/author/alice-morgan/page/2",
  },

  // Interactive & Utility Family
  {
    id: "util-search",
    family: "utility",
    familyName: "Interactive & CMS",
    pattern: "/search",
    strategy: "Dynamic (SSR)",
    filePath: "app/search/page.tsx",
    description: "Full-text search query across article titles, excerpts, and content with highlight counter.",
    liveLink: "/search?q=nextjs",
    liveLabel: "/search?q=nextjs",
    params: "?q=search_term (URL query string)",
    dataSources: "Prisma Post.findMany with title/excerpt/content ILIKE/contains query",
    fallbackBehavior: "Displays 'No articles found matching query' with search recommendations",
    acceptanceCriteria: "Search input prefilled with query, result cards link to article details",
    curlCommand: "curl -I 'http://localhost:3000/search?q=nextjs'",
  },
  {
    id: "util-filter",
    family: "utility",
    familyName: "Interactive & CMS",
    pattern: "/filter-demo",
    strategy: "Static",
    filePath: "app/filter-demo/page.tsx",
    description: "Client-side interactive reactive filter matrix with live category and tag toggle pills.",
    liveLink: "/filter-demo",
    liveLabel: "/filter-demo",
    params: "None (Client-side interactive state)",
    dataSources: "Prisma Post.findMany + Category.findMany (initial static payload)",
    fallbackBehavior: "Displays 'No articles match active filters' with quick reset button",
    acceptanceCriteria: "Multi-select category pills, instant client-side article re-filtering without page reload",
    curlCommand: "curl -I http://localhost:3000/filter-demo",
  },
  {
    id: "util-slug",
    family: "utility",
    familyName: "Interactive & CMS",
    pattern: "/[slug]",
    strategy: "SSG",
    filePath: "app/[slug]/page.tsx",
    description: "Dynamic CMS fallback page renderer for static legal documents (Privacy Policy, Terms of Service).",
    liveLink: "/privacy",
    liveLabel: "/privacy",
    params: "[slug] (Generic page slug, excluding RESERVED_SLUGS)",
    dataSources: "Prisma Page.findUnique({ where: { slug } })",
    fallbackBehavior: "Throws notFound() 404 for unknown slugs or reserved route names",
    acceptanceCriteria: "Renders markdown content from CMS database with layout wrapper",
    curlCommand: "curl -I http://localhost:3000/privacy",
  },

  // Feeds & Technical Protocols
  {
    id: "tech-rss",
    family: "technical",
    familyName: "Technical & SEO",
    pattern: "/feed.xml",
    strategy: "Route Handler",
    filePath: "app/feed.xml/route.ts",
    description: "Dynamic RSS 2.0 XML syndication feed built from the database using runtime host detection.",
    liveLink: "/feed.xml",
    liveLabel: "/feed.xml",
    params: "None",
    dataSources: "Prisma Post.findMany (most recent 20 posts)",
    fallbackBehavior: "Returns valid empty RSS channel if 0 posts exist",
    acceptanceCriteria: "Content-Type: application/xml, full item title, link, pubDate, and author fields",
    curlCommand: "curl -I http://localhost:3000/feed.xml",
  },
  {
    id: "tech-sitemap",
    family: "technical",
    familyName: "Technical & SEO",
    pattern: "/sitemap.xml",
    strategy: "Route Handler",
    filePath: "app/sitemap.ts",
    description: "Dynamic search engine sitemap indexing all published articles, categories, tags, and authors.",
    liveLink: "/sitemap.xml",
    liveLabel: "/sitemap.xml",
    params: "None",
    dataSources: "Dynamic query across all active models + static routes",
    fallbackBehavior: "Automatically caches for 1 hour with revalidate: 3600",
    acceptanceCriteria: "Standard XML sitemap schema with changefreq, priority, and lastModified tags",
    curlCommand: "curl -I http://localhost:3000/sitemap.xml",
  },
  {
    id: "tech-robots",
    family: "technical",
    familyName: "Technical & SEO",
    pattern: "/robots.txt",
    strategy: "Route Handler",
    filePath: "app/robots.ts",
    description: "Dynamic crawler instructions linking canonical sitemap address dynamically from env or host.",
    liveLink: "/robots.txt",
    liveLabel: "/robots.txt",
    params: "None",
    dataSources: "Dynamic siteUrl resolver via request headers or environment variables",
    fallbackBehavior: "Fallback to http://localhost:3000 if no host header present",
    acceptanceCriteria: "User-agent: *, Allow: /, Sitemap: [dynamic-url]/sitemap.xml",
    curlCommand: "curl -I http://localhost:3000/robots.txt",
  },
];

const FAMILY_OPTIONS = [
  { key: "all", label: "All Families", icon: Layers, count: ROUTE_DATA.length },
  { key: "core", label: "Core Pages", icon: Globe, count: ROUTE_DATA.filter((r) => r.family === "core").length },
  { key: "blog", label: "Blog Family", icon: BookOpen, count: ROUTE_DATA.filter((r) => r.family === "blog").length },
  { key: "taxonomy", label: "Taxonomies", icon: Tag, count: ROUTE_DATA.filter((r) => r.family === "taxonomy").length },
  { key: "author", label: "Authors", icon: User, count: ROUTE_DATA.filter((r) => r.family === "author").length },
  { key: "utility", label: "Interactive / CMS", icon: Sliders, count: ROUTE_DATA.filter((r) => r.family === "utility").length },
  { key: "technical", label: "Feeds & SEO", icon: Rss, count: ROUTE_DATA.filter((r) => r.family === "technical").length },
];

export default function RoutesClientView() {
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedStrategy, setSelectedStrategy] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedJsonAll, setCopiedJsonAll] = useState<boolean>(false);

  const filteredRoutes = useMemo(() => {
    return ROUTE_DATA.filter((item) => {
      const matchesFamily = selectedFamily === "all" || item.family === selectedFamily;
      const matchesStrategy = selectedStrategy === "all" || item.strategy === selectedStrategy;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.pattern.toLowerCase().includes(q) ||
        item.filePath.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.strategy.toLowerCase().includes(q) ||
        item.liveLink.toLowerCase().includes(q) ||
        (item.params && item.params.toLowerCase().includes(q)) ||
        item.dataSources.toLowerCase().includes(q);

      return matchesFamily && matchesStrategy && matchesSearch;
    });
  }, [selectedFamily, selectedStrategy, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyAllJson = () => {
    const jsonStr = JSON.stringify(ROUTE_DATA, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJsonAll(true);
    setTimeout(() => {
      setCopiedJsonAll(false);
    }, 2200);
  };

  const toggleExpand = (id: string) => {
    setExpandedRouteId((prev) => (prev === id ? null : id));
  };

  const getStrategyMeta = (strategy: RouteDetailSpec["strategy"]) => {
    switch (strategy) {
      case "Static":
        return {
          className: "badge-strategy-static",
          icon: FileCheck,
          color: "#60a5fa",
        };
      case "SSG":
        return {
          className: "badge-strategy-ssg",
          icon: Flame,
          color: "#34d399",
        };
      case "Dynamic (SSR)":
        return {
          className: "badge-strategy-ssr",
          icon: Zap,
          color: "#fbbf24",
        };
      case "Route Handler":
        return {
          className: "badge-strategy-handler",
          icon: Server,
          color: "#c084fc",
        };
      default:
        return {
          className: "badge-strategy-default",
          icon: Code2,
          color: "#94a3b8",
        };
    }
  };

  const staticCount = ROUTE_DATA.filter((r) => r.strategy === "Static").length;
  const ssgCount = ROUTE_DATA.filter((r) => r.strategy === "SSG").length;
  const ssrCount = ROUTE_DATA.filter((r) => r.strategy === "Dynamic (SSR)").length;
  const handlerCount = ROUTE_DATA.filter((r) => r.strategy === "Route Handler").length;

  return (
    <div className="routes-spec-page">
      {/* Background glowing mesh */}
      <div className="routes-glow-mesh" aria-hidden="true" />

      <div className="container">
        {/* Hero Section */}
        <header className="routes-hero">
          <div className="routes-hero-top-row">
            <div className="live-status-pill">
              <span className="live-pulse-dot" />
              <span className="live-pulse-text">Live CMS Route Architecture</span>
              <span className="live-version-badge">v1.0 Ready</span>
            </div>

            <div className="hero-actions">
              <button
                type="button"
                className="hero-action-btn"
                onClick={handleCopyAllJson}
                title="Copy entire route specification as JSON"
              >
                {copiedJsonAll ? (
                  <>
                    <Check size={14} className="text-emerald" />
                    <span>JSON Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} />
                    <span>Export JSON Spec</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h1 className="routes-hero-title">
            Route-First CMS <span className="title-gradient">Interface Spec</span>
          </h1>
          <p className="routes-hero-desc">
            Production blueprint of every frontend page family. Explore exact route patterns, rendering strategies,
            source code files, and live parallel URLs with instant testing actions.
          </p>

          {/* Interactive Rendering Strategy Distribution Bar */}
          <div className="strategy-distribution-bar-wrapper">
            <div className="distribution-labels">
              <span className="dist-title">Rendering Architecture Breakdown</span>
              <span className="dist-total">{ROUTE_DATA.length} Total Verified Endpoints</span>
            </div>
            <div className="strategy-distribution-bar" role="progressbar" aria-label="Strategy distribution">
              <div
                className="dist-segment dist-static"
                style={{ width: `${(staticCount / ROUTE_DATA.length) * 100}%` }}
                title={`Static: ${staticCount} (${Math.round((staticCount / ROUTE_DATA.length) * 100)}%)`}
                onClick={() => setSelectedStrategy(selectedStrategy === "Static" ? "all" : "Static")}
              />
              <div
                className="dist-segment dist-ssr"
                style={{ width: `${(ssrCount / ROUTE_DATA.length) * 100}%` }}
                title={`Dynamic SSR: ${ssrCount} (${Math.round((ssrCount / ROUTE_DATA.length) * 100)}%)`}
                onClick={() => setSelectedStrategy(selectedStrategy === "Dynamic (SSR)" ? "all" : "Dynamic (SSR)")}
              />
              <div
                className="dist-segment dist-ssg"
                style={{ width: `${(ssgCount / ROUTE_DATA.length) * 100}%` }}
                title={`SSG: ${ssgCount} (${Math.round((ssgCount / ROUTE_DATA.length) * 100)}%)`}
                onClick={() => setSelectedStrategy(selectedStrategy === "SSG" ? "all" : "SSG")}
              />
              <div
                className="dist-segment dist-handler"
                style={{ width: `${(handlerCount / ROUTE_DATA.length) * 100}%` }}
                title={`Route Handlers: ${handlerCount} (${Math.round((handlerCount / ROUTE_DATA.length) * 100)}%)`}
                onClick={() => setSelectedStrategy(selectedStrategy === "Route Handler" ? "all" : "Route Handler")}
              />
            </div>
          </div>
        </header>

        {/* Quick Stats Grid with Interactive Filters */}
        <div className="routes-stats-grid">
          <button
            type="button"
            className={`stat-card ${selectedStrategy === "all" ? "stat-active" : ""}`}
            onClick={() => setSelectedStrategy("all")}
          >
            <div className="stat-card-icon-wrapper icon-all">
              <Layers size={18} />
            </div>
            <div className="stat-card-content">
              <span className="stat-number">{ROUTE_DATA.length}</span>
              <span className="stat-label">Total Routes</span>
            </div>
          </button>

          <button
            type="button"
            className={`stat-card ${selectedStrategy === "Static" ? "stat-active" : ""}`}
            onClick={() => setSelectedStrategy(selectedStrategy === "Static" ? "all" : "Static")}
          >
            <div className="stat-card-icon-wrapper icon-static">
              <FileCheck size={18} />
            </div>
            <div className="stat-card-content">
              <span className="stat-number">{staticCount}</span>
              <span className="stat-label">Static Routes</span>
            </div>
          </button>

          <button
            type="button"
            className={`stat-card ${selectedStrategy === "Dynamic (SSR)" ? "stat-active" : ""}`}
            onClick={() => setSelectedStrategy(selectedStrategy === "Dynamic (SSR)" ? "all" : "Dynamic (SSR)")}
          >
            <div className="stat-card-icon-wrapper icon-ssr">
              <Zap size={18} />
            </div>
            <div className="stat-card-content">
              <span className="stat-number">{ssrCount}</span>
              <span className="stat-label">Dynamic SSR</span>
            </div>
          </button>

          <button
            type="button"
            className={`stat-card ${selectedStrategy === "SSG" ? "stat-active" : ""}`}
            onClick={() => setSelectedStrategy(selectedStrategy === "SSG" ? "all" : "SSG")}
          >
            <div className="stat-card-icon-wrapper icon-ssg">
              <Flame size={18} />
            </div>
            <div className="stat-card-content">
              <span className="stat-number">{ssgCount}</span>
              <span className="stat-label">SSG Prerendered</span>
            </div>
          </button>

          <button
            type="button"
            className={`stat-card ${selectedStrategy === "Route Handler" ? "stat-active" : ""}`}
            onClick={() => setSelectedStrategy(selectedStrategy === "Route Handler" ? "all" : "Route Handler")}
          >
            <div className="stat-card-icon-wrapper icon-handler">
              <Server size={18} />
            </div>
            <div className="stat-card-content">
              <span className="stat-number">{handlerCount}</span>
              <span className="stat-label">Route Handlers</span>
            </div>
          </button>
        </div>

        {/* Toolbar: Search, Family Tabs, and View Switcher */}
        <div className="routes-toolbar-card">
          <div className="toolbar-top">
            <div className="routes-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search route patterns, params, file paths, strategies, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search routes"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle" role="group" aria-label="View layout switch">
              <button
                type="button"
                className={`view-mode-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table View"
              >
                <TableIcon size={15} />
                <span>Table</span>
              </button>
              <button
                type="button"
                className={`view-mode-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
                title="Card Grid View"
              >
                <LayoutGrid size={15} />
                <span>Cards</span>
              </button>
            </div>
          </div>

          {/* Family Filter Tabs */}
          <div className="routes-family-filters" role="tablist" aria-label="Page Families">
            {FAMILY_OPTIONS.map((fam) => {
              const Icon = fam.icon;
              const isActive = selectedFamily === fam.key;
              return (
                <button
                  key={fam.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`family-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedFamily(fam.key)}
                >
                  <Icon size={14} />
                  <span>{fam.label}</span>
                  <span className="family-count-badge">{fam.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="routes-results-meta">
          <div className="meta-left">
            <span>
              Showing <strong className="highlight-count">{filteredRoutes.length}</strong> of{" "}
              <strong>{ROUTE_DATA.length}</strong> endpoints
            </span>
            {selectedStrategy !== "all" && (
              <span className="active-pill-filter">
                Strategy: <em>{selectedStrategy}</em>
                <button
                  type="button"
                  onClick={() => setSelectedStrategy("all")}
                  className="remove-pill"
                >
                  ×
                </button>
              </span>
            )}
            {selectedFamily !== "all" && (
              <span className="active-pill-filter">
                Family: <em>{FAMILY_OPTIONS.find((f) => f.key === selectedFamily)?.label}</em>
                <button
                  type="button"
                  onClick={() => setSelectedFamily("all")}
                  className="remove-pill"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          <div className="meta-right">
            <span className="hint-text">Click any row to inspect deep architecture spec</span>
          </div>
        </div>

        {/* View Mode 1: Modern Table View */}
        {viewMode === "table" ? (
          <div className="routes-table-container">
            <table className="routes-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "24%" }}>Route Pattern</th>
                  <th scope="col" style={{ width: "13%" }}>Rendering Strategy</th>
                  <th scope="col" style={{ width: "22%" }}>File Path</th>
                  <th scope="col" style={{ width: "23%" }}>Description &amp; Highlights</th>
                  <th scope="col" style={{ width: "18%" }}>Live URL &amp; Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="no-routes-found">
                      <Compass size={36} />
                      <h3>No matching routes discovered</h3>
                      <p>No endpoints matched &quot;{searchQuery}&quot; with current filters.</p>
                      <button
                        type="button"
                        className="reset-btn"
                        onClick={() => {
                          setSelectedFamily("all");
                          setSelectedStrategy("all");
                          setSearchQuery("");
                        }}
                      >
                        Reset All Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredRoutes.map((route) => {
                    const strategyMeta = getStrategyMeta(route.strategy);
                    const StrategyIcon = strategyMeta.icon;
                    const isCopiedPattern = copiedId === `pattern-${route.id}`;
                    const isCopiedFile = copiedId === `file-${route.id}`;
                    const isExpanded = expandedRouteId === route.id;

                    return (
                      <tr
                        key={route.id}
                        className={`route-row ${isExpanded ? "row-expanded" : ""}`}
                        onClick={() => toggleExpand(route.id)}
                      >
                        {/* Column 1: Route Pattern */}
                        <td className="cell-pattern">
                          <div className="pattern-row">
                            <span className="method-tag">GET</span>
                            <code className="route-code-badge">{route.pattern}</code>
                            <button
                              type="button"
                              className="inline-copy-btn"
                              title="Copy route pattern"
                              aria-label={`Copy pattern ${route.pattern}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(route.pattern, `pattern-${route.id}`);
                              }}
                            >
                              {isCopiedPattern ? (
                                <Check size={12} className="text-emerald" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                          <div className="pattern-sub-row">
                            <span className="family-tag-pill">{route.familyName}</span>
                            {route.params && (
                              <span className="params-indicator" title={route.params}>
                                {route.params.split(" ")[0]}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Column 2: Rendering Strategy */}
                        <td className="cell-strategy">
                          <span className={`strategy-badge ${strategyMeta.className}`}>
                            <StrategyIcon size={12} />
                            <span>{route.strategy}</span>
                          </span>
                        </td>

                        {/* Column 3: File Path */}
                        <td className="cell-filepath">
                          <div className="filepath-row">
                            <FileCode2 size={14} className="filepath-icon" />
                            <code className="filepath-code">{route.filePath}</code>
                            <button
                              type="button"
                              className="inline-copy-btn"
                              title="Copy file path"
                              aria-label={`Copy file path ${route.filePath}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(route.filePath, `file-${route.id}`);
                              }}
                            >
                              {isCopiedFile ? (
                                <Check size={12} className="text-emerald" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Column 4: Description */}
                        <td className="cell-desc">
                          <p className="desc-main-text">{route.description}</p>
                          <div className="desc-expand-hint">
                            <span>{isExpanded ? "Hide specs" : "Inspect spec"}</span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </div>
                        </td>

                        {/* Column 5: Live Action Button */}
                        <td className="cell-action">
                          <Link
                            href={route.liveLink}
                            className="live-launch-btn"
                            title={`Open live route ${route.liveLink}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="live-btn-text">{route.liveLabel}</span>
                            <ExternalLink size={13} className="live-launch-icon" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* View Mode 2: Card Grid View */
          <div className="routes-cards-grid">
            {filteredRoutes.length === 0 ? (
              <div className="no-routes-card">
                <Compass size={40} />
                <h3>No matching routes</h3>
                <p>Try clearing your search query or family filters.</p>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => {
                    setSelectedFamily("all");
                    setSelectedStrategy("all");
                    setSearchQuery("");
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredRoutes.map((route) => {
                const strategyMeta = getStrategyMeta(route.strategy);
                const StrategyIcon = strategyMeta.icon;
                const isCopiedPattern = copiedId === `pattern-${route.id}`;
                const isExpanded = expandedRouteId === route.id;

                return (
                  <div
                    key={route.id}
                    className={`route-grid-card ${isExpanded ? "card-expanded" : ""}`}
                    onClick={() => toggleExpand(route.id)}
                  >
                    <div className="card-top-bar">
                      <span className="family-tag-pill">{route.familyName}</span>
                      <span className={`strategy-badge ${strategyMeta.className}`}>
                        <StrategyIcon size={12} />
                        <span>{route.strategy}</span>
                      </span>
                    </div>

                    <div className="card-pattern-row">
                      <span className="method-tag">GET</span>
                      <code className="card-route-pattern">{route.pattern}</code>
                      <button
                        type="button"
                        className="inline-copy-btn"
                        title="Copy route pattern"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(route.pattern, `pattern-${route.id}`);
                        }}
                      >
                        {isCopiedPattern ? (
                          <Check size={12} className="text-emerald" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>

                    <p className="card-desc-text">{route.description}</p>

                    <div className="card-filepath-box">
                      <FileCode2 size={13} className="filepath-icon" />
                      <code className="filepath-code">{route.filePath}</code>
                    </div>

                    <div className="card-bottom-actions">
                      <button
                        type="button"
                        className="card-inspect-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(route.id);
                        }}
                      >
                        <span>{isExpanded ? "Collapse Spec" : "Inspect Spec"}</span>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      <Link
                        href={route.liveLink}
                        className="live-launch-btn"
                        title={`Open ${route.liveLink}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="live-btn-text">{route.liveLabel}</span>
                        <ExternalLink size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Detailed Route Inspector Drawer / Accordion Section */}
        {expandedRouteId && (
          <aside className="route-inspector-panel">
            {(() => {
              const activeRoute = ROUTE_DATA.find((r) => r.id === expandedRouteId);
              if (!activeRoute) return null;
              const strategyMeta = getStrategyMeta(activeRoute.strategy);
              const StrategyIcon = strategyMeta.icon;
              const isCopiedCurl = copiedId === `curl-${activeRoute.id}`;

              return (
                <div className="inspector-inner">
                  <div className="inspector-header">
                    <div className="inspector-title-group">
                      <div className="inspector-badge-row">
                        <span className="method-tag large">GET</span>
                        <span className={`strategy-badge ${strategyMeta.className}`}>
                          <StrategyIcon size={13} />
                          <span>{activeRoute.strategy}</span>
                        </span>
                        <span className="family-tag-pill">{activeRoute.familyName}</span>
                      </div>
                      <h2 className="inspector-pattern-title">{activeRoute.pattern}</h2>
                      <p className="inspector-subtitle">{activeRoute.description}</p>
                    </div>

                    <button
                      type="button"
                      className="inspector-close-btn"
                      onClick={() => setExpandedRouteId(null)}
                      aria-label="Close inspector"
                    >
                      ×
                    </button>
                  </div>

                  <div className="inspector-grid">
                    {/* Module 1: File & Source */}
                    <div className="inspector-box">
                      <span className="box-label">
                        <FileCode2 size={14} /> Source Implementation
                      </span>
                      <code className="box-code-value">{activeRoute.filePath}</code>
                    </div>

                    {/* Module 2: Parameters */}
                    <div className="inspector-box">
                      <span className="box-label">
                        <Sparkles size={14} /> URL Parameters &amp; Constraints
                      </span>
                      <p className="box-text-value">{activeRoute.params || "Static route (no dynamic parameters)"}</p>
                    </div>

                    {/* Module 3: Data Dependencies */}
                    <div className="inspector-box">
                      <span className="box-label">
                        <Server size={14} /> Data Model &amp; Queries
                      </span>
                      <p className="box-text-value">{activeRoute.dataSources}</p>
                    </div>

                    {/* Module 4: Fallback & Empty States */}
                    <div className="inspector-box">
                      <span className="box-label">
                        <Sliders size={14} /> Fallback &amp; Boundary Handling
                      </span>
                      <p className="box-text-value">{activeRoute.fallbackBehavior}</p>
                    </div>
                  </div>

                  {/* Module 5: Acceptance Criteria */}
                  <div className="inspector-criteria-box">
                    <span className="box-label">
                      <Check size={14} className="text-emerald" /> Operational Acceptance Criteria
                    </span>
                    <p className="criteria-text">{activeRoute.acceptanceCriteria}</p>
                  </div>

                  {/* Module 6: cURL & Live Test Action */}
                  <div className="inspector-curl-row">
                    <div className="curl-box">
                      <Terminal size={14} className="terminal-icon" />
                      <code className="curl-code">{activeRoute.curlCommand}</code>
                    </div>
                    <div className="curl-actions">
                      <button
                        type="button"
                        className="curl-copy-btn"
                        onClick={() => handleCopy(activeRoute.curlCommand, `curl-${activeRoute.id}`)}
                        title="Copy cURL command"
                      >
                        {isCopiedCurl ? (
                          <>
                            <Check size={13} className="text-emerald" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy cURL</span>
                          </>
                        )}
                      </button>
                      <Link
                        href={activeRoute.liveLink}
                        className="live-launch-btn primary"
                        title={`Open live endpoint ${activeRoute.liveLink}`}
                      >
                        <span>Open Live Endpoint</span>
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}
          </aside>
        )}

        {/* Page Families Summary Section */}
        <section className="family-summary-section">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">
                <Layers size={20} />
                <span>Frontend Page Families Reference</span>
              </h2>
              <p className="section-subtitle">
                Modular component handoff, layout boundaries, and route family contracts.
              </p>
            </div>
          </div>

          <div className="family-cards-grid">
            {/* Blog Family Card */}
            <div className="family-card">
              <div className="family-card-header">
                <div className="family-card-icon-wrap blog">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3>Blog Family</h3>
                  <span className="family-meta-tag">3 Endpoints</span>
                </div>
              </div>
              <p className="family-card-desc">
                Core publication engine serving editorial content, chronological pagination, and individual story views.
              </p>
              <ul className="family-route-list">
                <li>
                  <code className="route-badge">/blog</code>
                  <Link href="/blog" className="route-arrow-link">
                    Archive (Page 1) <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/blog/page/[page]</code>
                  <Link href="/blog/page/2" className="route-arrow-link">
                    Archive (Page 2) <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/blog/[slug]</code>
                  <Link href="/blog/building-scalable-apis-nextjs-app-router" className="route-arrow-link">
                    Story Detail <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Taxonomy Family Card */}
            <div className="family-card">
              <div className="family-card-header">
                <div className="family-card-icon-wrap taxonomy">
                  <Tag size={18} />
                </div>
                <div>
                  <h3>Taxonomy Family</h3>
                  <span className="family-meta-tag">3 Endpoints</span>
                </div>
              </div>
              <p className="family-card-desc">
                Hierarchical content categorization supporting multi-page pagination for categories and focused tag hubs.
              </p>
              <ul className="family-route-list">
                <li>
                  <code className="route-badge">/category/[slug]</code>
                  <Link href="/category/technology" className="route-arrow-link">
                    Category Hub <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/category/[slug]/page/[page]</code>
                  <Link href="/category/technology/page/2" className="route-arrow-link">
                    Category Page 2 <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/tag/[slug]</code>
                  <Link href="/tag/nextjs" className="route-arrow-link">
                    Tag Collection <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Author Family Card */}
            <div className="family-card">
              <div className="family-card-header">
                <div className="family-card-icon-wrap author">
                  <User size={18} />
                </div>
                <div>
                  <h3>Author Family</h3>
                  <span className="family-meta-tag">2 Endpoints</span>
                </div>
              </div>
              <p className="family-card-desc">
                Creator hubs with biography, avatar, social handles, and paginated archives supporting both slug and numeric ID.
              </p>
              <ul className="family-route-list">
                <li>
                  <code className="route-badge">/author/[id]</code>
                  <Link href="/author/alice-morgan" className="route-arrow-link">
                    Author Profile <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/author/[id]/page/[page]</code>
                  <Link href="/author/alice-morgan/page/2" className="route-arrow-link">
                    Author Page 2 <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/author/1</code>
                  <Link href="/author/1" className="route-arrow-link">
                    Numeric ID Link <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Utility & Technical Family Card */}
            <div className="family-card">
              <div className="family-card-header">
                <div className="family-card-icon-wrap technical">
                  <Sliders size={18} />
                </div>
                <div>
                  <h3>Technical &amp; Protocols</h3>
                  <span className="family-meta-tag">6 Endpoints</span>
                </div>
              </div>
              <p className="family-card-desc">
                Interactive search engine, client filter matrix, CMS dynamic pages, XML RSS feeds, and crawler instructions.
              </p>
              <ul className="family-route-list">
                <li>
                  <code className="route-badge">/search?q=query</code>
                  <Link href="/search?q=nextjs" className="route-arrow-link">
                    Live Search <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/filter-demo</code>
                  <Link href="/filter-demo" className="route-arrow-link">
                    Interactive Matrix <ArrowRight size={12} />
                  </Link>
                </li>
                <li>
                  <code className="route-badge">/feed.xml &amp; /sitemap.xml</code>
                  <Link href="/feed.xml" className="route-arrow-link">
                    RSS &amp; Sitemap <ArrowRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

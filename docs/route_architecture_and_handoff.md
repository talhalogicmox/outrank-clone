# Route Architecture & Module Handoff Specification

This document provides a comprehensive operational checklist for every route in the DevPulse CMS application, followed by a module handoff guide detailing component dependencies, data contracts, fallbacks, and layout boundaries.

---

## 1. Per-Route Checklist

---

### Route: `/` (Home Page)
- **Purpose**: Brand introduction, discovery hub, curated high-value content showcasing featured posts, recent publications, category shortcuts, and newsletter subscription.
- **Required Content**:
  - Hero headline and value proposition.
  - Featured articles section (up to 3 posts marked `featured: true`).
  - Recent posts feed (6 most recent published posts).
  - Category navigation pills linking to all available categories.
- **Optional Content**:
  - Cover images on featured cards.
  - Newsletter call-to-action block.
- **Empty State**:
  - If no featured posts exist: Renders fallback notice `No featured stories found`.
  - If no recent posts exist: Renders `No stories published yet`.
- **Shared UI Pieces**:
  - `PostCard` (featured variant and standard variant).
  - Main layout Header (Logo, navigation links, search icon button).
  - Main layout Footer (Links, feeds, copyright).
- **SEO / Meta Basics**:
  - Title: `DevPulse | Modern Dev Articles`
  - Description: `In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth for modern developers.`
  - OpenGraph title & description configured.
- **Pagination / Fallback Behavior**:
  - Does not paginate on the home page directly; provides a prominent `View all posts →` button navigating to `/blog`.
- **Acceptance Criteria**:
  - Clicking any category pill navigates to `/category/[slug]`.
  - Clicking any post card navigates to `/blog/[slug]`.
  - Featured section dynamically highlights posts with `featured: true` in descending date order.

---

### Route: `/blog` (Blog Archive - Page 1)
- **Purpose**: Canonical entry point for browsing all articles chronologically in paginated sets of 6.
- **Required Content**:
  - Header with archive title and total published post counter.
  - 6 most recent published articles rendered via `PostCard`.
  - Pagination bar if total posts > 6.
- **Optional Content**:
  - Post cover images, multiple tags and secondary categories on cards.
- **Empty State**:
  - Empty state container with icon and message: `No articles published yet. Check back soon!`
- **Shared UI Pieces**:
  - `PostCard`
  - `Pagination`
- **SEO / Meta Basics**:
  - Title: `All Articles | DevPulse Blog`
  - Description: `Browse all articles, tutorials, and deep-dives on DevPulse.`
- **Pagination / Fallback Behavior**:
  - Canonical page 1.
  - Previous button is disabled (`aria-disabled="true"`).
  - Next button routes to `/blog/page/2`.
- **Acceptance Criteria**:
  - Renders exactly `POSTS_PER_PAGE` (6) items.
  - Shows page numbers `1, 2, ...` matching total database count.

---

### Route: `/blog/page/[page]` (Paginated Blog Archive)
- **Purpose**: Paginated sub-pages (Page 2+) of the general blog archive.
- **Required Content**:
  - Archive header with `Page X of Y`.
  - `PostCard` list for the calculated slice (`skip = (page - 1) * 6`).
  - Active pagination controls showing current page active state.
- **Optional Content**:
  - Post cover images, tag pills.
- **Empty State**:
  - If `page < 2` or `page > totalPages` or `isNaN(page)`: Triggers `notFound()` (404 page).
- **Shared UI Pieces**:
  - `PostCard`
  - `Pagination` (with `basePath="/blog/page"`).
- **SEO / Meta Basics**:
  - Title: `All Articles - Page [page] | DevPulse Blog`
  - Description: `Browse all articles, tutorials, and deep-dives on DevPulse (page [page]).`
- **Pagination / Fallback Behavior**:
  - Navigating back to page 1 directs to the canonical `/blog` URL (not `/blog/page/1`).
  - Out-of-bounds page requests return standard Next.js 404.
- **Acceptance Criteria**:
  - `/blog/page/1` returns 404 (redirects or prevents duplicate content canonical penalty).
  - Page 2 displays items 7 through 12 in descending date order.

---

### Route: `/blog/[slug]` (Single Article View)
- **Purpose**: Comprehensive reading experience for an article.
- **Required Content**:
  - Article title, published date, estimated reading time.
  - Category badges linking to `/category/[slug]`.
  - Full article HTML content rendered from Markdown.
  - Author bio box with name, avatar, bio text, and link to `/author/[slug]`.
- **Optional Content**:
  - Cover image with full width layout.
  - Tag badges list (`/tag/[slug]`).
  - Author external website link.
  - Related posts list (up to 3 articles sharing category).
- **Empty State**:
  - If slug does not match any published database record: Triggers `notFound()` (404).
- **Shared UI Pieces**:
  - `PostCard` (for related posts section).
  - Markdown styling classes (`.post-content`, code blocks, blockquotes, tables).
- **SEO / Meta Basics**:
  - Dynamic `generateMetadata`: Title: `[Post Title] | DevPulse Blog`, Description: Post excerpt.
  - OpenGraph title, description, and article publication date.
  - Generates static params for all published posts at build time (`generateStaticParams`).
- **Pagination / Fallback Behavior**:
  - Single article view; no pagination.
- **Acceptance Criteria**:
  - Heading hierarchy starts with `<h1>` for post title.
  - Code blocks and tables format cleanly without layout break.
  - All tags, categories, and author links route to their respective taxonomy archives.

---

### Route: `/category/[slug]` & `/category/[slug]/page/[page]`
- **Purpose**: Filtered listing of all published articles belonging to a specific category.
- **Required Content**:
  - Taxonomy header with category name, description, and post count.
  - Paginated post list (6 per page).
  - Pagination controls linking to `/category/[slug]/page/[page]`.
- **Optional Content**:
  - Category description text.
- **Empty State**:
  - If category does not exist in DB: Triggers `notFound()` (404).
  - If category exists but has 0 posts: Renders `No articles in this category yet`.
  - If requesting page `> totalPages` or `page < 2`: Triggers `notFound()`.
- **Shared UI Pieces**:
  - `PostCard`
  - `Pagination` (`basePath="/category/[slug]/page"`).
- **SEO / Meta Basics**:
  - Title: `[Category Name] Articles | DevPulse Blog`
  - Description: Category description or fallback snippet.
- **Pagination / Fallback Behavior**:
  - Canonical page 1 is `/category/[slug]`.
  - Next page navigates to `/category/[slug]/page/2`.
- **Acceptance Criteria**:
  - URL `/category/technology` renders page 1.
  - URL `/category/technology/page/2` renders page 2 without 404 if post count > 6.

---

### Route: `/tag/[slug]` (Tag Archive)
- **Purpose**: Filtered listing of articles tagged with a specific topic tag.
- **Required Content**:
  - Header showing `#tag-name` and total article count.
  - Grid of matching posts.
- **Optional Content**:
  - None.
- **Empty State**:
  - Non-existent tag triggers `notFound()`.
  - Tag with 0 posts displays `No articles tagged #[tag] yet`.
- **Shared UI Pieces**:
  - `PostCard`
- **SEO / Meta Basics**:
  - Title: `#[Tag Name] Articles | DevPulse Blog`
  - Description: `All articles tagged with #[tag-name] on DevPulse.`
- **Pagination / Fallback Behavior**:
  - Renders all tagged articles.
- **Acceptance Criteria**:
  - Case-insensitive / slug-based matching.

---

### Route: `/author/[id]` & `/author/[id]/page/[page]`
- **Purpose**: Author profile page displaying bio, social links, and author publication feed.
- **Required Content**:
  - Author header: Name, bio, avatar, article count.
  - External links (Website, Email) when available.
  - List of articles authored by this user.
  - Pagination controls if author has > 6 posts.
- **Optional Content**:
  - Avatar image (falls back cleanly if omitted).
  - Website URL and mailto link.
- **Empty State**:
  - Non-existent author slug or ID: Returns 404.
  - Author with 0 posts: Displays `No articles published yet`.
  - Requesting `.../page/X` where `X > totalPages`: Returns 404.
- **Shared UI Pieces**:
  - `PostCard`
  - `Pagination` (`basePath="/author/[id]/page"`).
- **SEO / Meta Basics**:
  - Title: `[Author Name] | Author | DevPulse Blog`
  - Description: Author bio.
- **Pagination / Fallback Behavior**:
  - Supports **both author slug** (e.g. `/author/alice-morgan`) and **numeric ID** (e.g. `/author/1`).
  - Page 1 is canonical at `/author/[id]`.
  - Page 2 is accessible at `/author/[id]/page/2`.
- **Acceptance Criteria**:
  - Both `/author/alice-morgan` and `/author/1` load Alice Morgan's profile.
  - Pagination links preserve the identifier format used in the initial request.

---

### Route: `/search` (Search Results)
- **Purpose**: Server-rendered full-text keyword search across articles.
- **Required Content**:
  - Interactive search form with input field prefilled with current `?q=` query.
  - Search results count indicator.
  - Grid of matching articles.
- **Optional Content**:
  - Tag pills and category badges on result cards.
- **Empty State**:
  - If no query is submitted (`?q=` empty): Prompts user with `Type a keyword above to search through all articles`.
  - If query returns 0 matches: Displays `No results found for "[query]"`.
- **Shared UI Pieces**:
  - `PostCard`
- **SEO / Meta Basics**:
  - Title: `Search | DevPulse Blog`
  - `robots: { index: false }` or canonical search metadata.
- **Pagination / Fallback Behavior**:
  - Executes server-side query against `title`, `excerpt`, and `content` fields using Prisma.
- **Acceptance Criteria**:
  - Submitting search input triggers `GET /search?q=[term]`.
  - HTML renders without requiring client-side JavaScript.

---

### Route: `/filter-demo` (Interactive Client-Side Filtering)
- **Purpose**: Instant, zero-reload multi-facet filtering demo combining categories and tags.
- **Required Content**:
  - Category selector buttons with active toggle indicators.
  - Tag filter multi-select buttons.
  - Real-time result counter (`Showing X of Y articles`).
  - Filtered posts grid.
- **Optional Content**:
  - `Reset all filters` button when filters are active.
- **Empty State**:
  - When no posts match the selected category + tag combinations: Shows `No articles match the selected filters` with a `Clear filters` button.
- **Shared UI Pieces**:
  - `PostCard`
- **SEO / Meta Basics**:
  - Title: `Interactive Filter Demo | DevPulse Blog`
- **Pagination / Fallback Behavior**:
  - Server Component fetches complete dataset and serializes to client component `FilterDemoClient`.
  - Client component handles filtering instantly in memory using `useMemo`.
- **Acceptance Criteria**:
  - Toggling categories or tags updates the grid instantaneously with zero network latency.

---

### Route: `/about` & `/contact` (Static / Marketing Pages)
- **Purpose**: Company identity, mission statement, author team directory, contact details, guest post pitch guidelines.
- **Required Content**:
  - `/about`: Mission statement, editorial principles, live dynamic team grid fetched from database (`getAllAuthors()`).
  - `/contact`: Official email contacts, editorial pitch instructions, sponsorship information.
- **Optional Content**:
  - Author avatars, bio snippets, direct author profile links.
- **Empty State**:
  - Not applicable (core content structured in page with live dynamic database relations).
- **Shared UI Pieces**:
  - Team member cards, contact information boxes.
- **SEO / Meta Basics**:
  - Descriptive titles and meta descriptions for indexing.
- **Acceptance Criteria**:
  - About page updates automatically whenever a new author is added to the database.

---

### Route: `/[slug]` (Generic CMS Pages: Privacy, Terms, etc.)
- **Purpose**: Wildcard handler for arbitrary database-managed CMS utility pages.
- **Required Content**:
  - Page title `<h1>`.
  - Last updated timestamp.
  - Markdown-rendered page content.
- **Optional Content**:
  - Meta description override stored in DB `page.metaDesc`.
- **Empty State**:
  - If slug matches a reserved route (`blog`, `about`, `contact`, `author`, `category`, `tag`, `search`, `api`, `feed.xml`): Calls `notFound()`.
  - If page record not found in database: Calls `notFound()`.
- **Shared UI Pieces**:
  - Markdown typography container (`.post-content`).
- **SEO / Meta Basics**:
  - Dynamic `generateMetadata` reading `page.title` and `page.metaDesc`.
  - Static generation via `generateStaticParams` pulling all database pages.
- **Acceptance Criteria**:
  - Visiting `/privacy` loads the database Privacy Policy.
  - Visiting `/terms` loads the database Terms of Service.
  - Visiting `/unknown-page` returns 404.

---

### Route: `/feed.xml` (RSS 2.0 Feed)
- **Purpose**: Syndication feed for RSS readers and feed aggregators.
- **Required Content**:
  - Valid RSS 2.0 XML schema.
  - Channel title, link, description, language, lastBuildDate.
  - `atom:link` self-reference.
  - Up to 20 recent posts with title, link, guid, pubDate, excerpt, author email/name, categories.
- **Dynamic Origin**:
  - Dynamically extracts domain from `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, Vercel env, or incoming request headers via `getBaseUrl(request)`.
- **Acceptance Criteria**:
  - `Content-Type: application/xml; charset=utf-8`.
  - Contains zero hardcoded local/sample domains.

---

### Route: `/sitemap.xml` (Dynamic XML Sitemap)
- **Purpose**: Comprehensive index of all indexable URLs for search engines.
- **Required Content**:
  - Valid Sitemaps XML protocol.
  - Core routes (`/`, `/blog`, `/about`, `/contact`).
  - CMS pages (`/privacy`, `/terms`) with actual database `updatedAt`.
  - All published posts (`/blog/[slug]`) with database `updatedAt`.
  - All categories (`/category/[slug]`).
  - All tags (`/tag/[slug]`).
  - All authors (`/author/[slug]`).
- **Dynamic Origin**:
  - Fully dynamic (`force-dynamic`); derives URLs from `getBaseUrl()`.
- **Acceptance Criteria**:
  - Valid XML structure readable by search engines.

---

### Route: `/robots.txt` (Robots Directives)
- **Purpose**: Crawler guidelines and sitemap declaration.
- **Required Content**:
  - `User-Agent: *`
  - `Allow: /`
  - `Disallow: /api/`
  - `Sitemap: <dynamic-origin>/sitemap.xml`
- **Dynamic Origin**:
  - Dynamically computes sitemap URL based on current host.

---

### Route: `not-found` (404 Page)
- **Purpose**: Friendly recovery interface when a route or resource does not exist.
- **Required Content**:
  - Clear `404` code indicator.
  - Human-friendly explanation.
  - Navigation buttons returning to Home (`/`) and Blog (`/blog`).
- **Shared UI Pieces**:
  - Main layout Header and Footer.

---

## 2. Module Handoff Checklist

This section defines the responsibilities, dependencies, data contracts, and missing-data fallbacks for all shared application modules.

---

### Module 1: `PostCard` (`components/PostCard.tsx`)
- **What Page(s) Use It**:
  - `/` (Home Page: featured and recent grids)
  - `/blog` & `/blog/page/[page]` (Archive pages)
  - `/blog/[slug]` (Related posts section)
  - `/category/[slug]` & `/category/[slug]/page/[page]`
  - `/tag/[slug]`
  - `/author/[id]` & `/author/[id]/page/[page]`
  - `/search`
  - `/filter-demo`
- **What Data Must Exist**:
  - `post.title` (string)
  - `post.slug` (string)
  - `post.excerpt` (string)
  - `post.publishedAt` (Date or ISO string)
  - `post.author.name` (string)
  - `post.author.slug` (string)
  - `post.categories` (Array of `{ category: { name, slug } }`)
  - `post.tags` (Array of `{ tag: { name, slug } }`)
- **What the User Sees If It Is Missing**:
  - `post.coverImage`: Image element is omitted; card renders in text-first layout with no broken image box.
  - `post.author.avatarUrl`: Uses text link with author name.
  - Empty `categories`: Omits category pill badge.
  - Empty `tags`: Omits tag list.
- **Handled by Shared Layout vs. Page**:
  - **Shared Layout**: Global typography, badge pill styles (`.badge`, `.badge-category`), CSS variables (`--color-surface`, `--color-border`).
  - **Page**: Controls grid sizing (e.g. `.featured-grid` vs. `.posts-grid`).

---

### Module 2: `Pagination` (`components/Pagination.tsx`)
- **What Page(s) Use It**:
  - `/blog` & `/blog/page/[page]`
  - `/category/[slug]` & `/category/[slug]/page/[page]`
  - `/author/[id]` & `/author/[id]/page/[page]`
- **What Data Must Exist**:
  - `currentPage` (number >= 1)
  - `totalPages` (number >= 1)
  - `basePath` (string, e.g. `/blog/page` or `/category/tech/page`)
- **What the User Sees If It Is Missing**:
  - If `totalPages <= 1`: Component returns `null` and renders nothing (clean DOM with no unnecessary controls).
  - If on page 1: `← Previous` is disabled (`pointer-events: none`, muted opacity).
  - If on last page: `Next →` is disabled.
- **Handled by Shared Layout vs. Page**:
  - **Shared Layout**: `.pagination`, `.pagination-btn`, `.active` styles and flex layout.
  - **Page**: Calculates `currentPage` and `totalPages` from database queries and passes them to `Pagination`.

---

### Module 3: `FilterDemoClient` (`app/filter-demo/FilterDemoClient.tsx`)
- **What Page(s) Use It**:
  - `/filter-demo` exclusively.
- **What Data Must Exist**:
  - `initialPosts`: Array of serialized posts.
  - `categories`: Array of `{ id, name, slug }`.
  - `tags`: Array of `{ id, name, slug }`.
- **What the User Sees If It Is Missing**:
  - If no posts match active filters: Renders custom empty state with a reset button.
  - If category list is empty: Category filter bar is not displayed.
- **Handled by Shared Layout vs. Page**:
  - **Shared Layout**: Header, footer, global CSS.
  - **Page**: Fetches raw data on the server; client component handles UI state and filtering logic.

---

### Module 4: Shared Layout (`app/layout.tsx` & `app/globals.css`)
- **What Page(s) Use It**:
  - **All routes** across the entire application.
- **What Data Must Exist**:
  - Global CSS tokens (`--color-background`, `--color-surface`, `--color-primary`, `--font-sans`, `--font-mono`).
- **What the User Sees If It Is Missing**:
  - If database is down: Global navigation, branding header, search icon, and footer remain completely intact and styled.
- **Handled by Shared Layout vs. Page**:
  - **Shared Layout**:
    - HTML shell, `<head>`, metadata base, fonts.
    - Top sticky navigation bar (`⚡ DevPulse`, Home, Blog, About, Contact, Search button).
    - Bottom footer (categorized link columns, RSS feed link, sitemap link, copyright).
  - **Page**:
    - All inner content inside `<main id="main-content">`.

---

### Module 5: Dynamic Base URL Resolver (`lib/site.ts`)
- **What Page(s) Use It**:
  - `app/sitemap.ts`
  - `app/robots.ts`
  - `app/feed.xml/route.ts`
- **What Data Must Exist**:
  - No hard dependencies. Dynamically checks:
    1. `process.env.NEXT_PUBLIC_SITE_URL` / `process.env.SITE_URL`
    2. Vercel deployment variables
    3. Incoming request headers (`host`, `x-forwarded-host`, `x-forwarded-proto`)
    4. Fallback: `http://localhost:3000`
- **What the User Sees If It Is Missing**:
  - Gracefully falls back to `http://localhost:3000` if headers are inaccessible.
- **Handled by Shared Layout vs. Page**:
  - Completely server-side utility layer with zero client bundle impact.

---

### Module 6: Query Layer (`lib/queries.ts`)
- **What Page(s) Use It**:
  - All Server Components across the application.
- **What Data Must Exist**:
  - SQLite database `prisma/dev.db` with populated schema tables.
- **What the User Sees If It Is Missing**:
  - Missing entities trigger explicit `notFound()` or empty state UI blocks rather than runtime errors.
  - `getAuthorByIdOrSlug` handles both numeric IDs and slug strings seamlessly.
- **Handled by Shared Layout vs. Page**:
  - Server-side data fetching layer only.

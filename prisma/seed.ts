import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ── Authors ──────────────────────────────────────────────────────────────
  const alice = await prisma.author.upsert({
    where: { slug: "alice-morgan" },
    update: {},
    create: {
      name: "Alice Morgan",
      slug: "alice-morgan",
      bio: "Senior software engineer and open-source contributor with a passion for distributed systems.",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
      email: "alice@example.com",
      website: "https://alicemorgan.dev",
    },
  });

  const bob = await prisma.author.upsert({
    where: { slug: "bob-chen" },
    update: {},
    create: {
      name: "Bob Chen",
      slug: "bob-chen",
      bio: "Full-stack developer, tech writer, and coffee connoisseur. Loves React and GraphQL.",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      email: "bob@example.com",
      website: "https://bobchen.io",
    },
  });

  const carol = await prisma.author.upsert({
    where: { slug: "carol-james" },
    update: {},
    create: {
      name: "Carol James",
      slug: "carol-james",
      bio: "UI/UX designer turned developer. Writes about accessibility, CSS, and design systems.",
      avatarUrl: "https://i.pravatar.cc/150?img=32",
      email: "carol@example.com",
    },
  });

  // ── Categories ────────────────────────────────────────────────────────────
  const catTech = await prisma.category.upsert({
    where: { slug: "technology" },
    update: {},
    create: { name: "Technology", slug: "technology", description: "Deep-dives into software, hardware, and the web." },
  });

  const catDesign = await prisma.category.upsert({
    where: { slug: "design" },
    update: {},
    create: { name: "Design", slug: "design", description: "UI/UX, typography, and visual design principles." },
  });

  const catDevOps = await prisma.category.upsert({
    where: { slug: "devops" },
    update: {},
    create: { name: "DevOps", slug: "devops", description: "CI/CD, containers, and infrastructure as code." },
  });

  const catCareer = await prisma.category.upsert({
    where: { slug: "career" },
    update: {},
    create: { name: "Career", slug: "career", description: "Advice on growing as a developer." },
  });

  const catAI = await prisma.category.upsert({
    where: { slug: "ai" },
    update: {},
    create: { name: "AI & ML", slug: "ai", description: "Machine learning, LLMs, and AI engineering." },
  });

  // ── Tags ──────────────────────────────────────────────────────────────────
  const tagReact = await prisma.tag.upsert({ where: { slug: "react" }, update: {}, create: { name: "React", slug: "react" } });
  const tagNextjs = await prisma.tag.upsert({ where: { slug: "nextjs" }, update: {}, create: { name: "Next.js", slug: "nextjs" } });
  const tagTypeScript = await prisma.tag.upsert({ where: { slug: "typescript" }, update: {}, create: { name: "TypeScript", slug: "typescript" } });
  const tagDocker = await prisma.tag.upsert({ where: { slug: "docker" }, update: {}, create: { name: "Docker", slug: "docker" } });
  const tagCSS = await prisma.tag.upsert({ where: { slug: "css" }, update: {}, create: { name: "CSS", slug: "css" } });
  const tagGraphQL = await prisma.tag.upsert({ where: { slug: "graphql" }, update: {}, create: { name: "GraphQL", slug: "graphql" } });
  const tagPrisma = await prisma.tag.upsert({ where: { slug: "prisma" }, update: {}, create: { name: "Prisma", slug: "prisma" } });
  const tagLLM = await prisma.tag.upsert({ where: { slug: "llm" }, update: {}, create: { name: "LLM", slug: "llm" } });
  const tagPerf = await prisma.tag.upsert({ where: { slug: "performance" }, update: {}, create: { name: "Performance", slug: "performance" } });
  const tagA11y = await prisma.tag.upsert({ where: { slug: "accessibility" }, update: {}, create: { name: "Accessibility", slug: "accessibility" } });

  // ── Posts ─────────────────────────────────────────────────────────────────
  const postsData = [
    {
      title: "Building Scalable APIs with Next.js App Router",
      slug: "building-scalable-apis-nextjs-app-router",
      excerpt: "Learn how the App Router changes the way we architect APIs in Next.js 14 and beyond.",
      content: `## Introduction\n\nThe App Router is a paradigm shift in how Next.js applications are structured. In this article we explore route handlers, server actions, and how to wire them up with Prisma for a type-safe backend.\n\n## Route Handlers\n\nRoute Handlers live in \`app/api/**/route.ts\` and support all HTTP verbs. They run on the Edge or Node.js runtimes.\n\n\`\`\`ts\nexport async function GET(request: Request) {\n  const posts = await prisma.post.findMany();\n  return Response.json(posts);\n}\n\`\`\`\n\n## Server Actions\n\nServer Actions allow you to mutate data from Server Components without a separate API endpoint.\n\n## Conclusion\n\nThe App Router is powerful. Combine it with Prisma and you get a full-stack framework with minimal ceremony.`,
      coverImage: "https://picsum.photos/seed/api-router/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-09-01"),
      authorId: alice.id,
      categories: [catTech.id, catDevOps.id],
      tags: [tagNextjs.id, tagReact.id, tagTypeScript.id, tagPrisma.id],
    },
    {
      title: "TypeScript Generics: A Deep Dive",
      slug: "typescript-generics-deep-dive",
      excerpt: "Generics are the superpower of TypeScript. Here is everything you need to master them.",
      content: `## Why Generics?\n\nGenerics allow you to write reusable, type-safe utilities. Without them you'd resort to \`any\` and lose all type information.\n\n## Basic Syntax\n\n\`\`\`ts\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\`\`\`\n\n## Constraints\n\nUse \`extends\` to constrain a generic parameter:\n\n\`\`\`ts\nfunction getLength<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}\n\`\`\`\n\n## Conclusion\n\nGenerics are fundamental to writing expressive TypeScript. Practice them every day.`,
      coverImage: "https://picsum.photos/seed/typescript-generics/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-09-05"),
      authorId: bob.id,
      categories: [catTech.id],
      tags: [tagTypeScript.id, tagReact.id],
    },
    {
      title: "Designing Accessible Color Systems",
      slug: "designing-accessible-color-systems",
      excerpt: "Color contrast, semantic tokens, and how to build a palette that passes WCAG 2.2 AA.",
      content: `## The Basics\n\nAccessible color design starts with contrast ratios. WCAG 2.2 requires 4.5:1 for normal text and 3:1 for large text.\n\n## Semantic Tokens\n\nInstead of hardcoding \`#2563EB\`, alias it as \`color.action.primary\`. This lets themes swap values without touching component code.\n\n## Tools\n\n- Contrast: Polypane, Colour Contrast Analyser\n- Palette generation: Radix Colors, Tailwind Palette\n\n## Conclusion\n\nA11y is not an afterthought. Build for it from day one.`,
      coverImage: "https://picsum.photos/seed/color-a11y/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-09-08"),
      authorId: carol.id,
      categories: [catDesign.id],
      tags: [tagCSS.id, tagA11y.id],
    },
    {
      title: "Docker Compose for Local Development",
      slug: "docker-compose-local-development",
      excerpt: "Stop saying 'it works on my machine'. Docker Compose creates reproducible local environments in minutes.",
      content: `## Why Docker Compose?\n\nDocker Compose lets you define multi-container applications in a single \`docker-compose.yml\`. Databases, caches, and your app run together.\n\n## A Simple Setup\n\n\`\`\`yaml\nservices:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret\n  app:\n    build: .\n    ports:\n      - '3000:3000'\n    depends_on:\n      - db\n\`\`\`\n\n## Conclusion\n\nEvery project deserves a \`docker-compose.yml\`. Add it once, share it forever.`,
      coverImage: "https://picsum.photos/seed/docker-compose/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-09-12"),
      authorId: alice.id,
      categories: [catDevOps.id],
      tags: [tagDocker.id],
    },
    {
      title: "GraphQL vs REST: When to Choose What",
      slug: "graphql-vs-rest",
      excerpt: "An honest comparison of the two most popular API paradigms for modern web apps.",
      content: `## REST\n\nREST is simple, cache-friendly, and well-understood. It's the right default for most APIs.\n\n## GraphQL\n\nGraphQL shines when clients need flexible queries over complex, interrelated data. It eliminates over-fetching.\n\n## Decision Matrix\n\n| Criteria | REST | GraphQL |\n|---|---|---|\n| Simplicity | ✅ | ⚠️ |\n| Flexibility | ⚠️ | ✅ |\n| Caching | ✅ | ⚠️ |\n\n## Conclusion\n\nUse REST by default. Reach for GraphQL when your data graph is complex.`,
      coverImage: "https://picsum.photos/seed/graphql-rest/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-09-15"),
      authorId: bob.id,
      categories: [catTech.id],
      tags: [tagGraphQL.id, tagTypeScript.id],
    },
    {
      title: "CSS Grid vs Flexbox: A Practical Guide",
      slug: "css-grid-vs-flexbox",
      excerpt: "Both layout systems are powerful. This guide shows you when to reach for each one.",
      content: `## Flexbox\n\nFlex is one-dimensional. Use it for rows or columns of items.\n\n## Grid\n\nGrid is two-dimensional. Use it for page layouts.\n\n## A Simple Rule\n\n- Component internals? → Flex\n- Page layout? → Grid\n- Complex component? → Grid\n\n## Conclusion\n\nYou don't have to choose one, use both contextually.`,
      coverImage: "https://picsum.photos/seed/css-grid/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-09-19"),
      authorId: carol.id,
      categories: [catDesign.id],
      tags: [tagCSS.id],
    },
    {
      title: "Getting Started with LLMs in Production",
      slug: "llms-in-production",
      excerpt: "RAG, prompt engineering, and evaluation frameworks for shipping reliable LLM features.",
      content: `## The Challenge\n\nLLMs are probabilistic. Productionising them requires guardrails, evals, and solid fallback handling.\n\n## RAG\n\nRetrieval-Augmented Generation grounds the model in your data by injecting relevant documents at inference time.\n\n## Prompt Engineering\n\n- Be explicit about output format.\n- Provide few-shot examples.\n- Include a system prompt with persona and constraints.\n\n## Evaluation\n\nUse frameworks like LangSmith or PromptFoo to run regression evals on every prompt change.\n\n## Conclusion\n\nStart with a thin prototype. Instrument it heavily. Iterate with data.`,
      coverImage: "https://picsum.photos/seed/llm-prod/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-09-22"),
      authorId: alice.id,
      categories: [catAI.id, catTech.id],
      tags: [tagLLM.id, tagTypeScript.id],
    },
    {
      title: "10 Tips to Level Up Your Developer Career",
      slug: "level-up-developer-career",
      excerpt: "Practical advice for junior and mid-level developers who want to grow faster.",
      content: `## 1. Write Every Day\n\nCode, yes, but also write prose. Blogs, RFCs, and PR descriptions sharpen thinking.\n\n## 2. Read Source Code\n\nPick a library you use daily and read its source. You'll learn more than any tutorial.\n\n## 3. Specialize, Then Generalize\n\nBecome very good at one thing first, then expand. T-shaped skills are in demand.\n\n## 4. Build in Public\n\nShare your work on GitHub and Twitter. Feedback accelerates growth.\n\n## 5. Review Other People's PRs\n\nCode review is the highest-leverage activity in a team.\n\n## Conclusion\n\nCareer growth is a marathon. Focus on compounding small improvements every day.`,
      coverImage: "https://picsum.photos/seed/career-tips/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-09-25"),
      authorId: bob.id,
      categories: [catCareer.id],
      tags: [tagTypeScript.id],
    },
    {
      title: "Web Performance: Core Web Vitals Explained",
      slug: "web-performance-core-web-vitals",
      excerpt: "LCP, INP, and CLS demystified with actionable fixes for each metric.",
      content: `## LCP – Largest Contentful Paint\n\nMeasures loading performance. Target: < 2.5s. Fix: preload hero images, use CDN.\n\n## INP – Interaction to Next Paint\n\nReplaced FID in 2024. Measures responsiveness. Target: < 200ms. Fix: break up long tasks.\n\n## CLS – Cumulative Layout Shift\n\nMeasures visual stability. Target: < 0.1. Fix: set explicit dimensions on images and iframes.\n\n## Tooling\n\n- Lighthouse (CI + local)\n- PageSpeed Insights\n- Chrome UX Report\n\n## Conclusion\n\nCore Web Vitals directly impact SEO rankings. Make them a first-class concern.`,
      coverImage: "https://picsum.photos/seed/core-web-vitals/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-09-28"),
      authorId: carol.id,
      categories: [catTech.id, catDesign.id],
      tags: [tagPerf.id, tagCSS.id],
    },
    {
      title: "Prisma ORM: From Zero to Production",
      slug: "prisma-orm-zero-to-production",
      excerpt: "Schema design, migrations, seeding, and query optimisation with Prisma Client.",
      content: `## Schema Design\n\nStart with your data model. Relations should reflect your domain, not your database.\n\n## Migrations\n\n\`\`\`bash\nnpx prisma migrate dev --name init\n\`\`\`\n\n## Query Optimisation\n\n- Use \`select\` to avoid over-fetching.\n- Add indexes on frequently filtered fields.\n- Use \`include\` sparingly; prefer flat queries.\n\n## Conclusion\n\nPrisma is the best DX you'll find in the Node.js ORM space. Use it.`,
      coverImage: "https://picsum.photos/seed/prisma-prod/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-01"),
      authorId: alice.id,
      categories: [catTech.id, catDevOps.id],
      tags: [tagPrisma.id, tagTypeScript.id, tagDocker.id],
    },
    {
      title: "Building a Design System from Scratch",
      slug: "building-design-system",
      excerpt: "Tokens, components, documentation: everything you need to build a robust design system.",
      content: `## What is a Design System?\n\nA design system is a collection of reusable components guided by clear standards.\n\n## Step 1: Define Tokens\n\nColor, typography, spacing, shadow: capture these as design tokens first.\n\n## Step 2: Build Primitives\n\nButton, Input, Typography, Icon. These are the atoms.\n\n## Step 3: Document\n\nUse Storybook or Ladle to showcase every component with its API.\n\n## Conclusion\n\nA design system is a product. Treat it like one.`,
      coverImage: "https://picsum.photos/seed/design-system/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-03"),
      authorId: carol.id,
      categories: [catDesign.id],
      tags: [tagCSS.id, tagReact.id, tagA11y.id],
    },
    {
      title: "CI/CD Pipelines with GitHub Actions",
      slug: "cicd-github-actions",
      excerpt: "Automate your build, test, and deploy pipeline with GitHub Actions workflows.",
      content: `## Basics\n\nGitHub Actions triggers on events (push, PR, schedule). Each workflow is a YAML file in \`.github/workflows/\`.\n\n## A Minimal Pipeline\n\n\`\`\`yaml\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n\`\`\`\n\n## Deployment\n\nUse environment secrets and deployment gates for production safety.\n\n## Conclusion\n\nAutomation pays dividends. Set up CI on day one.`,
      coverImage: "https://picsum.photos/seed/github-actions/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-05"),
      authorId: bob.id,
      categories: [catDevOps.id],
      tags: [tagDocker.id, tagTypeScript.id],
    },
    {
      title: "Mastering React Server Components & Streaming",
      slug: "mastering-react-server-components-streaming",
      excerpt: "How streaming SSR and Suspense boundaries reduce Time to First Byte and elevate UX.",
      content: `## The Evolution of React Rendering\n\nReact Server Components allow you to run rendering logic exclusively on the server, sending zero JavaScript to the client for purely static chunks.\n\n## Streaming with Suspense\n\nWrap slow data queries in \`<Suspense fallback={<Skeleton />}>\` to stream HTML progressive chunks as soon as they resolve.\n\n## Conclusion\n\nRSC unlocks smaller client bundles and instant progressive loading.`,
      coverImage: "https://picsum.photos/seed/react-rsc/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-10-06"),
      authorId: alice.id,
      categories: [catTech.id],
      tags: [tagReact.id, tagNextjs.id],
    },
    {
      title: "Understanding Modern CSS with Container Queries",
      slug: "modern-css-container-queries",
      excerpt: "Style components based on their parent container rather than the global viewport width.",
      content: `## Beyond Media Queries\n\nMedia queries only know about viewport size. Container queries allow a component to know its own allocated space regardless of where it is mounted.\n\n\`\`\`css\n.card-container {\n  container-type: inline-size;\n}\n\n@container (min-width: 400px) {\n  .card { display: flex; }\n}\n\`\`\`\n\n## Conclusion\n\nContainer queries make your design system truly modular and reusable.`,
      coverImage: "https://picsum.photos/seed/container-queries/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-07"),
      authorId: carol.id,
      categories: [catTech.id, catDesign.id],
      tags: [tagCSS.id],
    },
    {
      title: "Micro-Frontends in 2026: Architecture & Pitfalls",
      slug: "micro-frontends-architecture-pitfalls",
      excerpt: "When does decomposing your frontend monolith make sense, and what operational toll does it demand?",
      content: `## Why Micro-Frontends?\n\nLarge engineering organizations need independent team velocity. Micro-frontends decouple deployment lifecycles.\n\n## The Tradeoffs\n\n- Dependency divergence\n- Shared styling and state management complexity\n- Routing and orchestration overhead\n\n## Conclusion\n\nOnly adopt micro-frontends when team scale demands it, not purely for technical curiosity.`,
      coverImage: "https://picsum.photos/seed/micro-frontends/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-08"),
      authorId: bob.id,
      categories: [catTech.id],
      tags: [tagTypeScript.id, tagReact.id],
    },
    // Alice Post 6
    {
      title: "Event-Driven Architecture with Kafka & Node.js",
      slug: "event-driven-architecture-kafka-nodejs",
      excerpt: "Designing resilient distributed event processing pipelines using Apache Kafka and TypeScript.",
      content: `## Event-Driven Systems\n\nDecouple services by publishing immutable events to shared topics.\n\n## Producers and Consumers\n\nUse librdkafka or KafkaJS with strict message schemas (Protobuf/Avro) for contract consistency.\n\n## Conclusion\n\nEvent streaming gives you real-time scalability when properly partitioned.`,
      coverImage: "https://picsum.photos/seed/kafka-node/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-09"),
      authorId: alice.id,
      categories: [catDevOps.id, catTech.id],
      tags: [tagDocker.id, tagTypeScript.id],
    },
    // Alice Post 7 (Enables Alice Page 2)
    {
      title: "Zero-Downtime Database Migrations in Kubernetes",
      slug: "zero-downtime-database-migrations-kubernetes",
      excerpt: "The expand-and-contract pattern for schema upgrades without disconnecting users.",
      content: `## The Expand and Contract Pattern\n\nNever delete or rename columns in a single step. First add the new column, dual-write, backfill, and finally drop the old column.\n\n## Kubernetes Jobs\n\nRun pre-sync migration jobs before rolling updates to pod deployments.\n\n## Conclusion\n\nZero downtime requires disciplined backward-compatible schema iterations.`,
      coverImage: "https://picsum.photos/seed/zero-downtime/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-10-10"),
      authorId: alice.id,
      categories: [catDevOps.id],
      tags: [tagDocker.id, tagPrisma.id],
    },
    // Bob Post 6
    {
      title: "Mastering State Machines in React with XState",
      slug: "state-machines-react-xstate",
      excerpt: "Eliminate impossible UI states by modeling complex workflows as finite state machines.",
      content: `## Why State Machines?\n\nBoolean flags like \`isLoading\`, \`isError\`, and \`isSuccess\` create impossible combinations. State machines guarantee explicit transitions.\n\n## Implementation\n\nUse XState v5 with React hooks for robust multi-step wizards and checkout flows.\n\n## Conclusion\n\nPredictable UI state starts with mathematical state machines.`,
      coverImage: "https://picsum.photos/seed/xstate-react/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-11"),
      authorId: bob.id,
      categories: [catTech.id],
      tags: [tagReact.id, tagTypeScript.id],
    },
    // Bob Post 7 (Enables Bob Page 2)
    {
      title: "Effective Technical Writing for Software Engineers",
      slug: "effective-technical-writing-engineers",
      excerpt: "How to communicate complex technical concepts clearly in documentation, RFCs, and blog posts.",
      content: `## Audience First\n\nKnow who you are writing for before typing a single sentence. Adjust depth and jargon accordingly.\n\n## Structure & Clarity\n\n- Start with the 'why' before the 'how'.\n- Use diagrams and visual code snippets.\n- Keep paragraphs under 4 sentences.\n\n## Conclusion\n\nWriting is an engineering multiplier that drives career influence.`,
      coverImage: "https://picsum.photos/seed/tech-writing/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-12"),
      authorId: bob.id,
      categories: [catCareer.id],
      tags: [tagTypeScript.id],
    },
    // Carol Post 6
    {
      title: "Fluid Typography with CSS Clamp & Viewport Units",
      slug: "fluid-typography-css-clamp",
      excerpt: "How to create responsive typography scales that adapt smoothly without breakpoint jumps.",
      content: `## The Power of clamp()\n\n\`clamp(min, preferred, max)\` allows font sizes to interpolate fluidly between screen widths.\n\n\`\`\`css\nh1 {\n  font-size: clamp(2rem, 1.5rem + 2.5vw, 4rem);\n}\n\`\`\`\n\n## Accessibility Considerations\n\nAlways respect user browser zoom and rem-based root sizing.\n\n## Conclusion\n\nFluid typography removes hundreds of lines of media query boilerplate.`,
      coverImage: "https://picsum.photos/seed/fluid-typography/800/450",
      featured: false,
      published: true,
      publishedAt: new Date("2026-10-13"),
      authorId: carol.id,
      categories: [catDesign.id],
      tags: [tagCSS.id],
    },
    // Carol Post 7 (Enables Carol Page 2)
    {
      title: "Building Dark Mode with CSS Custom Properties",
      slug: "dark-mode-css-custom-properties",
      excerpt: "Creating a seamless dark theme toggle with system preference detection and zero layout shift.",
      content: `## Design Tokens with CSS Variables\n\nDefine semantic variables like \`--color-surface\` and \`--color-text\` for both light and dark themes.\n\n## Media Query Integration\n\nUse \`@media (prefers-color-scheme: dark)\` combined with a data attribute override.\n\n## Conclusion\n\nCSS custom properties make theme switching instant and flicker-free.`,
      coverImage: "https://picsum.photos/seed/dark-mode/800/450",
      featured: true,
      published: true,
      publishedAt: new Date("2026-10-14"),
      authorId: carol.id,
      categories: [catDesign.id],
      tags: [tagCSS.id, tagA11y.id],
    },
  ];

  for (const postData of postsData) {
    const { categories, tags, authorId, ...rest } = postData;
    await prisma.post.upsert({
      where: { slug: rest.slug },
      update: {},
      create: {
        ...rest,
        authorId,
        categories: {
          create: categories.map((categoryId) => ({ categoryId })),
        },
        tags: {
          create: tags.map((tagId) => ({ tagId })),
        },
      },
    });
  }

  // ── Generic Pages ─────────────────────────────────────────────────────────
  const pages = [
    {
      title: "About Us",
      slug: "about",
      metaDesc: "Learn about the team behind this blog.",
      content: `## Who We Are\n\nWe are a small team of engineers and designers passionate about sharing knowledge. Founded in 2023, we publish technical articles, tutorials, and career advice every week.\n\n## Our Mission\n\nMake high-quality technical education accessible to every developer, regardless of background or experience level.\n\n## The Team\n\nWe have three core authors: Alice, Bob, and Carol, backed by a community of guest contributors.\n\n## Contact\n\nReach us at hello@example.com or on Twitter @example.`,
    },
    {
      title: "Contact",
      slug: "contact",
      metaDesc: "Get in touch with us.",
      content: `## Get in Touch\n\nWe love hearing from our readers. Whether you have a question, a suggestion for a future article, or just want to say hi, drop us a line.\n\n**Email**: hello@example.com\n\n**Twitter**: @example\n\n**GitHub**: github.com/example\n\n## Guest Posts\n\nInterested in writing for us? Send a pitch to pitch@example.com with a brief outline and two writing samples.`,
    },
    {
      title: "Privacy Policy",
      slug: "privacy",
      metaDesc: "Read our privacy policy.",
      content: `## Privacy Policy\n\n*Last updated: October 2026*\n\nWe take your privacy seriously. This policy explains what data we collect, how we use it, and your rights.\n\n## Data We Collect\n\n- **Usage data**: Page views, session duration (via privacy-first analytics).\n- **Contact info**: Only if you reach out to us directly.\n\n## Cookies\n\nWe use strictly necessary cookies only. No third-party advertising cookies.\n\n## Your Rights\n\nYou can request deletion of any personal data by emailing privacy@example.com.`,
    },
    {
      title: "Terms of Service",
      slug: "terms",
      metaDesc: "Our terms of service.",
      content: `## Terms of Service\n\n*Last updated: October 2026*\n\nBy accessing this site you agree to these terms.\n\n## Content\n\nAll articles are published under the Creative Commons Attribution 4.0 license unless otherwise noted.\n\n## Liability\n\nContent is provided for educational purposes only. We make no warranties about accuracy.\n\n## Changes\n\nWe may update these terms at any time. Continued use constitutes acceptance.`,
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export const site = "https://www.outrank.so";
export const asset = (folder: string, name: string) => `/assets/outrank/${folder}/${name}`;
export const signup = `${site}/signin`;

export const nav = [
  ["How it works", "/#howitworks"],
  ["AI Visibility", `${site}/ai-visibility`],
  ["Case Studies", `${site}/case-studies`],
  ["Pricing", `${site}/pricing`],
] as const;

export const stories = [
  { quote: "Our DR went from 13 to 36 in 4 months, our traffic doubled", person: "Lorenzo Nicolini", role: "Founder Moonb", brand: "Moonb", url: `${site}/success-stories/moonb`, image: "story-1.webp", portrait: "moonb-rp.png" },
  { quote: "The biggest visible shift: our brand started getting picked up in AI answers", person: "Aidan Cramer", role: "Co Founder aiapply.co", brand: "aiapply.co", url: `${site}/success-stories/aiapply`, image: "story-2.webp", portrait: "AIApply-rp-.png" },
  { quote: "Cutting client SEO time from 40-50 hours to a streamlined content process", person: "Olaf van Gastel", role: "Founder Bright Brands", brand: "Bright Brands", url: `${site}/success-stories/bright-brands`, image: "story-3.webp", portrait: "bright-brands-rp.jpg" },
  { quote: "We publish more pages per client, see faster indexing.", person: "Patrick Leth", role: "Partner Vækster Media ApS Vækster", brand: "Vækster", url: `${site}/success-stories/v-kster`, image: "story-4.webp", portrait: "V-kster-rp.jpg" },
];

export const cases = [
  { name: "Life Purpose App", category: "Solo founder", metric: "4.5×", measure: "Google clicks, May 2026 vs May 2025", title: "Years of flat traffic, then 4.5× more clicks in a year", author: "Martin Adams", logo: "Life-Purpose-App.png", portrait: "Life-Purpose-App-rp.jpg", url: `${site}/case-studies/life-purpose-app` },
  { name: "Moonb", category: "Creative agency", metric: "22 → 43", measure: "Domain Rating on Ahrefs", title: "From no SEO strategy to 2,213 AI citations", author: "Lorenzo Nicolini", logo: "moonb-logo.png", portrait: "moonb-rp.png", url: `${site}/case-studies/moonb` },
  { name: "24hourEDU", category: "Online education", metric: "1.2 → 30", measure: "Domain Rating on Ahrefs", title: "A brand-new domain, from DR 1.2 to DR 30", author: "Jesse Kennedy", logo: "24hourEDU-logo.png", portrait: "24HourEDU-rp.png", url: `${site}/case-studies/24houredu` },
];

export const steps = [
  { title: "Deep analysis & your 30-day plan", text: "We explore your niche, competitors, and audience to uncover high-traffic, low-competition keywords - then build a strategic content plan, one key phrase per day.", image: "how-1-plan.webp" },
  { title: "Ranking content, published daily", text: "We create and publish SEO-optimized articles from your plan every day. Your blog grows automatically while you focus on your business.", image: "how-2-published.webp" },
  { title: "Authority that makes it rank", text: "Your articles get published and ranked - and we also get your pages referenced on relevant sites in your niche, building the authority that keeps them climbing.", image: "how-3-authority.webp" },
];

export const features = [
  { title: "Automate SEO analysis and keyword research", text: "Analyze and find the best keywords in your niche. Create quality articles daily matching your business goals. Generate keywords yourself anytime.", image: "feature-1.webp" },
  { title: "Create content that naturally ranks", text: "Get SEO-ready articles that read naturally, based on powerful keywords. Every piece automatically includes strategic internal or external links.", image: "feature-2.webp" },
  { title: "Write articles that sound like you", text: "Create articles that follow your established content style. Share your published pieces and watch us match your unique voice.", image: "feature-3.webp" },
  { title: "Generate on-brand images", text: "Enrich articles with unique visuals. Choose styles and add brand colors. We auto-insert them into content & as featured images.", image: "feature-4.webp" },
];

export const backlinks = [
  { title: "We build the links for you", text: "Turn backlink building on once and Outrank keeps working. Our AI finds articles on other blogs that genuinely fit your topic and places a link to your website inside the copy. Every placement is checked.", image: "how-1-building.webp" },
  { title: "Track articles and results", text: "You can monitor where your links are referenced and see your domain authority grow. Track the number of backlinks received and their direct impact on your SEO rating.", image: "how-2.webp" },
  { title: "Your Domain Rating grows", text: "Quality backlinks increase your Domain Rating, directly boosting your business growth. Higher Domain Rating is the backbone of organic traffic - bringing more qualified visitors who convert into customers.", image: "how-3.webp" },
];

export const integrations = [
  ["WordPress", "Publish to any WP site", "wordpress"],
  ["Webflow", "Sync to CMS collections", "webflow"],
  ["Shopify", "Power store blogs", "shopify"],
  ["Framer", "Auto-publish to Framer", "framer"],
  ["Wix", "Push to Wix Blog", "wix"],
  ["Notion", "Fill Notion databases", "notion"],
  ["Ghost", "Native Ghost API", "ghost"],
  ["WordPress.com", "For hosted WP.com", "wordpress-com"],
  ["Webhook", "Connect anything", "webhook"],
  ["Next.js Blog", "SSR blog starter", "nextjs"],
] as const;

export const extras = [
  { title: "Research keywords in chat", text: "Chat with AI to brainstorm keywords, pull live search data, and drop your picks straight onto the content calendar.", image: "card-keyword-chat.webp" },
  { title: "Fix underperforming articles", text: "Outrank finds your underperforming articles and hands them to you - schedule the rewrite on your calendar whenever you like.", image: "card-improvements.webp" },
  { title: "Edit with AI or manually", text: "Ask AI to rewrite the text or regenerate an image, or edit it yourself. Change one line or the whole article, however you like.", image: "card-editing.webp" },
  { title: "Preview before it publishes", text: "Pre-create any scheduled article up to 7 days ahead. Review it, edit it, approve it - then let it auto-publish on its day.", image: "card-preview.webp" },
  { title: "Get mentioned in relevant content", text: "Your content gets referenced on relevant sites in your niche - every placement relevant and monitored.", image: "card-mentions.webp" },
  { title: "Set your publishing cadence", text: "Choose 8, 30, 60, or 90 articles a month, pick which days they go live, and scale up or down anytime.", image: "card-publish-v2.webp" },
  { title: "Turn products into content", text: "Built for e-commerce: Outrank writes articles around your real products and turns plain product photos into lifestyle images - so your store's content drives sales, not just traffic.", image: "ecommerce-card.webp" },
  { title: "Write in 150+ languages", text: "Generate SEO-ready articles in over 150 languages, each fluent and on-brand - reach every market you care about.", image: "card-languages.webp" },
  { title: "Manage sites with your team", text: "Run multiple sites from one dashboard and invite your whole team to collaborate - scale your content, not your headcount.", image: "card-team.webp" },
];

export const aiSeo = [
  { title: "How AI chooses what to recommend?", text: "When users ask questions to AI assistants, these tools scan web search results. Pages with better SEO rankings appear more often in AI responses.", images: ["ai-recomendation-1.webp", "ai-recomendation-2.webp"] },
  { title: "What we create for SEO?", text: "We create two types of content - articles and SEO tools based on keywords that work for your business. One well-researched article or SEO tool can appear in thousands of AI responses. It's strategic positioning for the AI era.", images: ["ai-recomendation-3.webp"] },
  { title: "Why it's important to start now?", text: "AI models form their preferences based on current search leaders. Those who build strong SEO today will get consistent AI recommendations for years ahead.", images: ["ai-recomendation-4.webp"] },
];

export const planIncludes = [
  "30 Articles a month generated and published on auto-pilot",
  "Unlimited Users in your Organization",
  "Auto Keyword Research made for you hands-free",
  "Connects to WordPress, Webflow, Shopify, Framer and more",
  "High DR Backlinks built for you on auto-pilot with automated backlink building",
  "AI Images generated in different styles",
  "Relevant YouTube videos integrated into articles",
  "Articles generated in 150+ languages",
  "Unlimited AI Rewrites",
  "Custom Features requests",
];

export const faqs = [
  ["How does the article automation work?", "The process is simple: you start by setting up your website's details, target audience, and content preferences. Our AI system then goes on autopilot, automatically generating one high-quality article every day. Each article is carefully crafted with SEO optimization in mind, includes relevant images, and maintains a natural, human-like tone. Once set up, the system works continuously to maintain a steady flow of fresh content for your website."],
  ["Will the content be SEO-friendly?", "Yes, our content is fully optimized for SEO. Each article includes SEO-optimized titles, meta descriptions, and naturally placed keywords throughout the content. We ensure proper heading structure (H2, H3) and maintain a minimum length of 1,200-1,700 words for comprehensive coverage. The system also supports internal linking and can incorporate external references to boost SEO value."],
  ["Can I manage multiple websites with your service?", "Yes! Each website gets its own dedicated setup with custom target audience settings and content preferences, maintaining the same high-quality content generation (30 articles per month per website). Volume discounts apply to your entire subscription: 2-4 websites save 10%, 5-19 websites save 15%, and 20+ websites save 20%."],
  ["What integrations do you support?", "We support a wide range of content platforms: WordPress, WordPress.com, Webflow, Notion, Wix, Shopify, and a custom API webhook. Each integration allows for automatic article publishing — the system handles the entire process from content generation to publication, and you can connect multiple platforms and manage all your content from a single dashboard."],
  ["Does it support other languages?", "Yes, our system supports multiple languages. You can specify your preferred language in the output settings, and the AI will generate content in that language. The system ensures the content maintains a natural, fluent tone in the chosen language while adhering to proper grammar and style guidelines."],
  ["How often are new articles generated?", "Our system can generate one high-quality article per day, with a monthly limit of 30 articles. Each article is thoroughly optimized and reviewed before publication. For trial users, articles include an Outrank watermark, while full subscribers receive unmarked content."],
  ["Can I purchase additional articles?", "Yes! On top of the standard 30 articles per month, you can upgrade to 60 or 90 articles per month. Simply click the \"Articles Plan\" badge in your Content Planner and select the desired plan. Upgrades take effect immediately."],
  ["Can I review articles before publication?", "Yes, you have full control over the content review process. When an article is generated, it's first saved as a draft in your chosen platform (WordPress, Webflow, etc.). You can then review, edit, or modify the draft directly in your platform's familiar interface before deciding to publish it. This gives you the flexibility to ensure each article meets your standards while maintaining your usual content workflow."],
  ["Can I generate unlimited keywords?", "Yes. There's no cap on keyword research - chat with our AI to brainstorm ideas, pull live search volume and difficulty data, and keep generating new sets until you find the perfect matches for your content."],
  ["Can my team work in Outrank together?", "Yes. You can invite multiple editors to your organization and collaborate on content together. Everyone works from the same dashboard, so your whole team can plan, review, and manage articles in one place."],
  ["What kind of support do you offer?", "Our team is here to help whenever you need it. Reach us via live chat or email for anything from setup and integrations to questions about your plan, and you'll get fast, expert assistance."],
] as const;

export const footerGroups = [
  { title: "Product", links: [["How it works", "/#howitworks"], ["Writing Examples", "/#examples"], ["Pricing", "/pricing"], ["Blog", "/blog"], ["Integrations", "/integrations"], ["E-commerce", "/shopify"], ["Directory Submission", "/directory-submission-service"], ["Build Backlinks", "/backlinks"], ["Monetize Your Blog", "/marketplace/publishers"], ["Get Mentioned by LLMs", "/get-mentioned-by-llms"], ["Human Curated", "/agency"], ["For Agencies", "/for-agencies"], ["AI Visibility", "/ai-visibility"], ["Tools Builder", "/tools-builder"], ["Case Studies", "/case-studies"], ["Do AI SEO Agents Work?", "/case-studies/do-ai-seo-agents-work"], ["SEO Statistics", "/statistics"], ["Success Stories", "/success-stories"], ["Shopify Success Stories", "/shopify-success-stories"]] },
  { title: "Documentations", links: [["Webhook Docs", "/docs/webhook"], ["Framer Docs", "/docs/framer"], ["Wordpress Docs", "/docs/wordpress"], ["Ghost Docs", "/docs/ghost"], ["Next.js Blog Docs", "/docs/nextjs-blog"], ["Improvements Docs", "/docs/improvements"], ["CLI for AI Agents", "https://www.npmjs.com/package/outrank-cli"], ["REST API", "/docs/api"], ["MCP Server", "/docs/mcp"]] },
  { title: "Compare", links: [["Outrank vs SEObot", "/compare/seobot"], ["Outrank vs Surfer SEO", "/compare/surfer-seo"], ["Outrank vs Jasper AI", "/compare/jasper-ai"], ["Outrank vs Frase", "/compare/frase"], ["Outrank vs Koala AI", "/compare/koala-ai"], ["All Comparisons", "/compare"], ["Outrank Alternatives", "/alternatives"]] },
  { title: "Company", links: [["Become Affiliate", "/affiliate-program"], ["AI Instructions + Information", "/ai-instructions"], ["Terms & Conditions", "/terms-of-use"], ["Privacy Policy", "/privacy-policy"]] },
  { title: "Free Tools", links: [["All Free Tools", "/tools"], ["SEO Tools", "/seotools"], ["SEO Audit", "/seo-audit"], ["SEO Competitor Analysis", "/seo-competitor-analysis"], ["Playbooks", "/playbooks"], ["Link Building Playbooks", "/link-building-playbooks"], ["Blog Keyword Generator", "/blog-keyword-generator"], ["Content Brief Generator", "/tools/content-brief-generator"], ["SEO Title Generator", "/tools/seo-title-generator"], ["CTA Generator", "/tools/cta-generator"], ["Blog Outline Generator", "/tools/blog-outline-generator"], ["Meta Description Generator", "/tools/meta-description-generator"], ["AI Article Summarizer", "/tools/ai-article-summarizer"], ["Headline Checker", "/tools/headline-checker"]] },
];

import { getRecentPosts } from "@/lib/queries";
import { getBaseUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const baseUrl = await getBaseUrl(request);
  const posts = await getRecentPosts(20);

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt).toUTCString();
      const url = `${baseUrl}/blog/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author.email ?? post.author.name}</author>
      ${post.categories.map(({ category }) => `<category><![CDATA[${category.name}]]></category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DevPulse</title>
    <link>${baseUrl}</link>
    <description>In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon.png</url>
      <title>DevPulse</title>
      <link>${baseUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

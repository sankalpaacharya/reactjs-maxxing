import { getAllPosts } from "@/lib/mdx-data";

const BASE_URL = "https://inside-react.vercel.app";

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const posts = getAllPosts();

    const items = posts
        .map((post) => {
            const url = `${BASE_URL}/blog/${post.slug}`;
            const pubDate = new Date(post.frontmatter.date).toUTCString();

            return `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.frontmatter.topic)}</category>
    </item>`;
        })
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Inside React | Sanku's Blog</title>
    <link>${BASE_URL}</link>
    <description>Deep dives into React internals, Fiber architecture, and modern web development</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${BASE_URL}/og-image.png</url>
      <title>Inside React | Sanku's Blog</title>
      <link>${BASE_URL}</link>
    </image>${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}

import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx-data";

// Force static generation - no edge function invocation
export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();

  return NextResponse.json(
    posts.map((post) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      topic: post.frontmatter.topic,
    }))
  );
}

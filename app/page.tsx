import Link from "next/link";
import { getAllPosts } from "@/lib/mdx-data";
import { PostsGrid, ContentWrapper } from "@/components/home/posts-list";
import { HeroSocials } from "@/components/home/hero-socials";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  // Fetch posts at build time / request time on server - NO client-side API call
  const allPosts = getAllPosts();
  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    topic: post.frontmatter.topic,
  }));

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="pt-6 pb-24 md:pt-12 md:pb-36">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground text-balance">
          Reactjs maxxing
        </h1>

        <p className="mt-7 max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed md:leading-relaxed">
          Where I dig into how React actually works under the hood: Fiber,
          reconciliation, and server components. Find me on <HeroSocials />{" "}
          where I share deep dives every week.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {posts.length > 0 && (
            <Link
              href={`/blog/${posts[0].slug}`}
              className="btn-raised px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all duration-150 hover:-translate-y-px active:translate-y-0.5 flex items-center gap-2"
            >
              Read the latest
              <span>→</span>
            </Link>
          )}
        </div>
      </section>

      <ContentWrapper>
        {posts.length === 0 ? (
          <p className="text-muted-foreground font-mono text-xs text-center mt-12">
            EMPTY
          </p>
        ) : (
          <PostsGrid posts={posts} />
        )}
      </ContentWrapper>
    </main>
  );
}

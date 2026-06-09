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
        <p className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed md:leading-relaxed">
          Hey, I&apos;m{" "}
          <span className="font-medium text-foreground">Sanku</span> — a developer
          who got a little obsessed with how React actually works under the
          hood. This is where I share deep dives into Fiber, reconciliation,
          server components, and the machinery behind the framework you use
          every day.
        </p>

        <div className="mt-4">
          <HeroSocials />
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

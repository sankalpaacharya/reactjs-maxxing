import { getAllPosts } from "@/lib/mdx-data";
import { PostsList, Banner, ContentWrapper } from "@/components/home/posts-list";

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
    <>
      {/* Banner */}
      <Banner />

      <main className="max-w-2xl mx-auto px-6 py-16">
        <ContentWrapper>
          {posts.length === 0 ? (
            <p className="text-muted-foreground font-mono text-xs text-center mt-12">
              EMPTY
            </p>
          ) : (
            <PostsList posts={posts} />
          )}
        </ContentWrapper>
      </main>
    </>
  );
}

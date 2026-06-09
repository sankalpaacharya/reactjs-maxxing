import Link from "next/link";
import { CardArt } from "@/components/blog/post-art";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string;
}

export function PostsList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between mb-8 border-b border-border/60 pb-2">
        <h1 className="text-2xl font-serif italic text-foreground/90">
          Contents
        </h1>
        <span className="font-mono text-[10px] text-muted-foreground mb-1">
          VOL. {posts.length.toString().padStart(2, "0")}
        </span>
      </div>

      {posts.map((post, index) => (
        <div key={post.slug} className="group">
          <Link
            href={`/blog/${post.slug}`}
            className="block w-full hover:opacity-100 opacity-80 transition-opacity"
          >
            {/* TOC Row */}
            <div className="flex items-start gap-3 py-3">
              <span className="shrink-0 font-mono text-xs text-muted-foreground w-6">
                {(index + 1).toString().padStart(2, "0")}.
              </span>

              <h2
                className="min-w-0 font-serif text-lg md:text-xl font-medium text-foreground italic leading-snug line-clamp-2 text-balance break-words transition-all"
                title={post.title}
              >
                {post.title}
              </h2>

              {/* Dotted Leader */}
              <span className="grow border-b border-dotted border-muted-foreground/30 mx-2 mt-[0.55rem] md:mt-[0.6rem]" />

              <span className="shrink-0 font-mono text-xs text-muted-foreground mt-[0.2rem] md:mt-[0.25rem]">
                {post.date}
              </span>
            </div>

            {/* Description — inline expand using grid for smooth height animation */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
              <div className="overflow-hidden">
                <div className="flex flex-col md:flex-row md:justify-between pl-9 pr-0 md:pr-14 pb-4 gap-3">
                  <p className="text-sm text-muted-foreground/80 max-w-lg leading-relaxed font-serif italic">
                    {post.description}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 shrink-0 pt-1">
                    {post.topic}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export function PostsGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <div>
      <div className="flex items-end justify-between mb-8 border-b border-border/60 pb-2">
        <h1 className="text-2xl font-serif italic text-foreground/90">
          Contents
        </h1>
        <span className="font-mono text-[10px] text-muted-foreground mb-1">
          VOL. {posts.length.toString().padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl bg-[#1a181c] p-3 transition-colors duration-200 hover:bg-[#211e25]"
          >
            {/* Framed cover: blue gradient background + animated motion graphic */}
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cover bg-center"
              style={{ backgroundImage: "url('/bluebackground.jpg')" }}
            >
              <CardArt slug={post.slug} />
              {/* Topic badge */}
              <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white ring-1 ring-inset ring-white/20 shadow-sm">
                {post.topic}
              </span>
            </div>

            {/* Meta + title below the image */}
            <div className="px-1 pt-4 pb-2">
              <div className="font-mono text-xs text-muted-foreground">
                <span className="text-foreground/70">{post.topic}</span>
                <span className="mx-1.5">·</span>
                {post.date}
              </div>
              <h2
                className="mt-2 text-lg font-semibold text-foreground leading-snug line-clamp-2 text-balance"
                title={post.title}
              >
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Banner() {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden">
      <img
        src="/Reactjs%20Maxxing.png"
        alt="reactjs maxxing banner"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-background" />
    </div>
  );
}

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}

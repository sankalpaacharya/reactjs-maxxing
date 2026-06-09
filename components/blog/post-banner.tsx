import { CardArt } from "./post-art";

/**
 * Hero banner shown at the top of a blog post — the blue gradient cover plus
 * the post's per-slug motion graphic, scaled up from the home-grid version.
 */
export function PostBanner({ slug, topic }: { slug: string; topic: string }) {
  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-cover bg-center ring-1 ring-inset ring-white/10 shadow-lg"
      style={{ backgroundImage: "url('/bluebackground.jpg')" }}
    >
      {/* Scale the motif up so it reads as a hero, not a thumbnail */}
      <div className="absolute inset-0 scale-[1.6]">
        <CardArt slug={slug} />
      </div>

      {/* Topic badge */}
      <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white ring-1 ring-inset ring-white/20 shadow-sm">
        {topic}
      </span>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PostsList({ posts }: { posts: PostMeta[] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="all"
        className="space-y-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-end justify-between mb-8 border-b border-border/60 pb-2">
          <h1 className="text-2xl font-serif italic text-foreground/90">
            Contents
          </h1>
          <span className="font-mono text-[10px] text-muted-foreground mb-1">
            VOL. {posts.length.toString().padStart(2, "0")}
          </span>
        </div>

        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            variants={item}
            className="group"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block w-full hover:opacity-100 opacity-80 transition-opacity"
            >
              {/* TOC Row */}
              <div className="flex items-baseline gap-3 py-3">
                <span className="shrink-0 font-mono text-xs text-muted-foreground w-6">
                  {(index + 1).toString().padStart(2, "0")}.
                </span>

                <h2 className="shrink-0 font-serif text-lg md:text-xl font-medium text-foreground italic transition-all">
                  {post.title}
                </h2>

                {/* Dotted Leader */}
                <span className="grow border-b border-dotted border-muted-foreground/30 mx-2" />

                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {post.date}
                </span>
              </div>

              {/* Description — inline expand using grid for smooth height animation */}
              <div
                className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out"
              >
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
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export function Banner() {
  return (
    <motion.div
      className="relative w-full h-48 md:h-64 overflow-hidden"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src="/image.png"
        alt="Blog Banner"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-background" />
    </motion.div>
  );
}

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

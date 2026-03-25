import fs from "fs";
import path from "path";
import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import { MockTweet } from "@/components/ui/mock-tweet";
import { TweetGroup } from "@/components/ui/tweet-group";
import { CodeSandbox } from "@/components/ui/codesandbox";
import { Sandpack } from "@/components/ui/sandpack";
import { Code } from "@/components/ui/code";
import { Scrollycoding } from "@/components/ui/scrollycoding";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserGroupIcon, CheckmarkBadge01Icon, NoteIcon } from "@hugeicons/core-free-icons";
import { UserCardDemo } from "@/components/mental-model/user-card";
import ReconcileDemo from "@/components/mental-model/reconcile-animation";
import { TweetCard } from "@/components/ui/tweet-card";
import { IntendedAudience } from "@/components/ui/intended-audience";
import { InfoNote } from "@/components/ui/info-note";
import { MagicTweet } from "@/components/ui/magic-tweet";
import { GitHubIssueCard } from "@/components/ui/github-issue-card";
import { ThreadBlockingDemo } from "@/components/blog/thread-blocking-demo";
import { EventLoopDemo } from "@/components/blog/event-loop-demo";
import { React15InputDemo } from "@/components/blog/react15-input-demo";
import { LineExecutionDemo } from "@/components/blog/line-execution-demo";
import { ImagePresentationCarousel } from "@/components/blog/image-presentation-carousel";
import { MdxImage } from "@/components/ui/mdx-image";
import { cache } from "react";

import { Quote } from "@/components/ui/quote";

import { chConfig, Post, PostFrontmatter } from "./mdx-data";

const UserGroup = (props: any) => React.createElement(HugeiconsIcon, { icon: UserGroupIcon, ...props });
const CheckmarkBadge = (props: any) => React.createElement(HugeiconsIcon, { icon: CheckmarkBadge01Icon, ...props });
const Note = (props: any) => React.createElement(HugeiconsIcon, { icon: NoteIcon, ...props });

const mdxComponents = {
  MockTweet,
  TweetGroup,
  CodeSandbox,
  Sandpack,
  Code,
  Scrollycoding,
  HugeiconsIcon,
  UserGroup,
  CheckmarkBadge,
  Note,
  UserCardDemo,
  TweetCard,
  ReconcileDemo,
  IntendedAudience,
  InfoNote,
  MagicTweet,
  GitHubIssueCard,
  ThreadBlockingDemo,
  EventLoopDemo,
  React15InputDemo,
  LineExecutionDemo,
  ImagePresentationCarousel,
  Quote,
  // Override default img tag with optimized component for lazy loading + caching
  img: MdxImage,
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface PostWithContent extends Post {
  content: React.ReactElement;
}

/**
 * Cached MDX compilation - uses React's cache() to dedupe
 * compileMDX calls within the same request
 */
export const getPostBySlug = cache(async (slug: string): Promise<PostWithContent | null> => {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  let source = fs.readFileSync(filePath, "utf-8");

  // Auto-wrap only PURE scrolly posts that start with !!steps.
  // Mixed posts should use explicit <Scrollycoding>...</Scrollycoding> blocks.
  if (!source.includes('<Scrollycoding>')) {
    const parts = source.split('---');
    if (parts.length >= 3) {
      const frontmatter = parts[1];
      const content = parts.slice(2).join('---').trimStart();

      if (content.startsWith('## !!steps')) {
        source = `---${frontmatter}---\n\n<Scrollycoding fullBleed>\n${content}\n</Scrollycoding>`;
      }
    }
  }

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      },
      // Allow JS expressions in MDX (e.g., style={{ ... }})
      // Required for next-mdx-remote v6.0.0+
      blockJS: false,
    },
  });

  return {
    slug,
    frontmatter,
    content,
  };
});

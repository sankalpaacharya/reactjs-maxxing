// Auto-generated post metadata for OG images
// This allows OG images to work without filesystem access at runtime

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    topic: string;
    date: string;
}

export const postsData: Record<string, PostMeta> = {
    "birth-of-react": {
        slug: "birth-of-react",
        title: "The Birth of React",
        description: "How React came to be and why it changed everything",
        topic: "React",
        date: "2026-01-30",
    },
    "Intro-of-series": {
        slug: "Intro-of-series",
        title: "Introduction to the Series",
        description: "Welcome to Inside React - a deep dive into React internals",
        topic: "React",
        date: "2026-01-30",
    },
    "running-react-on-different-platform": {
        slug: "running-react-on-different-platform",
        title: "Running React on different platform",
        description: "The correct mental model for understanding React across platforms",
        topic: "React",
        date: "2026-01-26",
    },
    "understanding-why-react-fiber-exists": {
        slug: "understanding-why-react-fiber-exists",
        title: "Understanding Why React Fiber Exists",
        description: "Understanding Why React Fiber Exists and how it lets React pause, prioritize",
        topic: "React",
        date: "2026-02-10",
    },
    "how-state-updates-work-internally": {
        slug: "how-state-updates-work-internally",
        title: "How state updates work internally",
        description: "A deep dive into how React state updates really work, from hooks to batching",
        topic: "React",
        date: "2026-02-24",
    },
    "making-sense-of-key-prop-in-react": {
        slug: "making-sense-of-key-prop-in-react",
        title: "Making sense of 'key' prop in react",
        description: "Why React needs a key prop, how it affects reconciliation",
        topic: "React",
        date: "2026-03-11",
    },
    "react-fiber-indepth": {
        slug: "react-fiber-indepth",
        title: "React Fiber in Depth",
        description: "I'm looking for a job",
        topic: "React",
        date: "2026-01-26",
    },
    "two-trees-of-react": {
        slug: "two-trees-of-react",
        title: "Two trees of react",
        description: "I'm looking for a job",
        topic: "React",
        date: "2026-01-26",
    },
};

export function getPostMeta(slug: string): PostMeta | null {
    return postsData[slug] || null;
}

export function getAllPostMetas(): PostMeta[] {
    return Object.values(postsData);
}

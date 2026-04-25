"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { LibraryIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { JobCard } from "@/app/test/page";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/sankalpaacharya/inside-react")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h1, h2, h3");
    const items: TOCItem[] = Array.from(headingElements)
      .map((heading) => {
        // Add IDs to headings if they don't have them
        if (!heading.id) {
          const id =
            heading.textContent
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") || "";
          heading.id = id;
        }

        return {
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1)),
        };
      })
      .filter((item) => item.id && item.text);

    setHeadings(items);

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      },
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block absolute left-full top-0 ml-16 w-56 h-full z-0">
      <div className="sticky top-32 z-0">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/60 mb-4">
          <HugeiconsIcon icon={LibraryIcon} size={14} />
          <span>On This Page</span>
        </div>
        <nav className="space-y-2.5">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-xs transition-colors duration-200",
                heading.level === 1 && "pl-0 font-medium",
                heading.level === 2 && "pl-0",
                heading.level === 3 && "pl-4",
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/70 hover:text-foreground",
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
        <a
          href="https://github.com/sankalpaacharya/inside-react"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center gap-2 group"
          aria-label="Star on GitHub"
        >
          <img
            src="/star.png"
            alt="Star on GitHub"
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12"
          />
          {stars !== null && (
            <span className="text-sm text-muted-foreground/70 group-hover:text-foreground transition-colors">
              {stars.toLocaleString()}
            </span>
          )}
        </a>
        <div className="mt-10">
          <JobCard />
        </div>
      </div>
    </aside>
  );
}

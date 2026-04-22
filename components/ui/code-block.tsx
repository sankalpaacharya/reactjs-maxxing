import { type ReactNode } from "react";
import { type BundledLanguage, codeToHtml } from "shiki";

import { CodeBlockClient } from "@/components/ui/code-block-client";

// Map common language names to shiki-supported languages
const languageMap: Record<string, BundledLanguage> = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  tsx: "tsx",
  jsx: "jsx",
  python: "python",
  py: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  cs: "csharp",
  ruby: "ruby",
  rb: "ruby",
  go: "go",
  rust: "rust",
  rs: "rust",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  kt: "kotlin",
  html: "html",
  css: "css",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  markdown: "markdown",
  md: "markdown",
  bash: "bash",
  shell: "bash",
  sh: "bash",
  sql: "sql",
};

export interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

function extractCodeText(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(extractCodeText).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    const element = children as { props?: { children?: ReactNode } };
    if (element.props?.children) {
      return extractCodeText(element.props.children);
    }
  }

  return "";
}

export async function GaiaCodeBlock({
  children,
  language = "plaintext",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const codeText = extractCodeText(children);
  const normalizedLanguage =
    typeof language === "string" ? language : "plaintext";
  const mappedLang = languageMap[normalizedLanguage.toLowerCase()];
  let highlightedHtml: string | null = null;

  if (mappedLang) {
    try {
      highlightedHtml = await codeToHtml(codeText, {
        lang: mappedLang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
    } catch {
      highlightedHtml = null;
    }
  }

  return (
    <CodeBlockClient
      codeText={codeText}
      highlightedHtml={highlightedHtml}
      language={normalizedLanguage}
      filename={filename}
      showLineNumbers={showLineNumbers}
      className={className}
    />
  );
}

"use client";

import { HighlightedCode, Pre } from "codehike/code";
import { CodeWindow } from "./code-window";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CodeProps {
  codeblock: HighlightedCode;
}

export function Code({ codeblock }: CodeProps) {
  const meta = codeblock.meta || "";
  const highlight = parseHighlight(meta);
  const folds = parseFolds(meta);

  return (
    <CodeWindow>
      <div className="overflow-x-auto px-4 py-3">
        {highlight.length > 0 || folds.length > 0 ? (
          <EnhancedPre code={codeblock} highlight={highlight} folds={folds} />
        ) : (
          <Pre
            code={codeblock}
            className="text-[14px] font-mono leading-[1.7]"
            style={{
              ...codeblock.style,
              background: "transparent",
            }}
          />
        )}
      </div>
    </CodeWindow>
  );
}

interface EnhancedPreProps {
  code: HighlightedCode;
  highlight: number[];
  folds: FoldRange[];
}

interface FoldRange {
  start: number;
  end: number;
  label?: string;
}

function EnhancedPre({ code, highlight, folds }: EnhancedPreProps) {
  const [collapsed, setCollapsed] = useState<Set<number>>(
    new Set(folds.map((_, idx) => idx))
  );

  const toggleFold = (foldIndex: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(foldIndex)) {
        next.delete(foldIndex);
      } else {
        next.add(foldIndex);
      }
      return next;
    });
  };

  // Split code into lines
  const lines: Array<{ tokens: typeof code.tokens; lineNumber: number }> = [];
  let currentLine: typeof code.tokens = [];
  let lineNumber = 1;

  for (const token of code.tokens) {
    if (typeof token === "string" && token.includes("\n")) {
      const parts = token.split("\n");
      if (parts[0]) currentLine.push(parts[0]);
      lines.push({ tokens: currentLine, lineNumber });
      for (let i = 1; i < parts.length; i++) {
        currentLine = parts[i] ? [parts[i]] : [];
        lineNumber++;
        if (i < parts.length - 1) {
          lines.push({ tokens: currentLine, lineNumber: lineNumber - 1 });
          currentLine = [];
        }
      }
    } else {
      currentLine.push(token);
    }
  }
  if (currentLine.length > 0) {
    lines.push({ tokens: currentLine, lineNumber });
  }

  return (
    <pre
      className="text-[14px] font-mono leading-[1.7]"
      style={{ ...code.style, background: "transparent" }}
    >
      <code>
        {lines.map((line, idx) => {
          const isHighlighted = highlight.includes(line.lineNumber);
          const foldIndex = folds.findIndex(
            (f) => f.start === line.lineNumber
          );
          const isInFold = folds.some(
            (f, fIdx) =>
              line.lineNumber >= f.start &&
              line.lineNumber <= f.end &&
              collapsed.has(fIdx)
          );

          // Skip lines inside collapsed folds (except the fold start line)
          if (isInFold && foldIndex === -1) {
            return null;
          }

          return (
            <div
              key={idx}
              className={`table-row ${
                !isHighlighted && highlight.length > 0
                  ? "opacity-30"
                  : "opacity-100"
              } transition-opacity`}
            >
              {foldIndex !== -1 && (
                <button
                  onClick={() => toggleFold(foldIndex)}
                  className="mr-2 inline-flex items-center justify-center w-4 h-4 hover:bg-white/10 rounded transition-colors"
                  aria-label={
                    collapsed.has(foldIndex) ? "Expand" : "Collapse"
                  }
                >
                  {collapsed.has(foldIndex) ? (
                    <ChevronRight className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}
              <span>
                {line.tokens.map((token, tokenIdx) => {
                  if (typeof token === "string") {
                    return <span key={tokenIdx}>{token}</span>;
                  }
                  const [text, color, styles] = token;
                  return (
                    <span
                      key={tokenIdx}
                      style={{ color, ...styles }}
                    >
                      {text}
                    </span>
                  );
                })}
                {foldIndex !== -1 && collapsed.has(foldIndex) && (
                  <span className="ml-2 text-muted-foreground/60 italic text-xs">
                    {folds[foldIndex].label || 
                      `// ${folds[foldIndex].end - folds[foldIndex].start + 1} lines collapsed`}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </code>
    </pre>
  );
}

// Parse highlight syntax: {1,3-5,7}
function parseHighlight(meta: string): number[] {
  const match = meta.match(/\{([0-9,-]+)\}/);
  if (!match) return [];

  const ranges = match[1].split(",");
  const lines: number[] = [];

  for (const range of ranges) {
    if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      for (let i = start; i <= end; i++) {
        lines.push(i);
      }
    } else {
      lines.push(Number(range));
    }
  }

  return lines;
}

// Parse fold syntax: [fold=1-10 "label"], [fold=15-20]
function parseFolds(meta: string): FoldRange[] {
  const foldRegex = /\[fold=(\d+)-(\d+)(?:\s+"([^"]+)")?\]/g;
  const folds: FoldRange[] = [];
  let match;

  while ((match = foldRegex.exec(meta)) !== null) {
    folds.push({
      start: Number(match[1]),
      end: Number(match[2]),
      label: match[3],
    });
  }

  return folds;
}

// Simple inline code block without header
export function InlineCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <Pre
      code={codeblock}
      className="inline px-1.5 py-0.5 rounded-md bg-zinc-800 text-sm"
      style={codeblock.style}
    />
  );
}

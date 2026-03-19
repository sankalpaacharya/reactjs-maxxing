"use client";

import { z } from "zod";
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks";
import {
  AnnotationHandler,
  HighlightedCode,
  InnerToken,
  Pre,
} from "codehike/code";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SmoothPre } from "./smooth-pre";
import { CodeWindow } from "./code-window";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  CheckmarkBadge01Icon,
  NoteIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const ICONS: Record<string, any> = {
  UserGroup: UserGroupIcon,
  CheckmarkBadge: CheckmarkBadge01Icon,
  Note: NoteIcon,
};

const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  PreWithRef: SmoothPre,
  Token: (props) => (
    <InnerToken merge={props} style={{ display: "inline-block" }} />
  ),
};

const Schema = Block.extend({
  steps: z.array(
    Block.extend({
      code: HighlightedCodeBlock.optional(),
      preview: z.array(Block).optional(),
    }),
  ),
});

type ScrollycodingProps = {
  children?: React.ReactNode;
  steps?: unknown[];
  fullBleed?: boolean;
  [key: string]: unknown;
};

export function Scrollycoding(props: ScrollycodingProps) {
  const { steps } = parseProps(props, Schema);
  const fullBleed = props.fullBleed !== false;
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasScrolled = useRef(false);

  const updateActiveStep = useCallback(() => {
    if (!hasScrolled.current) {
      return;
    }

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    let newActiveStep = 0;

    for (let i = stepRefs.current.length - 1; i >= 0; i--) {
      const ref = stepRefs.current[i];
      if (!ref) continue;

      const rect = ref.getBoundingClientRect();
      if (rect.top <= viewportHeight * 0.5 && rect.bottom > 0) {
        newActiveStep = i;
        break;
      }
    }

    setActiveStep(newActiveStep);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      hasScrolled.current = true;
      requestAnimationFrame(updateActiveStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActiveStep]);

  const activeStep$ = steps[activeStep];
  const activeCode = activeStep$?.code;
  const activePreview = activeStep$?.preview;

  return (
    <div
      className={cn(
        "scrollycoding not-prose border-y border-border/30 bg-background/50",
        fullBleed
          ? "w-screen relative left-1/2 right-1/2 -mx-[50vw] my-10 py-4"
          : "w-full my-10 py-4",
      )}
    >
      <div className={cn("flex flex-col", "lg:flex-row")}>
        {/* Left: Text content */}
        <div
          className={cn(
            "w-full",
            fullBleed
              ? "lg:w-1/2 px-6 lg:pl-[max(24px,calc((100vw-1200px)/2))] lg:pr-8"
              : "lg:w-1/2 px-4 md:px-6 lg:pr-6",
          )}
        >
          <div
            className={cn(
              "max-w-xl ml-auto",
              fullBleed
                ? "space-y-24 pt-[14vh] pb-[24vh]"
                : "space-y-20 pt-[12vh] pb-[22vh]",
            )}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                style={{
                  opacity: activeStep === index ? 1 : 0.5,
                }}
              >
                <h3
                  className={`text-lg font-medium mb-3 transition-colors ${
                    activeStep === index
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {(() => {
                    const rawTitle = step.title || "";
                    const [iconName, title] = rawTitle.includes("|")
                      ? rawTitle.split("|")
                      : [null, rawTitle];
                    const Icon = iconName ? ICONS[iconName] : null;

                    return (
                      <div className="flex items-center gap-2">
                        {Icon && <HugeiconsIcon icon={Icon} size={20} />}
                        <span>{title}</span>
                      </div>
                    );
                  })()}
                </h3>
                <div className="text-base leading-[1.8] text-muted-foreground [&_strong]:text-foreground [&_code]:text-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                  {step.children}
                </div>

                {/* Mobile: Show content inline */}
                <div className="lg:hidden mt-6">
                  {step.code && <CodeDisplay code={step.code} />}
                  {!step.code && step.preview && (
                    <div className="preview-content">
                      {Array.isArray(step.preview)
                        ? step.preview.map((block: any, i: number) => (
                            <div key={i}>{block.children}</div>
                          ))
                        : (step.preview as any).children}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sticky code */}
        <div className={cn("hidden", "lg:block lg:w-1/2")}>
          <div
            className={cn(
              "sticky top-0 h-screen flex items-center",
              fullBleed
                ? "px-6 lg:pr-[max(24px,calc((100vw-1200px)/2))] lg:pl-8"
                : "px-4 md:px-6 lg:pl-6",
            )}
          >
            <div className="w-full relative max-h-[90vh] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeCode ? (
                  <motion.div
                    key="code-display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                      <CodeDisplay code={activeCode} />
                    </div>
                  </motion.div>
                ) : activePreview ? (
                  <motion.div
                    key={`preview-${activeStep}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="preview-content flex items-center justify-center p-4 w-full"
                  >
                    <div className="w-full h-full">
                      {Array.isArray(activePreview)
                        ? activePreview.map((block: any, i: number) => (
                            <div key={i} className="h-full">
                              {block.children}
                            </div>
                          ))
                        : (activePreview as any).children}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeDisplay({ code }: { code: HighlightedCode }) {
  return (
    <CodeWindow className="my-0 shadow-2xl bg-[#1a1625] border-[#2d2640]/80">
      <div className="p-4">
        <Pre
          code={code}
          handlers={[tokenTransitions]}
          className="text-[13px]"
          style={{
            ...code.style,
            background: "transparent",
          }}
        />
      </div>
    </CodeWindow>
  );
}

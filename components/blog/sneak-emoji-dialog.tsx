"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "reactjs-maxxing:sneak-emoji-v1";
const COOLDOWN_MS = 1000 * 60 * 60 * 24 * 4;
const SHOW_DELAY_MS = 1200;
const MESSAGE =
  "Hey there! If you're enjoying the read, follow me on X to stay in touch.";
const X_FOLLOW_URL = "https://x.com/sankalpa_02";

type SneakState = {
  lastShown: number;
};

function readState(): SneakState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SneakState;
  } catch {
    return null;
  }
}

function writeState(state: SneakState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function SneakEmojiDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);

    const now = Date.now();
    const stored = readState();
    const shouldShow = !stored || now - stored.lastShown >= COOLDOWN_MS;

    if (!shouldShow) return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
      writeState({ lastShown: Date.now() });
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    writeState({ lastShown: Date.now() });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 bottom-6 z-50 max-w-[280px] md:max-w-sm">
      <div
        className={`sneak-emoji-card ${
          prefersReducedMotion ? "sneak-emoji-card--reduced" : ""
        }`}
        role="dialog"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl leading-none">😃</div>
          <div className="flex-1">
            <p className="text-sm text-foreground/90 leading-relaxed">
              {MESSAGE}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <a
                href={X_FOLLOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDismiss}
                className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sure
              </a>
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

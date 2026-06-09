import React from "react";

/** Blended wrapper — white linework dissolves into the blue gradient. */
function Art({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden mix-blend-overlay opacity-75 text-white">
      {children}
    </div>
  );
}

/**
 * Per-post motion graphic, chosen from the post slug so each cover reflects
 * what the article is actually about. Shared by the home grid covers and the
 * blog post banner.
 */
export function CardArt({ slug }: { slug: string }) {
  switch (slug) {
    // Birth of React → genesis: a pulsing core spawning expanding rings.
    case "birth-of-react":
      return (
        <Art>
          <span className="absolute h-20 w-20 rounded-full border-2 border-white animate-ping [animation-duration:5s]" />
          <span className="absolute h-20 w-20 rounded-full border-2 border-white animate-ping [animation-duration:5s] [animation-delay:2.5s]" />
          <span className="h-8 w-8 rounded-full bg-white animate-pulse [animation-duration:4s]" />
        </Art>
      );

    // Fiber renders your UI → signals travelling along wavy fiber strands.
    case "how-does-react-fiber-render-your-ui":
      return (
        <Art>
          <svg viewBox="0 0 100 60" className="h-[80%] w-[80%]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M0 15 Q 25 2, 50 15 T 100 15" strokeDasharray="6 8" className="animate-[art-dash_3.5s_linear_infinite]" />
            <path d="M0 30 Q 25 17, 50 30 T 100 30" strokeDasharray="6 8" className="animate-[art-dash_4.2s_linear_infinite]" />
            <path d="M0 45 Q 25 32, 50 45 T 100 45" strokeDasharray="6 8" className="animate-[art-dash_4.9s_linear_infinite]" />
          </svg>
        </Art>
      );

    // RSC + Bundler → separate modules assembling into one bundle.
    case "how-react-server-component-integrate-with-bundler":
      return (
        <Art>
          <div className="relative h-28 w-28">
            <span className="absolute inset-0 rounded-xl border-2 border-white/70" />
            <span className="absolute left-3 top-3 h-7 w-7 rounded-md bg-white animate-pulse [animation-duration:4s]" />
            <span className="absolute right-3 top-3 h-7 w-7 rounded-md bg-white animate-pulse [animation-duration:4s] [animation-delay:1s]" />
            <span className="absolute left-3 bottom-3 h-7 w-7 rounded-md bg-white animate-pulse [animation-duration:4s] [animation-delay:2s]" />
            <span className="absolute right-3 bottom-3 h-7 w-7 rounded-md bg-white animate-pulse [animation-duration:4s] [animation-delay:3s]" />
          </div>
        </Art>
      );

    // Streams component → continuous flowing stream lines.
    case "how-react-streams-components":
      return (
        <Art>
          <svg viewBox="0 0 100 50" className="h-[75%] w-[82%]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="0" y1="12" x2="100" y2="12" strokeDasharray="4 10" className="animate-[art-dash_3s_linear_infinite]" />
            <line x1="0" y1="25" x2="100" y2="25" strokeDasharray="4 10" className="animate-[art-dash_3.6s_linear_infinite]" />
            <line x1="0" y1="38" x2="100" y2="38" strokeDasharray="4 10" className="animate-[art-dash_4.2s_linear_infinite]" />
          </svg>
        </Art>
      );

    // Streams UI out of order → bars settling at shifting heights (reordering).
    case "how-react-streams-ui-out-of-order":
      return (
        <Art>
          <div className="flex h-20 items-end gap-2">
            {[4.2, 4.8, 4.4, 5, 4.6].map((d, i) => (
              <span
                key={i}
                className="w-3 rounded-full bg-white origin-bottom"
                style={{ height: "100%", animation: `art-fill ${d}s ease-in-out ${i * 0.5}s infinite` }}
              />
            ))}
          </div>
        </Art>
      );

    // State updates → a toggle knob sliding between states.
    case "how-state-updates-work-internally":
      return (
        <Art>
          <div className="relative flex h-12 w-[88px] items-center rounded-full border-2 border-white px-1.5">
            <span className="h-7 w-7 rounded-full bg-white animate-[art-slide_4.5s_ease-in-out_infinite]" />
          </div>
        </Art>
      );

    // Intro of series → an outline / agenda drawing itself in.
    case "Intro-of-series":
      return (
        <Art>
          <div className="flex w-[62%] flex-col gap-3">
            {[100, 72, 88, 55].map((w, i) => (
              <span
                key={i}
                className="h-2 rounded-full bg-white origin-left"
                style={{ width: `${w}%`, animation: `art-draw 4.5s ease-in-out ${i * 0.5}s infinite` }}
              />
            ))}
          </div>
        </Art>
      );

    // 'key' prop → a key, gently bobbing (identity).
    case "making-sense-of-key-prop-in-react":
      return (
        <Art>
          <svg viewBox="0 0 64 64" className="h-[52%] w-[52%] animate-[art-bob_5s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="22" cy="22" r="12" />
            <path d="M30 30 L52 52" />
            <path d="M44 50 L50 44" />
            <path d="M50 58 L58 50" />
          </svg>
        </Art>
      );

    // Why Fiber exists → interruptible work: chunks lighting up in sequence.
    case "understanding-why-react-fiber-exists":
      return (
        <Art>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-9 w-3 rounded-sm bg-white animate-pulse [animation-duration:3.5s]"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        </Art>
      );

    // Fiber in depth → nested rings rotating, depth via opacity.
    case "react-fiber-indepth":
      return (
        <Art>
          <svg viewBox="-50 -50 100 100" className="h-[80%] w-[80%]" fill="none" stroke="currentColor">
            <circle r="42" strokeWidth="2" strokeDasharray="5 7" className="opacity-40 animate-[spin_44s_linear_infinite]" />
            <circle r="30" strokeWidth="2.5" strokeDasharray="5 7" className="opacity-70 animate-[spin_32s_linear_infinite_reverse]" />
            <circle r="18" strokeWidth="3" strokeDasharray="5 7" className="animate-[spin_24s_linear_infinite]" />
            <circle r="4" fill="currentColor" stroke="none" />
          </svg>
        </Art>
      );

    // Different platforms → monitor / tablet / phone frames.
    case "running-react-on-different-platform":
      return (
        <Art>
          <div className="flex items-end gap-3 animate-[art-bob_6s_ease-in-out_infinite]">
            <span className="h-14 w-20 rounded-md border-2 border-white" />
            <span className="h-12 w-9 rounded-md border-2 border-white" />
            <span className="h-9 w-5 rounded border-2 border-white" />
          </div>
        </Art>
      );

    // Hydration → water drops falling with a ripple.
    case "why-frontend-frameworks-need-hydration":
      return (
        <Art>
          <span className="absolute left-[32%] top-0 h-3 w-3 rounded-full bg-white" style={{ animation: "art-drop 4.5s ease-in 0s infinite" }} />
          <span className="absolute left-[52%] top-0 h-2.5 w-2.5 rounded-full bg-white" style={{ animation: "art-drop 5.2s ease-in 1.8s infinite" }} />
          <span className="absolute left-[44%] top-0 h-2 w-2 rounded-full bg-white" style={{ animation: "art-drop 4s ease-in 3s infinite" }} />
          <span className="absolute bottom-4 h-6 w-6 rounded-full border-2 border-white animate-ping [animation-duration:4.5s]" />
        </Art>
      );

    // Re-renders with no state change → a refresh cycle spinning.
    case "why-react-rerenders-with-no-state-change":
      return (
        <Art>
          <svg viewBox="0 0 64 64" className="h-[52%] w-[52%] animate-[spin_7s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M52 24 A 22 22 0 1 0 55 38" />
            <path d="M52 12 L52 24 L40 24" />
          </svg>
        </Art>
      );

    // Fallback → the React atom.
    default:
      return (
        <Art>
          <svg viewBox="-50 -50 100 100" className="h-[78%] w-[78%] animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor">
            <circle r="6.5" fill="currentColor" stroke="none" />
            <g strokeWidth="2.5">
              <ellipse rx="38" ry="14.5" />
              <ellipse rx="38" ry="14.5" transform="rotate(60)" />
              <ellipse rx="38" ry="14.5" transform="rotate(120)" />
            </g>
          </svg>
        </Art>
      );
  }
}

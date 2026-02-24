import React from "react";

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end justify-start gap-2 my-8 not-prose">
      <img
        src="https://github.com/sankalpaacharya.png"
        alt=""
        width={28}
        height={28}
        className="rounded-full shrink-0"
      />
      <div
        className="px-4 py-2.5 bg-blue-700 rounded-3xl rounded-bl-md text-sm leading-relaxed max-w-sm"
      >
        {children}
      </div>
    </div>
  );
}
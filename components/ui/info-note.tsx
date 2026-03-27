import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface InfoNoteProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export function InfoNote({
  children,
  title = "Note",
  className,
}: InfoNoteProps) {
  return (
    <div
      className={cn(
        "not-prose my-4 rounded-r-lg border-l-2 md:border-l-4 border-blue-500 bg-[#0f172a] p-3 md:p-6 shadow-sm overflow-hidden md:my-8",
        className,
      )}
    >
      <div className="flex items-start gap-3 md:gap-4 min-w-0">
        <div className="mt-1 shrink-0 text-blue-500">
          <HugeiconsIcon icon={InformationCircleIcon} size={20} />
        </div>
        <div className="flex-1 space-y-2 md:space-y-4 min-w-0 w-full">
          <h4 className="text-base font-semibold tracking-tight text-white md:text-lg">
            {title}
          </h4>
          <div className="text-[14px] leading-relaxed text-slate-300 md:text-[15px] [&_p]:leading-relaxed [&_pre]:!m-0 [&_pre]:text-xs [&_pre]:md:text-sm [&_pre]:w-full [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:box-border">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

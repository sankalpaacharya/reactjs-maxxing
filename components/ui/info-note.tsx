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
        "not-prose my-8 rounded-r-lg border-l-4 border-blue-500 bg-[#0f172a] p-6 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 shrink-0 text-blue-500">
          <HugeiconsIcon icon={InformationCircleIcon} size={24} />
        </div>
        <div className="flex-1 space-y-4">
          <h4 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h4>
          <div className="text-[15px] leading-relaxed text-slate-300 [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

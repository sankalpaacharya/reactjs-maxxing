import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CodeIcon,
  Calendar02Icon,
  Briefcase04Icon,
  Shield02Icon,
} from "@hugeicons/core-free-icons";

const facts = [
  {
    icon: Calendar02Icon,
    label: "Age",
    value: "21",
  },
  {
    icon: CodeIcon,
    label: "Started coding",
    value: "2020",
  },
  {
    icon: Shield02Icon,
    label: "Started security",
    value: "2020",
  },
  {
    icon: Briefcase04Icon,
    label: "Looking for",
    value: "New opportunities",
  },
];

export function AboutMe() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-medium text-foreground tracking-tight">
        About me
      </h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Hello 👋, I'm <strong>Sankalpa (sanku)</strong>. I'm 21 years old and
          have been super excited about computers ever since I was a kid.
        </p>

        <p>
          I started programming back in <strong>2020</strong> during high
          school, where I dove into bug bounties and cybersecurity. Later, when
          I joined college in <strong>2022</strong>, I shifted my focus toward
          building web applications.
        </p>

        <p>I'm actively looking for a new opportunity.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/40"
          >
            <HugeiconsIcon
              icon={fact.icon}
              size={20}
              className="text-muted-foreground shrink-0"
            />
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                {fact.label}
              </span>
              <span className="text-sm font-medium text-foreground truncate">
                {fact.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
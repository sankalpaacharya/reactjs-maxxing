"use client";

import Image from "next/image";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

type Social = {
  name: string;
  href: string;
  icon: string;
  /** Shown under the name in the hover card. */
  handle: string;
  /** One-line description in the hover card. */
  description: string;
  /** Display version of the URL (no protocol). */
  displayUrl: string;
  /** Brand color used for the hover-card banner. */
  brand: string;
  /** Resting tilt so the row looks playful, like a dock. */
  tilt: string;
};

const socials: Social[] = [
  {
    name: "X",
    href: "https://x.com/sankalpa_02",
    icon: "/icons/x.png",
    handle: "@sankalpa_02",
    description: "React internals & build-in-public, most days.",
    displayUrl: "x.com/sankalpa_02",
    brand: "#000000",
    tilt: "-rotate-[8deg]",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sankalpa02",
    icon: "/icons/linkedin.png",
    handle: "Sankalpa Acharya",
    description: "Software engineer writing about how React works.",
    displayUrl: "linkedin.com/in/sankalpa02",
    brand: "#0a66c2",
    tilt: "rotate-[6deg]",
  },
  {
    name: "GitHub",
    href: "https://github.com/sankalpaacharya",
    icon: "/icons/github.png",
    handle: "@sankalpaacharya",
    description: "Open-source experiments and the source for this blog.",
    displayUrl: "github.com/sankalpaacharya",
    brand: "#181717",
    tilt: "-rotate-[4deg]",
  },
];

/** Clean row of brand social icons with a rich hover-preview card each. */
export function HeroSocials() {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <HoverCard key={social.name} openDelay={150} closeDelay={120}>
          <HoverCardTrigger asChild>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`${social.tilt} rounded-xl transition-transform duration-300 ease-out hover:scale-[1.06]`}
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl"
              />
            </a>
          </HoverCardTrigger>

          <HoverCardContent
            align="start"
            sideOffset={12}
            className="w-72 overflow-hidden p-0 duration-200 ease-out"
          >
            {/* Brand banner with the icon front and center */}
            <div
              className="flex h-28 items-center justify-center"
              style={{ backgroundColor: social.brand }}
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-xl ring-1 ring-white/15"
              />
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Image
                  src={social.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded"
                />
                <span className="font-semibold leading-none">
                  {social.name}
                </span>
              </div>

              <p className="mt-1.5 text-sm text-muted-foreground">
                {social.handle}
              </p>

              <p className="mt-2.5 text-sm text-foreground/90 leading-relaxed">
                {social.description}
              </p>

              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-primary hover:underline"
              >
                {social.displayUrl}
              </a>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}

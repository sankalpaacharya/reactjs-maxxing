"use client";

import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  LinkedinIcon,
  GithubIcon,
} from "@hugeicons/core-free-icons";
import {
  NavbarWithMenu,
  type NavbarMenuSection,
} from "@/components/navbar-withmenu";

const sections: NavbarMenuSection[] = [
  {
    id: "socials",
    gridLayout: "grid w-full grid-cols-1 gap-2",
    links: [
      {
        label: "X (Twitter)",
        href: "https://x.com/sankalpa_02",
        external: true,
        description: "Thoughts, threads & updates",
        icon: <HugeiconsIcon icon={NewTwitterIcon} size={18} />,
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/sankalpa02",
        external: true,
        description: "Professional profile",
        icon: <HugeiconsIcon icon={LinkedinIcon} size={18} />,
      },
      {
        label: "GitHub",
        href: "https://github.com/sankalpaacharya",
        external: true,
        description: "Open source & projects",
        icon: <HugeiconsIcon icon={GithubIcon} size={18} />,
      },
    ],
  },
];

const navItems = [
  { type: "link" as const, label: "Home", href: "/" },
  { type: "dropdown" as const, label: "Socials", menu: "socials" },
];

const logo = (
  <Link href="/" className="flex items-center gap-2.5">
    <Image
      src="https://github.com/sankalpaacharya.png"
      alt="Sanku"
      width={32}
      height={32}
      className="rounded-full"
    />
    <span className="font-semibold text-foreground">reactjs maxxing</span>
  </Link>
);

const cta = (
  <a
    href="https://hireme.sankalpa.info.np"
    className="btn-raised px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all duration-150 hover:-translate-y-px active:translate-y-0.5"
  >
    Hire me
  </a>
);

export function SiteNavbar() {
  return (
    <NavbarWithMenu
      sections={sections}
      navItems={navItems}
      logo={logo}
      cta={cta}
    />
  );
}

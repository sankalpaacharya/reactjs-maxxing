"use client";

import Image from "next/image";
import Link from "next/link";
import { NavbarWithMenu } from "@/components/navbar-withmenu";

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
    <NavbarWithMenu sections={[]} navItems={[]} logo={logo} cta={cta} />
  );
}

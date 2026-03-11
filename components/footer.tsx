import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  LinkedinIcon,
  GithubIcon,
  RssIcon,
} from "@hugeicons/core-free-icons";

const socialLinks = [
  {
    name: "X (Twitter)",
    href: "https://x.com/sankalpa_02",
    icon: NewTwitterIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sankalpa02",
    icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/sankalpaacharya",
    icon: GithubIcon,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    icon: RssIcon,
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hire Me", href: "/hire-me" },
  { label: "RSS", href: "/rss.xml" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="max-w-2xl mx-auto px-6 py-14">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="p-0.5 rounded-xl bg-linear-to-br from-white/20 to-white/5 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-background/50 border border-white/10">
                  <Image
                    src="https://github.com/sankalpaacharya.png"
                    alt="Sanku"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                Inside React
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-65">
              Deep dives into React internals,{" "}
              <span className="text-primary/80">Fiber</span>, reconciliation,
              and the web platform.
            </p>
          </div>

          {/* Navigation + Social */}
          <div className="flex flex-col gap-6">
            {/* Nav */}
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <HugeiconsIcon icon={social.icon} size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 h-px bg-border" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground/50">
          <p>
            © {year}{" "}
            <span className="text-muted-foreground/70">Sankalpa Acharya</span>.
            All rights reserved.
          </p>
          <p>
            Built with{" "}
            <span className="text-primary/70">Next.js</span> &amp;{" "}
            <span className="text-primary/70">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

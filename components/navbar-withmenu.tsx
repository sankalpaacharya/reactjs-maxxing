"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Menu01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface NavbarMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  description?: string;
  backgroundImage?: string;
  rowSpan?: number;
}

export interface NavbarMenuSection {
  id: string;
  links: NavbarMenuLink[];
  gridLayout?: string;
}

export interface NavbarMenuProps {
  activeMenu: string;
  sections: NavbarMenuSection[];
  onClose?: () => void;
}

export interface NavbarWithMenuProps {
  sections: NavbarMenuSection[];
  navItems?: Array<
    | {
        type: "link";
        label: string;
        href: string;
        icon?: React.ReactNode;
        external?: boolean;
      }
    | { type: "dropdown"; label: string; menu: string }
  >;
  logo?: React.ReactNode;
  cta?: React.ReactNode;
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title: string;
    children?: React.ReactNode;
    href: string;
    external?: boolean;
    icon?: React.ReactNode;
    backgroundImage?: string;
    rowSpan?: number;
  }
>(
  (
    {
      className,
      title,
      children,
      href,
      external,
      icon,
      backgroundImage,
      rowSpan,
      ...props
    },
    ref,
  ) => {
    return (
      <li className={cn("list-none", rowSpan === 2 && "row-span-2")}>
        <a
          ref={ref}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={cn(
            "group relative flex h-full min-h-18 w-full flex-col justify-center overflow-hidden p-3.5 leading-none no-underline outline-none transition-all duration-150 select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          {backgroundImage && (
            <>
              <Image
                fill
                src={backgroundImage}
                alt={title}
                className="absolute inset-0 z-0 h-full w-full object-cover transition-all group-hover:brightness-60"
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </>
          )}
          <div
            className={cn(
              "flex items-start gap-3",
              backgroundImage && "relative z-[2] mt-auto",
            )}
          >
            {icon && (
              <span
                className={cn(
                  "relative flex min-h-10 min-w-10 items-center justify-center p-2 text-primary transition",
                  backgroundImage
                    ? "bg-muted/40 backdrop-blur group-hover:bg-muted"
                    : "bg-muted group-hover:bg-accent",
                )}
              >
                {icon}
              </span>
            )}
            <div className="flex h-full flex-col justify-start gap-1 leading-none font-normal text-foreground">
              {title}

              {children && (
                <p
                  className={cn(
                    "line-clamp-2 text-sm leading-tight font-light text-muted-foreground",
                    backgroundImage && "relative z-[2]",
                  )}
                >
                  {children}
                </p>
              )}
            </div>
          </div>
        </a>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export function NavbarMenu({ activeMenu, sections }: NavbarMenuProps) {
  const activeSection = sections.find((section) => section.id === activeMenu);

  if (!activeSection) return null;

  const gridLayout =
    activeSection.gridLayout || "grid w-full grid-cols-2 gap-4";

  return (
    <div
      className={cn(
        "absolute top-full left-0 z-40 w-full origin-top overflow-hidden rounded-b-2xl border border-t-0 border-border bg-background/95 backdrop-blur-2xl outline-none",
      )}
    >
      <div className="p-6">
        <ul className={gridLayout}>
          {activeSection.links.map((link) => (
            <ListItem
              key={link.href}
              href={link.href}
              title={link.label}
              external={link.external}
              icon={link.icon}
              backgroundImage={link.backgroundImage}
              rowSpan={link.rowSpan}
            >
              {link.description}
            </ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function NavbarWithMenu({
  sections,
  navItems,
  logo,
  cta,
}: NavbarWithMenuProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const defaultNavItems = [
    { type: "dropdown", label: "Product", menu: "product" },
    { type: "dropdown", label: "Resources", menu: "resources" },
    { type: "dropdown", label: "Socials", menu: "socials" },
  ] as const;

  const items = navItems || defaultNavItems;

  const handleNavbarMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredItem(null);
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
    setHoveredItem(menu);
  };

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0.92, y: "-100%" }
      }
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.35 : 0.8,
        ease: [0.2, 0.9, 0.24, 1],
      }}
      className="sticky top-3 z-50 w-full"
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Hover container for menu, not interactive content */}
      <motion.div
        initial={false}
        className="relative mx-auto"
        onMouseLeave={handleNavbarMouseLeave}
        animate={{
          maxWidth: scrolled ? "56rem" : "100vw",
          marginTop: scrolled ? 12 : 8,
          paddingLeft: scrolled ? 16 : 0,
          paddingRight: scrolled ? 16 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
          mass: 0.5,
        }}
      >
        <motion.div
          initial={false}
          className={cn(
            "navbar_content relative flex h-14 w-full items-center justify-between border transition-[border-radius,background-color,border-color] duration-300",
            activeDropdown
              ? "rounded-t-lg border-border border-b-transparent bg-background backdrop-blur-md"
              : scrolled
                ? "rounded-lg border-border bg-card/40 backdrop-blur-md"
                : "rounded-none border-transparent bg-transparent",
          )}
          animate={{
            paddingLeft: scrolled ? 12 : 32,
            paddingRight: scrolled ? 12 : 32,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
            mass: 0.5,
          }}
        >
          <div className="flex items-center gap-2 px-2">
            {logo || (
              <Image
                src="/media/text_w_logo_white.webp"
                alt="Logo"
                width={100}
                height={30}
                className="object-contain"
              />
            )}
          </div>

          {/* Center nav — social icons */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {items.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="relative flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                  onMouseEnter={() => {
                    setHoveredItem(item.label.toLowerCase());
                    setActiveDropdown(null);
                  }}
                >
                  {item.icon ?? <span className="relative z-10">{item.label}</span>}
                </Link>
              ) : (
                <button
                  type="button"
                  key={item.menu}
                  className="relative flex h-9 cursor-pointer items-center px-4 py-2 text-sm text-muted-foreground capitalize transition-colors hover:text-foreground"
                  onMouseEnter={() => handleMouseEnter(item.menu)}
                >
                  {hoveredItem === item.menu && (
                    <div className="absolute inset-0 h-full w-full bg-accent transition-all duration-300 ease-out" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <span>
                      {item.label.charAt(0).toUpperCase() +
                        item.label.slice(1)}
                    </span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={17}
                      className={cn(
                        "transition duration-200",
                        hoveredItem === item.menu && "rotate-180",
                      )}
                    />
                  </div>
                </button>
              ),
            )}
          </div>

          {/* Right — CTA (desktop) */}
          <div className="hidden md:block">{cta}</div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <HugeiconsIcon icon={Menu01Icon} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-4">
                {items.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-2 py-3 text-sm text-foreground hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div
                      key={item.menu}
                      className="px-2 py-3 text-sm text-muted-foreground capitalize"
                    >
                      {item.label}
                    </div>
                  ),
                )}
                {cta && <div className="mt-4 px-2">{cta}</div>}
              </nav>
            </SheetContent>
          </Sheet>
        </motion.div>

        {activeDropdown && (
          <NavbarMenu activeMenu={activeDropdown} sections={sections} />
        )}
      </motion.div>
    </motion.div>
  );
}

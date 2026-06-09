import Image from "next/image";

const socials = [
  {
    name: "X",
    href: "https://x.com/sankalpa_02",
    icon: "/icons/x.png",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sankalpa02",
    icon: "/icons/linkedin.png",
  },
  {
    name: "GitHub",
    href: "https://github.com/sankalpaacharya",
    icon: "/icons/github.png",
  },
];

/** Clean row of brand social icons shown under the hero copy. */
export function HeroSocials() {
  return (
    <div className="flex items-center gap-2 -ml-2">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-muted/50"
        >
          <Image
            src={social.icon}
            alt={social.name}
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
          />
        </a>
      ))}
    </div>
  );
}

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

/**
 * Inline social mentions — brand icon tile + name woven into the hero copy,
 * the way Spectrum highlights iMessage / WhatsApp / Discord in its tagline.
 */
export function HeroSocials() {
  return (
    <>
      {socials.map((social, i) => (
        <span key={social.name} className="whitespace-nowrap">
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 align-middle font-semibold text-foreground transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src={social.icon}
              alt={social.name}
              width={22}
              height={22}
              className="rounded-[5px] transition-transform duration-200 group-hover:-translate-y-px"
            />
            {social.name}
          </a>
          {i < socials.length - 1 ? <span>,&nbsp;</span> : null}
        </span>
      ))}
    </>
  );
}

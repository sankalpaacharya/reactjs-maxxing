"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

const images = {
  stare: "/characters/stare.png",
  okay: "/characters/okay.png",
  thankyou: "/characters/thank-you.png",
};

export function JobCard() {
  const [active, setActive] = useState("stare");
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check if user previously closed the card in this session
    const isHidden = sessionStorage.getItem("hide-job-card");
    if (isHidden) setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    const oneHour = 60 * 60 * 1000;
    const expiryTime = Date.now() + oneHour;

    sessionStorage.setItem("hide-job-card", expiryTime.toString());
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="group relative w-full max-w-[240px] rounded-xl border p-5 shadow-sm transition-all hover:shadow-md mt-8 backdrop-blur-sm">
      {/* Subtle Close Button */}
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
        aria-label="Close card"
      >
        <X size={14} className="text-muted-foreground" />
      </button>

      <div className="flex flex-col items-center text-center gap-4">
        {/* Character - Clean & Scaled */}
        <div className="relative w-20 h-20 transition-transform duration-300 ease-out group-hover:scale-110">
          <Image
            src={images[active as keyof typeof images]}
            alt="Character"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-foreground tracking-tight">
              Available for work
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground text-balance">
              I'm graduating soon and looking to join a team.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 pt-1">
          <a href="mailto:sankalpaacharya01@gmail.com?subject=Opportunity&body=Hi Sankalpa, I came across your work and...">
            <Button
              size="sm"
              variant={"outline"}
              onMouseEnter={() => setActive("thankyou")}
              onMouseLeave={() => setActive("stare")}
              className="w-full text-[11px] h-8 font-medium border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              Contact me
            </Button>
          </a>
          <button
            onMouseEnter={() => setActive("okay")}
            onMouseLeave={() => setActive("stare")}
            onClick={handleClose}
            className="w-full text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors py-1"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

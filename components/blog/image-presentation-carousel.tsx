"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselImage = {
  src: string;
  alt: string;
};

interface ImagePresentationCarouselProps {
  images: CarouselImage[];
}

export function ImagePresentationCarousel({
  images,
}: ImagePresentationCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!images?.length) {
    return null;
  }

  const currentImage = images[current];

  const goPrev = () => {
    setCurrent((value) => (value === 0 ? images.length - 1 : value - 1));
  };

  const goNext = () => {
    setCurrent((value) => (value === images.length - 1 ? 0 : value + 1));
  };

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-4 not-prose">
      <div className="relative h-120 w-full overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
          priority={current === 0}
          unoptimized
        />
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={goPrev}
          aria-label="Previous image"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={goNext}
          aria-label="Next image"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

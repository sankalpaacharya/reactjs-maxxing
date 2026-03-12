"use client";

import Image from "next/image";
import { useState } from "react";

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Optimized image component for MDX content.
 * - Uses Next.js Image for optimization and lazy loading
 * - Falls back to regular img for external URLs or SVGs
 * - Provides proper caching and responsive images
 */
export function MdxImage({ src, alt, width, height, style, className }: MdxImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Parse width/height to numbers
  const parsedWidth = typeof width === "string" ? parseInt(width, 10) : width;
  const parsedHeight = typeof height === "string" ? parseInt(height, 10) : height;

  // For external URLs or SVGs, use regular img with lazy loading
  const isExternal = src.startsWith("http://") || src.startsWith("https://");
  const isSvg = src.endsWith(".svg");

  if (isExternal || isSvg) {
    return (
      <img
        src={src}
        alt={alt}
        width={parsedWidth}
        height={parsedHeight}
        style={style}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // For local images, use Next.js Image with optimization
  return (
    <Image
      src={src}
      alt={alt}
      width={parsedWidth || 800}
      height={parsedHeight || 450}
      style={{
        ...style,
        width: style?.width || "auto",
        height: style?.height || "auto",
        maxWidth: "100%",
      }}
      className={`${className || ""} ${isLoading ? "animate-pulse bg-muted" : ""}`}
      loading="lazy"
      quality={80}
      onLoad={() => setIsLoading(false)}
    />
  );
}

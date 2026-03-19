import { ImageResponse } from "next/og";
import { getPostFrontmatter, getAllPostSlugs } from "@/lib/mdx-data";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Generate static params so OG images are built at build time
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = getPostFrontmatter(slug);
  const post = postData?.frontmatter ?? null;

  // If a custom ogImage is defined in the post frontmatter, serve that file directly
  if (post?.ogImage) {
    const absoluteImagePath = path.join(process.cwd(), "public", post.ogImage);
    if (fs.existsSync(absoluteImagePath)) {
      const imageBuffer = fs.readFileSync(absoluteImagePath);
      const ext = post.ogImage.split(".").pop()?.toLowerCase();
      const mimeType =
        ext === "jpg" || ext === "jpeg"
          ? "image/jpeg"
          : ext === "webp"
            ? "image/webp"
            : "image/png";
      return new Response(imageBuffer, {
        headers: { "Content-Type": mimeType },
      });
    }
  }

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700 }}>Post Not Found</div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
            marginTop: 20,
          }}
        >
          Slug: {slug}
        </div>
      </div>,
      { ...size },
    );
  }

  const { title, description, topic } = post!;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px 80px",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      {/* Top section with topic badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            backgroundColor: "rgba(232, 168, 124, 0.15)",
            borderRadius: "100px",
            border: "1px solid rgba(232, 168, 124, 0.3)",
          }}
        >
          <span
            style={{
              color: "#e8a87c",
              fontSize: 20,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {topic}
          </span>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 50 ? 52 : 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: "24px",
            fontStyle: "italic",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 26,
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {description.length > 150
            ? description.substring(0, 150) + "..."
            : description}
        </p>
      </div>

      {/* Bottom section - Author/Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Author avatar */}
          <img
            src="https://github.com/sankalpaacharya.png"
            width={56}
            height={56}
            style={{
              borderRadius: "50%",
              border: "2px solid rgba(232, 168, 124, 0.5)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Sankalpa Acharya
            </span>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: 16,
              }}
            >
              inside-react.vercel.app
            </span>
          </div>
        </div>

        {/* Decorative element */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "#e8a87c",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "20px",
              height: "4px",
              backgroundColor: "rgba(232, 168, 124, 0.5)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "4px",
              backgroundColor: "rgba(232, 168, 124, 0.3)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}

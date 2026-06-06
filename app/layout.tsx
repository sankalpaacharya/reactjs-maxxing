import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reactjs-maxxing.vercel.app"),
  alternates: {
    types: {
      "application/rss+xml": "https://reactjs-maxxing.vercel.app/rss.xml",
    },
  },
  title: "reactjs maxxing | Sanku's Blog",
  description:
    "Deep dives into React internals, Fiber architecture, and modern web development",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reactjs-maxxing.vercel.app",
    siteName: "reactjs maxxing",
    title: "reactjs maxxing | Sanku's Blog",
    description:
      "Deep dives into React internals, Fiber architecture, and modern web development",
    images: [
      {
        url: "https://reactjs-maxxing.vercel.app/Reactjs%20Maxxing.png",
        width: 1200,
        height: 630,
        alt: "reactjs maxxing - Sanku's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside React | Sanku's Blog",
    description:
      "Deep dives into React internals, Fiber architecture, and modern web development",
    images: ["https://reactjs-maxxing.vercel.app/Reactjs%20Maxxing.png"],
    creator: "@user_sankalpa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

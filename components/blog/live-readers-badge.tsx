"use client";

import { useEffect, useState } from "react";
import Pusher, { type PresenceChannel } from "pusher-js";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LiveReadersBadgeProps {
  slug: string;
  className?: string;
}

export function LiveReadersBadge({ slug, className }: LiveReadersBadgeProps) {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!key || !cluster) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("LiveReadersBadge: missing Pusher env vars.");
      }
      setCount(0);
      return;
    }

    const channelName = `presence-blog-${slug}`;
    const pusher = new Pusher(key, {
      cluster,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(channelName) as PresenceChannel;

    channel.bind(
      "pusher:subscription_succeeded",
      (members: { count: number }) => {
        setCount(members.count);
      },
    );

    channel.bind("pusher:subscription_error", (status: number) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("LiveReadersBadge: subscription error", status);
      }
      setCount(0);
    });

    pusher.connection.bind("error", (error: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("LiveReadersBadge: connection error", error);
      }
      setCount(0);
    });

    channel.bind("pusher:member_added", () => {
      setCount((prev) => (prev ?? 0) + 1);
    });

    channel.bind("pusher:member_removed", () => {
      setCount((prev) => Math.max(0, (prev ?? 1) - 1));
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [slug]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("fixed bottom-4 left-4 z-50 hidden sm:block", className)}>
      <Badge
        variant="secondary"
        className="group border border-foreground/10 bg-background/70 text-foreground/80 shadow-sm backdrop-blur"
        aria-label={`${count} reading now`}
      >
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-xs tabular-nums">{count}</span>
        <span className="ml-1 hidden text-xs text-foreground/70 group-hover:inline">
          reading now
        </span>
      </Badge>
    </div>
  );
}

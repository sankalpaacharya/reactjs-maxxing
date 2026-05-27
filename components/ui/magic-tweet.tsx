"use client"

import { useEffect, useRef, useState } from "react"
import { enrichTweet, type EnrichedTweet } from "react-tweet"
import { type Tweet } from "react-tweet/api"
import {ArrowUpRight01Icon, Comment01Icon, Bookmark01Icon, RepeatIcon, FavouriteIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

interface TwitterIconProps {
    className?: string
    [key: string]: unknown
}

const Twitter = ({ className, ...props }: TwitterIconProps) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
        </g>
    </svg>
)

const Verified = ({ className, ...props }: TwitterIconProps) => (
    <svg
        aria-label="Verified Account"
        viewBox="0 0 24 24"
        className={className}
        {...props}
    >
        <g fill="currentColor">
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
        </g>
    </svg>
)

export const truncateText = (str: string | null, length: number) => {
    if (!str || str.length <= length) return str
    return `${str.slice(0, length - 3)}...`
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toString()
}

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
    <div className="flex flex-row items-start justify-between tracking-normal">
        <div className="flex items-center space-x-3">
            <div className="relative z-20">
                <a href={tweet.user.url} target="_blank" rel="noreferrer">
                    <img
                        title={`Profile picture of ${tweet.user.name}`}
                        alt={tweet.user.screen_name}
                        height={48}
                        width={48}
                        src={tweet.user.profile_image_url_https}
                        className="border-border/50 overflow-hidden rounded-full border"
                    />
                </a>
            </div>
            <div className="flex flex-col gap-0.5">
                <a
                    href={tweet.user.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground relative z-20 flex items-center font-medium whitespace-nowrap transition-opacity hover:opacity-80"
                >
                    {truncateText(tweet.user.name, 20)}
                    {tweet.user.verified ||
                        (tweet.user.is_blue_verified && (
                            <Verified className="ml-1 inline size-4 text-blue-500" />
                        ))}
                </a>
                <div className="flex items-center space-x-1">
                    <a
                        href={tweet.user.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground relative z-20 text-sm transition-colors"
                    >
                        @{truncateText(tweet.user.screen_name, 16)}
                    </a>
                </div>
            </div>
        </div>
        <div className="relative z-20">
            <a href={tweet.url} target="_blank" rel="noreferrer">
                <span className="sr-only">Link to tweet</span>
                <Twitter className="text-muted-foreground hover:text-foreground size-5 items-start transition-all ease-in-out hover:scale-105" />
            </a>
        </div>
    </div>
)

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
    <div className="text-[15px] leading-relaxed tracking-normal wrap-break-word">
        {tweet.entities.map((entity, idx) => {
            switch (entity.type) {
                case "url":
                case "symbol":
                case "hashtag":
                case "mention":
                    return (
                        <a
                            key={idx}
                            href={entity.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground relative z-20 text-[15px] font-normal transition-colors"
                        >
                            <span>{entity.text}</span>
                        </a>
                    )
                case "text":
                    return (
                        <span
                            key={idx}
                            className="text-foreground text-[15px] font-normal"
                            dangerouslySetInnerHTML={{ __html: entity.text }}
                        />
                    )
            }
        })}
    </div>
)

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
    if (!tweet.video && !tweet.photos) return null
    return (
        <div className="flex flex-1 items-center justify-center">
            {tweet.video && (
                <video
                    poster={tweet.video.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="rounded-xl border shadow-sm"
                >
                    <source src={tweet.video.variants[0].src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            {tweet.photos && (
                <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto">
                    <div className="shrink-0 snap-center sm:w-2" />
                    {tweet.photos.map((photo) => (
                        <img
                            key={photo.url}
                            src={photo.url}
                            width={photo.width}
                            height={photo.height}
                            title={"Photo by " + tweet.user.name}
                            alt={tweet.text}
                            className="h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
                        />
                    ))}
                    <div className="shrink-0 snap-center sm:w-2" />
                </div>
            )}
            {!tweet.video &&
                !tweet.photos &&
                // @ts-expect-error package doesn't have type definitions
                tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && (
                    <img
                        src={
                            // @ts-expect-error package doesn't have type definitions
                            tweet.card.binding_values.thumbnail_image_large.image_value.url
                        }
                        className="h-64 rounded-xl border object-cover shadow-sm"
                        alt={tweet.text}
                    />
                )}
        </div>
    )
}

export const TweetStats = ({ 
    comments, 
    reposts, 
    likes,
    bookmarks 
}: { 
    comments?: number
    reposts?: number
    likes?: number
    bookmarks?: number
}) => {
    const stats = [
        { 
            icon: Comment01Icon, 
            count: comments, 
            label: 'Comments', 
            hoverBg: 'hover:bg-sky-50 dark:hover:bg-sky-900/20',
            hoverText: 'hover:text-blue-500'
        },
        { 
            icon: RepeatIcon, 
            count: reposts, 
            label: 'Reposts', 
            hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
            hoverText: 'hover:text-green-500'
        },
        { 
            icon: FavouriteIcon, 
            count: likes, 
            label: 'Likes', 
            hoverBg: 'hover:bg-pink-50 dark:hover:bg-pink-900/20',
            hoverText: 'hover:text-pink-500'
        },
        { 
            icon: Bookmark01Icon, 
            count: bookmarks, 
            label: 'Bookmarks', 
            hoverBg: 'hover:bg-sky-50 dark:hover:bg-sky-900/20',
            hoverText: 'hover:text-blue-500'
        },
    ]

    return (
        <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            {stats.map((stat) => (
                <button
                    key={stat.label}
                    type="button"
                    className={cn(
                        "flex items-center gap-1 rounded-full p-2 transition-colors cursor-pointer",
                        stat.hoverBg,
                        stat.hoverText
                    )}
                    aria-label={stat.label}
                >
                    <HugeiconsIcon 
                        icon={stat.icon} 
                        size={20}
                    />
                    {stat.count !== undefined && stat.count > 0 && (
                        <span className="text-sm">{formatNumber(stat.count)}</span>
                    )}
                </button>
            ))}
        </div>
    )
}

export const MagicTweet = ({
    tweet,
    className,
    comments,
    reposts,
    likes,
    bookmarks,
    ...props
}: {
    tweet: Tweet | null | undefined
    className?: string
    comments?: number
    reposts?: number
    likes?: number
    bookmarks?: number
}) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    let enrichedTweet: EnrichedTweet | null = null
    if (tweet) {
        try {
            enrichedTweet = enrichTweet(tweet)
        } catch (err) {
            console.error("Failed to enrich tweet:", err)
        }
    }

    useEffect(() => {
        if (!contentRef.current) return

        const checkOverflow = () => {
            if (contentRef.current) {
                // Add a small buffer to avoid flickering
                setIsOverflowing(
                    contentRef.current.scrollHeight > contentRef.current.clientHeight + 1
                )
            }
        }

        const observer = new ResizeObserver(checkOverflow)
        observer.observe(contentRef.current)

        // Initial check and a check after a small delay to handle late-loading content
        checkOverflow()
        const timer = setTimeout(checkOverflow, 500)

        return () => {
            observer.disconnect()
            clearTimeout(timer)
        }
    }, [tweet])

    if (!enrichedTweet) {
        return (
            <div className="flex h-fit w-full max-w-lg items-center justify-center rounded-xl border p-10">
                <p className="text-muted-foreground">Tweet not available</p>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "group relative flex h-fit w-full max-w-lg flex-col overflow-hidden rounded-xl border transition-all hover:bg-muted/50",
                className
            )}
            {...props}
        >
            <div className="relative p-5">
                <div
                    ref={contentRef}
                    className={cn(
                        "relative flex max-h-[400px] flex-col gap-4 overflow-hidden transition-all",
                        isOverflowing && "[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
                    )}
                >
                    <TweetHeader tweet={enrichedTweet} />
                    <TweetBody tweet={enrichedTweet} />
                    <TweetMedia tweet={enrichedTweet} />
                    <TweetStats comments={comments} reposts={reposts} likes={likes} bookmarks={bookmarks} />
                </div>


            </div>
        </div>
    )
}

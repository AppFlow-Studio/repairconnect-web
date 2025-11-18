"use client"

import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { ChevronMarqueeButton } from './ui/chevron-marquee-button'
import FadeInCard from './fade-in-card'

const blogPosts = [
    {
        id: 1,
        headline: "Book Car Repairs in NYC in Just 6 Taps",
        author: "by Bilal Ahmad",
        background: "/quote.png",
        backgroundType: "image" as const
    },
    {
        id: 2,
        headline: "Book Car Repairs in NYC in Just 2 Minutes",
        author: "by Bilal Ahmad",
        background: "/appointment.png",
        backgroundType: "image" as const,
        icon: "🔧" // Wrench icon
    },
    {
        id: 3,
        headline: "Join Us Launching the Fair Way to Fix Cars",
        author: "by Bilal Ahmad",
        background: "/book.png",
        backgroundType: "image" as const
    }
]

export default function BlogSection() {
    return (
        <section className="w-full px-6 lg:px-12 py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <h2 className="sm:text-4xl text-2xl text-black mb-4"
                        style={{ fontFamily: "var(--font-Jersey_20)" }}
                    >
                        Driving the Future of Car Care
                    </h2>
                    <a
                        href="/articles"
                        className="inline-flex items-center gap-2 underline-offset-3 text-black underline hover:opacity-80 transition-opacity text-xs sm:text-sm"
                    >
                        Read more articles
                        <ChevronMarqueeButton className='' />
                    </a>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-8">
                    {blogPosts.map((post) => (
                        <FadeInCard
                            key={post.id}
                            className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer"
                        >
                            {/* Background */}
                            {post.backgroundType === "image" ? (
                                <div className="absolute inset-0">
                                    <Image
                                        src={post.background}
                                        alt={post.headline}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ) : (
                                <div className={`absolute inset-0 ${post.background} flex items-center justify-center`}>
                                    <div className="text-white/20 text-8xl">{post.icon}</div>
                                </div>
                            )}

                            {/* Liquid Glass Overlay */}
                            <div className="absolute inset-0 flex items-end justify-center sm:p-8 p-2">
                                <div className="relative w-full">
                                    {/* Liquid Glass Background Overlay */}
                                    <div
                                        className="relative rounded-lg overflow-hidden backdrop-blur-[15px] "
                                    >


                                        {/* Content */}
                                        <div className="relative z-10 p-4 text-center">
                                            <h3 className="text-white tracking-28 sm:tracking-32 font-af text-[15px] sm:text-[18px] font-medium leading-[130%] tracking-[-0.18px] text-center mb-2 sm:mb-4 line-clamp-2">
                                                {post.headline}
                                            </h3>
                                            <p className="text-sm text-white/70">
                                                {post.author}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInCard>
                    ))}
                </div>
            </div>
        </section>
    )
}


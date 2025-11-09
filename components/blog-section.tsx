"use client"

import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const blogPosts = [
    {
        id: 1,
        headline: "Book Car Repairs in NYC in 6 Taps",
        author: "by Bilal Ahmed",
        background: "/blog-1.jpg", // You'll need to add this image
        backgroundType: "image" as const
    },
    {
        id: 2,
        headline: "Book Car Repairs in NYC in Under 2 Minutes",
        author: "by Bilal Ahmed",
        background: "bg-blue-400", // Light blue background
        backgroundType: "color" as const,
        icon: "🔧" // Wrench icon
    },
    {
        id: 3,
        headline: "Help Us Launch the Fair Way to Fix Your Car",
        author: "by Bilal Ahmed",
        background: "/blog-3.jpg", // You'll need to add this image with gears/wrenches
        backgroundType: "image" as const
    }
]

export default function BlogSection() {
    return (
        <section className="w-full px-6 lg:px-12 py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-black mb-4">
                        Our vision for the future of the world
                    </h2>
                    <a
                        href="/articles"
                        className="inline-flex items-center gap-2 text-black underline hover:opacity-80 transition-opacity"
                    >
                        Read more articles
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer"
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
                            <div className="absolute inset-0 flex items-end justify-center p-6 lg:p-8">
                                <div className="relative w-full">
                                    {/* SVG Filter Definition for Liquid Glass Effect */}
                                    <svg style={{ display: 'none' }}>
                                        <filter id={`liquid-glass-filter-${post.id}`}>
                                            <feTurbulence
                                                type="turbulence"
                                                baseFrequency="0.08"
                                                numOctaves="8"
                                                result="turbulence"
                                            />
                                            <feDisplacementMap
                                                in="SourceGraphic"
                                                in2="turbulence"
                                                scale="200"
                                                xChannelSelector="R"
                                                yChannelSelector="G"
                                            />
                                        </filter>
                                    </svg>

                                    {/* Liquid Glass Background Overlay */}
                                    <div
                                        className="relative rounded-2xl overflow-hidden backdrop-blur-[15px] border border-white/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-gradient-to-r from-white/10 via-white/5 to-white/5 bg-clip-padding"
                                        style={{
                                            filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{
                                                boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                            }}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 p-6 lg:p-8 text-center">
                                            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 leading-tight">
                                                {post.headline}
                                            </h3>
                                            <p className="text-sm lg:text-base text-white/90">
                                                {post.author}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}


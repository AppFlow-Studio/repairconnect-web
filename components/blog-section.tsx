"use client"

import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const blogPosts = [
    {
        id: 1,
        headline: "Book Car Repairs in NYC in 6 Taps",
        author: "by Bilal Ahmed",
        background: "/quote.png",
        backgroundType: "image" as const
    },
    {
        id: 2,
        headline: "Book Car Repairs in NYC in Under 2 Minutes",
        author: "by Bilal Ahmed",
        background: "/appointment.png", 
        backgroundType: "image" as const,
        icon: "🔧" // Wrench icon
    },
    {
        id: 3,
        headline: "Help Us Launch the Fair Way to Fix Your Car",
        author: "by Bilal Ahmed",
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
                    <h2 className="text-4xl font-serif text-black mb-4">
                        Driving the Future of Car Care
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
                            <div className="absolute inset-0 flex items-end justify-center p-6 ">
                                <div className="relative w-full">
                                    {/* Liquid Glass Background Overlay */}
                                    <div
                                        className="relative rounded-2xl overflow-hidden backdrop-blur-[15px] "
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
                                            <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                                                {post.headline}
                                            </h3>
                                            <p className="text-sm text-white/90">
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


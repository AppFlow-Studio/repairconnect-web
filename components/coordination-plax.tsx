import React, { useState, useRef, useEffect } from 'react'
import Coordination from './coordination'
import Image from 'next/image'
import { Wrench, CheckCircle } from 'lucide-react'
import BlogSection from './blog-section'
import { TypingAnimation } from './ui/typing-animation'
import { motion } from 'motion/react'
import FadeInCard from './fade-in-card'
const endtoend = [
    'bookings',
    'payments',
    'pickups',
    'reminders',
    'diagnostics',
    'receipts',
    'scheduling',
    'coordinating'
]
export default function CoordinationPlax() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    return (
        <div className=' relative h-[720vh] '>
            <Coordination />

            <div className='relative h-screen '>
                {/* White fade overlay for smooth transition */}
                <div
                    className="absolute -top-8 sm:-top-9 pointer-events-none z-20 w-full h-1/7 sm:h-1/6"
                    style={{
                        background: "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.7) 20%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.1) 40%, transparent 50%)",
                    }}
                />
                <section className="w-full md:min-h-screen h-screen flex flex-col items-center justify-center relative sm:aspect-auto aspect-9/16 bg-linear-to-b from-transparent via-white to-white z-20 ">
                    <section className="w-[90%] mx-auto relative lg:aspect-video lg:h-auto h-[80%]  aspect-square overflow-hidden rounded-2xl border-4 border-black/20 bg-white">
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden ">
                            <Image
                                src="/Repairconnect-home2.jpg"
                                alt="Otopair Hero"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                background: "linear-gradient(to bottom, rgba(30,30,32,0.3) 80%, transparent 120%)"
                            }}
                        />


                        <div className="flex flex-col gap-4 sm:gap-10 items-start w-full">
                            {/* Main Content Box - Top Left */}
                            <div className="relative z-10 pt-2 sm:pt-0 sm:px-8 px-4 w-full">
                                <div className="sm:p-6 p-4 lg:p-14 rounded-xl sm:rounded-2xl">
                                    {/* Main Headline */}
                                    <p className="sm:text-3xl text-2xl xl:text-5xl text-white mb-2 sm:mb-4 leading-12 xl:max-w-xl max-w-lg"
                                        style={{ fontFamily: "var(--font-Jersey_20)" }}
                                    >
                                        Otopair lets you manage repairs end to end
                                    </p>

                                    {/* Sub-headline */}
                                    <p className="text-base lg:text-lg text-white/90 mb-4 sm:mb-6 leading-relaxed xl:max-w-4xl max-w-2xl">
                                        Otopair helps manage <TypingAnimation words={endtoend} loop />
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full justify-start gap-3 sm:gap-4 xl:max-w-4xl max-w-2xl">
                                        {/* Join Waitlist Button */}
                                        <div className="relative w-full sm:w-82 h-full flex gap-4">
                                            {/* SVG Filter Definition */}
                                            <svg style={{ display: 'none' }}>
                                                <filter id="displacementFilter">
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

                                            {/* Liquid Glass Input Background */}
                                            <div
                                                className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden"
                                                style={{
                                                    filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                                    backdropFilter: 'brightness(1.1) blur(2px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.7)',
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-xl sm:rounded-2xl"
                                                    style={{
                                                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                                    }}
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl relative z-20 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-50 w-full xl:text-lg text-sm sm:text-base placeholder-gray-100 flex-1"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={submitted}
                                                style={{ background: "transparent" }}
                                            />
                                        </div>
                                        {/* Liquid Glass Button Wrapper */}
                                        <div className="relative w-full sm:w-fit z-20 h-full flex items-center sm:ml-2">
                                            <div
                                                className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden"
                                                style={{
                                                    filter: 'drop-shadow(-8px -10px 50px #0000005f)',
                                                    backdropFilter: 'brightness(1.1) blur(2px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-xl sm:rounded-2xl"
                                                    style={{
                                                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                                    }}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full sm:w-auto xl:px-8 px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-white font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-blue-900 hover:bg-blue-950 relative z-20"
                                                style={{ background: "rgba(37, 99, 235, 0.7)", backdropFilter: "brightness(2) blur(2px)" }}
                                                disabled={submitted || !email}
                                            >
                                                {submitted ? "Submitted!" : "Join Waitlist"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Box - Bottom Left */}
                            <div className="z-10 max-w-xl sm:p-14 p-4 sm:absolute relative xl:bottom-1/5 sm:bottom-0 bottom-auto left-0 sm:-left-10">
                                <div className="relative p-3 sm:p-5 lg:p-10 sm:ml-8 ml-0 rounded-xl sm:rounded-2xl">

                                    {/* Content */}
                                    <div className="relative z-10 flex sm:flex-row flex-col sm:items-center gap-2 sm:gap-3">
                                        <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                                        <p className="text-xs sm:text-sm lg:text-base text-white font-medium leading-relaxed">
                                            Everyone needs coordination not everyone has it
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Apple-like Notification - Mobile Only */}
                            {/* <FadeInCard
                                className="absolute bottom-6 left-4 sm:left-0  right-4 z-30"
                            // initial={{ opacity: 0, y: 20 }} 
                            // animate={{ opacity: 1, y: 0 }}
                            // transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                            >
                                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 max-w-sm mx-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-200/50 to-blue-300/50 flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
                                            <Image
                                                src="/logo.png"
                                                alt="Otopair Logo"
                                                fill
                                                className="object-cover rounded-xl z-20"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                                                    Otopair is Here
                                                </h3>
                                                <span className="text-[10px] text-gray-500 ml-2 shrink-0">now</span>
                                            </div>
                                            <p className="text-xs text-gray-700 leading-relaxed">
                                                The future of car repair is here. Get instant quotes, book mechanics, and manage everything from one app.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInCard> */}
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}
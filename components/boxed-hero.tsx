import { Wrench } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { LaserFlow } from './ui/laser-beam'
export default function BoxedHero() {
    return (
        <section className="w-full border min-h-screen flex items-center justify-center relative">
            <section className="w-[90%] mx-auto  aspect-video  overflow-hidden rounded-2xl ring-4 ring-black/10 relative">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden ">
                    <Image
                        src="/repairconnect-home.jpeg"
                        alt="RepairConnect Hero"
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


                <div className="flex flex-col gap-10 items-start">
                    {/* Main Content Box - Top Left */}
                    <div className="relative z-10 pt-2 px-8 max-w-4xl">
                        <div className="p-6 lg:p-14 rounded-2xl ">
                            {/* Main Headline */}
                            <p className="text-3xl lg:text-5xl text-white mb-4 leading-tight"
                                style={{ fontFamily: "var(--font-Roboto_Slab)" }}
                            >
                                RepairConnect lets you manage repairs end to end
                            </p>

                            {/* Sub-headline */}
                            <p className="text-base lg:text-lg text-white/90 mb-6 leading-relaxed">
                                RepairConnect can help you with things like bookings, scheduling, and coordinating with mechanics to make car care seamless.
                            </p>

                            <div className="flex flex-row items-center w-full justify-start gap-4">
                                {/* Join Waitlist Button */}
                                <div className="relative w-82 h-full flex gap-4">
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
                                        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                                        style={{
                                            filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                            backdropFilter: 'brightness(1.1) blur(2px)',
                                            border: '1px solid rgba(255, 255, 255, 0.7)',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{
                                                boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="px-5 py-3 rounded-2xl relative z-20 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-50 w-full text-lg placeholder-gray-100 flex-1"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={submitted}
                                        style={{ background: "transparent" }}
                                    />
                                </div>
                                {/* Liquid Glass Button Wrapper */}
                                <div className="relative w-fit z-20 h-full flex items-center ml-2">
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                                        style={{
                                            filter: 'drop-shadow(-8px -10px 50px #0000005f)',
                                            backdropFilter: 'brightness(1.1) blur(2px)',
                                            border: '1px solid rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{
                                                boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 rounded-2xl text-white font-semibold text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 relative z-20"
                                        style={{ background: "rgba(37, 99, 235, 0.7)", backdropFilter: "brightness(1.1) blur(2px)" }}
                                        disabled={submitted || !email}
                                    >
                                        {submitted ? "Submitted!" : "Join Waitlist"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Box - Bottom Left */}
                    <div className=" z-10 max-w-xl p-14 ">
                        <div className="relative p-5 lg:p-10 ml-8 rounded-2xl  border border-white/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-gradient-to-r from-black/12 via-black/7 to-black/7 bg-clip-padding">
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
                                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                                style={{
                                    filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                    backdropFilter: 'brightness(1.1) blur(2px)',
                                    border: '1px solid rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl"
                                    style={{
                                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                    }}
                                />
                            </div>
                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-3">
                                <Wrench className="w-5 h-5 text-white shrink-0" />
                                <p className="text-sm lg:text-base text-white font-medium leading-relaxed">
                                    Everyone needs coordination not everyone has it
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    )
}
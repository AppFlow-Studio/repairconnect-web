"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900" />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.4) 100%)',
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%)',
                }}
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-8"
                >
                    <div className="relative w-20 h-20">
                        <Image
                            src="/logo.png"
                            alt="Otopair Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* 404 Number with animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                    }}
                    className="mb-6"
                >
                    <h1
                        className="text-9xl sm:text-[12rem] lg:text-[16rem] font-semibold text-white leading-none"
                        style={{
                            fontFamily: "var(--font-Jersey_20)",
                            textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        404
                    </h1>
                </motion.div>

                {/* Glitch effect overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        opacity: [0, 0.1, 0],
                    }}
                    transition={{
                        duration: 0.3,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                >
                    <h1
                        className="text-9xl sm:text-[12rem] lg:text-[16rem] font-semibold text-white leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            fontFamily: "var(--font-Jersey_20)",
                            textShadow: '2px 0 rgba(59, 130, 246, 0.8), -2px 0 rgba(236, 72, 153, 0.8)',
                        }}
                    >
                        404
                    </h1>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 text-center"
                    style={{
                        fontFamily: "var(--font-Jersey_20)",
                    }}
                >
                    Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center text-base sm:text-lg text-white/70 mb-12 max-w-md px-4 leading-relaxed"
                >
                    Looks like this page took a wrong turn. Let's get you back on the road.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    {/* Home button */}
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group"
                            style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 1) 100%)',
                                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                <Home className="w-5 h-5" />
                                Back to Home
                            </span>
                        </motion.button>
                    </Link>

                    {/* Go back button */}
                    <motion.button
                        onClick={() => window.history.back()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all"
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17
                        }}
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </span>
                    </motion.button>
                </motion.div>

                {/* Decorative elements */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm"
                >
                    <div className="w-12 h-px bg-white/20" />
                    <span>Otopair</span>
                    <div className="w-12 h-px bg-white/20" />
                </motion.div> */}
            </div>
        </div>
    );
}


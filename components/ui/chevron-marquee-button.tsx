"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface ChevronMarqueeButtonProps {
    className?: string;
    iconSize?: string;
    containerSize?: string;
}

export function ChevronMarqueeButton({
    className = "",
    iconSize = "w-3 sm:w-4 h-3 sm:h-4",
    containerSize = "w-3 sm:w-4 h-4 sm:h-5"
}: ChevronMarqueeButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`flex items-center justify-center ${containerSize} py-1 rounded-full border border-gray-200 relative overflow-hidden cursor-pointer group/chevron ${className}`}
            style={{
                background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
                // boxShadow: 'rgba(0, 0, 0, 0.04) 0px 1px 1px 0px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Fade gradients on edges */}
            <div className="absolute inset-0 pointer-events-none z-10 flex justify-between">
                <motion.div
                    className="w-3 h-full bg-linear-to-r from-white/20 to-transparent"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                />
                <motion.div
                    className="w-3 h-full bg-linear-to-l from-white/20 to-transparent"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                />
            </div>

            {/* Inner container with overflow hidden */}
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                {/* Centered icon when not hovered */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={!isHovered ? {
                        opacity: 1,
                        scale: 1,
                    } : {
                        opacity: 0,
                        scale: 0.8,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >
                    <ChevronRight className={iconSize} />
                </motion.div>

                {/* Marquee icons when hovered */}
                <motion.div
                    className="absolute inset-0 flex items-center"
                    animate={isHovered ? {
                        x: [-24, 0],
                        opacity: 1,
                    } : {
                        x: 0,
                        opacity: 0,
                    }}
                    transition={{
                        x: {
                            duration: 0.8,
                            repeat: isHovered ? Infinity : 0,
                            ease: "linear",
                        },
                        opacity: {
                            duration: 0.3,
                            ease: "easeIn",
                        },
                    }}
                    style={{
                        width: "200px",
                        display: "flex",
                        gap: "8px",
                    }}
                >
                    {[...Array(6)].map((_, i) => (
                        <ChevronRight key={i} className={`${iconSize} shrink-0 opacity-70`} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}


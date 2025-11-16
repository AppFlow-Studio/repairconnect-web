"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, useMotionValueEvent } from "motion/react";
import { Car, Brain, UserRoundCog, Calendar, CheckCircle, Server, DollarSign, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Mechanic {
    id: string;
    name: string;
    shop: string;
    price: number;
    rating: number;
}

const mechanics: Mechanic[] = [
    { id: "1", name: "Mike", shop: "Mike's Auto", price: 150, rating: 4.8 },
    { id: "2", name: "Sarah", shop: "Quick Fix Garage", price: 175, rating: 4.9 },
    { id: "3", name: "Tom", shop: "Tom's Service", price: 200, rating: 4.7 },
];

const stepData = [
    {
        value: "step-1",
        title: "AI Diagnostics & Service Discovery",
        description: "Our AI instantly analyzes your vehicle's data to pinpoint the exact issue. Then it finds verified mechanics in your area who specialize in your specific repair.",
        icon: Server,
    },
    {
        value: "step-2",
        title: "Direct Pricing",
        description: "See real-time prices from multiple shops instantly—no phone calls needed. Compare options side-by-side and choose the best value for your repair.",
        icon: DollarSign,
    },
    {
        value: "step-3",
        title: "Calendar Sync & Availability Check",
        description: "We automatically check your mechanic's real-time availability and hold your preferred time slot. Get the appointment that fits your schedule perfectly.",
        icon: Calendar,
    },
    {
        value: "step-4",
        title: "Booking Confirmation & Details",
        description: "Your appointment is confirmed instantly with all the details you need. No phone calls, no back-and-forth—just a ready-to-go booking.",
        icon: CheckCircle,
    },
];

// Data Packet Component for mobile
const MobileDataPacket = ({
    progress,
    startX,
    startY,
    endX,
    endY,
    label,
    delay = 0,
    verticalOffset = 0
}: {
    progress: any;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    label: string;
    delay?: number;
    verticalOffset?: number;
}) => {
    const packetProgress = useTransform(progress, (p: number) => {
        if (p < delay) return 0;
        const adjustedP = (p - delay) / (1 - delay);
        return Math.min(1, Math.max(0, adjustedP));
    });

    const x = useTransform(packetProgress, (t) => {
        return startX + (endX - startX) * t;
    });

    const y = useTransform(packetProgress, (t) => {
        const distance = Math.abs(endX - startX);
        const arcHeight = Math.max(30, distance * 0.15);
        const midY = Math.min(startY, endY) - arcHeight;
        return (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * (midY + verticalOffset) + t * t * endY;
    });

    const opacity = useTransform(packetProgress, (p) => {
        if (p <= 0 || p >= 1) return 0;
        if (p < 0.1) return p / 0.1;
        if (p > 0.9) return (1 - p) / 0.1;
        return 1;
    });

    const scale = useTransform(packetProgress, (p) => {
        if (p <= 0 || p >= 1) return 0.8;
        return 0.9 + Math.sin(p * Math.PI) * 0.1;
    });

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: x,
                top: y,
                x: "-50%",
                y: "-50%",
                opacity: opacity,
                scale: scale,
            }}
        >
            <div className="px-2 py-1 rounded-md bg-linear-to-br from-blue-500/95 via-cyan-500/95 to-blue-600/95 backdrop-blur-md border border-blue-400/60 shadow-xl text-[7px] font-mono font-semibold text-white whitespace-nowrap relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent rounded-lg" />
                <span className="relative z-10">{label}</span>
                <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                        x: ['-100%', '200%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>
        </motion.div>
    );
};

// Diagnostic Icon Component for mobile
const MobileDiagnosticIcon = ({
    progress,
    startX,
    startY,
    endX,
    endY
}: {
    progress: any;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}) => {
    const diagnosticProgress = useTransform(progress, (p: number) => {
        if (p < 0.1) return 0;
        return (p - 0.1) / 0.9;
    });

    const x = useTransform(diagnosticProgress, (t) => startX + (endX - startX) * t);
    const y = useTransform(diagnosticProgress, (t) => startY + (endY - startY) * t);
    const opacity = useTransform(diagnosticProgress, (p) => {
        return p > 0 && p < 1 ? 1 : 0;
    });

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: x,
                top: y,
                x: "-50%",
                y: "-50%",
                opacity: opacity,
            }}
            animate={{
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-purple-600 backdrop-blur-xl border-2 border-purple-400/60 shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent rounded-full" />
                <CheckCircle2 className="w-3 h-3 text-white relative z-10 drop-shadow-lg" />
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-300/50"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            </div>
        </motion.div>
    );
};

// Step 1 Visualization - AI Diagnostics with auto-play animation
const Step1Visualization = ({ isOpen }: { isOpen: boolean }) => {
    const animationProgress = useMotionValue(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isOpen && !hasAnimated) {
            // Reset and start animation
            animationProgress.set(0);
            setHasAnimated(true);

            // Animate from 0 to 1 over 3 seconds using requestAnimationFrame
            const startTime = Date.now();
            const duration = 5500; // 5 seconds

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease in-out function
                const easedProgress = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                animationProgress.set(easedProgress);
                // console.log(easedProgress);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            const frameId = requestAnimationFrame(animate);

            return () => {
                cancelAnimationFrame(frameId);
            };
        } else if (!isOpen) {
            // Reset when closed
            setHasAnimated(false);
            animationProgress.set(0);
        }
    }, [isOpen, hasAnimated, animationProgress]);

    // Phase breakdown: 0-33% data packets, 33-66% AI processing, 66-100% return signal
    const phase1Progress = useTransform(animationProgress, (p) => {
        if (p < 0.33) return p / 0.33;
        return 1;
    });

    const phase2Progress = useTransform(animationProgress, (p) => {
        if (p < 0.33) return 0;
        if (p < 0.66) return (p - 0.33) / 0.33;
        return 1;
    });

    const phase3Progress = useTransform(animationProgress, (p) => {
        if (p < 0.66) return 0;
        return (p - 0.66) / 0.34;
    });

    // Path animations
    const phase1DashOffset = useTransform(phase1Progress, (p) => 240 - (p * 240));
    const returnSignalDashOffset = useTransform(phase3Progress, (p) => 240 - (p * 240));
    const phase1Opacity = useTransform(phase1Progress, (p) => p > 0 ? 1 : 0);
    const phase3Opacity = useTransform(phase3Progress, (p) => p > 0 ? 1 : 0);

    // AI Brain glow animation
    const aiBrainGlow = useTransform(phase2Progress, (p) => {
        if (p === 0) return 0.3;
        return 0.3 + (p * 0.7);
    });


    // // AI Brain should be visible during phase 1 and phase 2, disappear when phase 3 starts
    // const aiBrainVisible = useTransform(animationProgress, (p) => p < 0.66);

    // // Track AI brain visibility for reactive rendering
    // const [showAiBrain, setShowAiBrain] = useState(false);
    // useMotionValueEvent(aiBrainVisible, "change", (latest) => {
    //     setShowAiBrain(Boolean(latest));
    // });

    // Track phase progress for diagnostic icon
    const [showDiagnosticIcon, setShowDiagnosticIcon] = useState(false);
    useMotionValueEvent(phase2Progress, "change", (latest) => {
        setShowDiagnosticIcon(latest > 0 && latest <= 1);
    });

    // Track phase progress values for smooth text updates
    const [currentPhase1, setCurrentPhase1] = useState(0);
    const [currentPhase2, setCurrentPhase2] = useState(0);
    const [currentPhase3, setCurrentPhase3] = useState(0);

    useMotionValueEvent(phase1Progress, "change", (latest) => {
        setCurrentPhase1(latest);
    });

    useMotionValueEvent(phase2Progress, "change", (latest) => {
        setCurrentPhase2(latest);
    });

    useMotionValueEvent(phase3Progress, "change", (latest) => {
        setCurrentPhase3(latest);
    });


    return (
        <div className="relative w-full h-[300px] bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Data stream from Car to AI Brain - animated */}
                <motion.path
                    d="M 60 150 L 300 150"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="240"
                    strokeDashoffset={phase1DashOffset}
                    filter="url(#glow)"
                    style={{ opacity: phase1Opacity }}
                    transition={{ duration: 0.3 }}
                />

                {/* Return signal from AI Brain back to Car - animated */}
                <motion.path
                    d="M 300 150 L 60 150"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    strokeDasharray="240"
                    strokeDashoffset={returnSignalDashOffset}
                    filter="url(#glow)"
                    style={{ opacity: phase3Opacity }}
                    transition={{ duration: 0.1 }}
                />
            </svg>

            {/* Animated Data Packets - Phase 1 */}
            {phase1Progress.get() > 0 && phase1Progress.get() < 1 && (
                <>
                    <MobileDataPacket
                        progress={phase1Progress}
                        startX={60}
                        startY={150}
                        endX={300}
                        endY={150}
                        label="mileage: 84,032"
                        delay={0}
                        verticalOffset={-40}
                    />
                    <MobileDataPacket
                        progress={phase1Progress}
                        startX={60}
                        startY={160}
                        endX={300}
                        endY={150}
                        label="oil_life: 15%"
                        delay={0.08}
                        verticalOffset={-15}
                    />
                    <MobileDataPacket
                        progress={phase1Progress}
                        startX={60}
                        startY={170}
                        endX={300}
                        endY={150}
                        label="DTC: P0420"
                        delay={0.16}
                        verticalOffset={15}
                    />
                    <MobileDataPacket
                        progress={phase1Progress}
                        startX={60}
                        startY={190}
                        endX={300}
                        endY={150}
                        label="vin: ...X45B"
                        delay={0.24}
                        verticalOffset={40}
                    />
                </>
            )}

            {/* Car Node */}
            <div className="absolute left-[30px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.35) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                        }}
                    />
                    <Car className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                </div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-[8px] font-semibold text-white mb-0.5">Your Vehicle</p>
                    <p className="text-[7px] text-white/70 leading-tight w-16">
                        {currentPhase3 > 0 ? "Ready for mechanic search" :
                            currentPhase2 > 0 ? "AI analyzing..." :
                                currentPhase1 > 0 ? "Syncing Vehicle Data..." : "Starting point"}
                    </p>
                </motion.div>
            </div>

            {/* AI Brain Node - animated */}
            <AnimatePresence>
                <motion.div
                    className="absolute left-[210px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                        style={{
                            // scale: aiBrainPulseScale,
                            background: `linear-gradient(135deg, rgba(168, 85, 247, ${aiBrainGlow.get()}) 0%, rgba(236, 72, 153, ${aiBrainGlow.get() + 0.05}) 100%)`,
                            backdropFilter: 'blur(20px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: `0 8px 32px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.6}), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)`,
                        }}
                        animate={currentPhase2 > 0 ? {
                            boxShadow: [
                                `0 8px 32px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.6}), 0 0 40px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.8})`,
                                `0 8px 32px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.8}), 0 0 60px rgba(168, 85, 247, ${aiBrainGlow.get()})`,
                                `0 8px 32px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.6}), 0 0 40px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.8})`,
                            ],
                        } : {}}
                        transition={{
                            boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        }}
                    >
                        <div className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                            }}
                        />
                        <Brain className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                    </motion.div>
                    {/* AI Information Text Box - always visible when AI brain is visible */}
                    <motion.div
                        className="mt-2 px-2 py-1 rounded-lg text-center max-w-[80px] h-10"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                            backdropFilter: 'blur(12px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: currentPhase1 > 0.5 ? 1 : 0,
                            y: 0
                        }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-[7px] font-semibold text-white mb-0.5">
                            {currentPhase3 >= 1 ? "Complete" :
                                currentPhase3 > 0 ? "Signal Sent" :
                                    currentPhase2 > 0.5 ? "Diagnosis Complete" : "AI Diagnostics"}
                        </p>
                        <p className="text-[6px] text-white/70 leading-tight">
                            {currentPhase3 >= 0.5 ? "Ready for mechanic search" :
                                currentPhase3 > 0 ? "Sending diagnosis..." :
                                    currentPhase2 > 0.5
                                        ? "Catalyst System Issue"
                                        : currentPhase1 > 0.5
                                            ? "Processing data..."
                                            : "Receiving data..."}
                        </p>
                    </motion.div>
                </motion.div>

            </AnimatePresence>

            {/* Animated Diagnostic Icon - Phase 2: traveling from AI back to Car (during AI processing) */}
            {showDiagnosticIcon && (
                <MobileDiagnosticIcon
                    progress={phase2Progress}
                    startX={210}
                    startY={150}
                    endX={60}
                    endY={150}
                />
            )}
        </div>
    );
};

// Step 2 Visualization - Direct Pricing with auto-play animation
const Step2Visualization = ({ isOpen }: { isOpen: boolean }) => {
    const animationProgress = useMotionValue(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isOpen && !hasAnimated) {
            animationProgress.set(0);
            setHasAnimated(true);

            const startTime = Date.now();
            const duration = 5500; // 4 seconds

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easedProgress = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                animationProgress.set(easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            const frameId = requestAnimationFrame(animate);

            return () => {
                cancelAnimationFrame(frameId);
            };
        } else if (!isOpen) {
            setHasAnimated(false);
            animationProgress.set(0);
        }
    }, [isOpen, hasAnimated, animationProgress]);

    // Phase breakdown: 0-33% mechanic search, 33-66% selection, 66-100% price sending
    const step2Phase1Progress = useTransform(animationProgress, (p) => {
        if (p < 0.33) return p / 0.33;
        return 1;
    });

    const step2Phase2Progress = useTransform(animationProgress, (p) => {
        if (p < 0.33) return 0;
        if (p < 0.66) return (p - 0.33) / 0.33;
        return 1;
    });

    const step2Phase3Progress = useTransform(animationProgress, (p) => {
        if (p < 0.66) return 0;
        return (p - 0.66) / 0.34;
    });

    // Path animations - delay line drawing so mechanics appear first
    // Use a larger dash array to ensure it covers all path lengths
    const step2Phase1DashOffset = useTransform(step2Phase1Progress, (p) => {
        if (p < 0.25) return 500; // Keep line hidden until mechanics are visible
        const lineProgress = (p - 0.25) / 0.75;
        return 500 - (lineProgress * 500);
    });

    // Track phase progress for reactive updates
    const [currentPhase1, setCurrentPhase1] = useState(0);
    const [currentPhase2, setCurrentPhase2] = useState(0);
    const [currentPhase3, setCurrentPhase3] = useState(0);

    useMotionValueEvent(step2Phase1Progress, "change", (latest) => {
        setCurrentPhase1(latest);
    });

    useMotionValueEvent(step2Phase2Progress, "change", (latest) => {
        setCurrentPhase2(latest);
    });

    useMotionValueEvent(step2Phase3Progress, "change", (latest) => {
        setCurrentPhase3(latest);
    });

    // Track mechanics visibility
    const [mechanicsVisible, setMechanicsVisible] = useState(false);
    useMotionValueEvent(step2Phase1Progress, "change", (latest) => {
        setMechanicsVisible(latest > 0);
    });

    // Mechanic positions (mobile scaled) - spread out more
    // Node centers: w-10 h-10 = 40px, so center offset is 20px
    const mechanicPositions = [
        { x: 110, y: 70 },   // Selected (top-left)
        { x: 200, y: 130 },  // Middle (lower)
        { x: 140, y: 190 },   // Top-right (higher)
    ];

    // Path opacity - selected stays visible, others fade in phase 2
    const pathOpacity0 = useTransform(step2Phase1Progress, (p) => p > 0 ? 1 : 0);
    const pathOpacity1 = useTransform(animationProgress, (p) => {
        if (p < 0.1) return 1;
        if (p < 0.4) return Math.max(0, 1 - ((p - 0.1) / 0.3) * 1);
        return 0;
    });
    const pathOpacity2 = useTransform(animationProgress, (p) => {
        if (p < 0.1) return 1;
        if (p < 0.4) return Math.max(0, 1 - ((p - 0.1) / 0.3) * 1);
        return 0;
    });

    return (
        <div className="relative w-full h-[300px] bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow2">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Query lines from Car to Mechanics - animated */}
                {mechanics.map((mechanic, idx) => {
                    // Car position: left-[30px] with w-12 h-12 (48px diameter)
                    // Car center: 30px (left) + 24px (half width) = 54px
                    // Car right edge: 30px + 48px = 78px
                    // Start path from car right edge (where it visually connects to mechanics)
                    const carX = 5 + 48; // 78px - Car right edge X
                    const carY = 150; // Car center Y (half of 300px container height)
                    // Mechanic node center: position + half node size (w-10 h-10 = 40px, so +20px)
                    const mechanicX = mechanicPositions[idx].x + 20; // Center of mechanic node
                    const mechanicY = mechanicPositions[idx].y + 20; // Center of mechanic node
                    const midX = (carX + mechanicX) / 2;
                    // Quadratic curve: start at car right edge, curve up, end at mechanic center
                    // Path direction: M (move to start), Q (quadratic curve to end)
                    const pathD = `M ${carX} ${carY} Q ${midX} ${carY - 30} ${mechanicX} ${mechanicY}`;

                    const pathOpacity = idx === 0 ? pathOpacity0 : idx === 1 ? pathOpacity1 : pathOpacity2;

                    return (
                        <motion.path
                            key={`path-2-${mechanic.id}`}
                            d={pathD}
                            fill="none"
                            stroke="url(#pathGradient2)"
                            strokeWidth="2"
                            strokeDasharray="500"
                            strokeDashoffset={step2Phase1DashOffset}
                            filter="url(#glow2)"
                            style={{ opacity: pathOpacity }}
                            transition={{ duration: 0.3 }}
                        />
                    );
                })}
            </svg>

            {/* Car Node */}
            <div className="absolute left-[5px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.35) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                        }}
                    />
                    <Car className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                </div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-[8px] font-semibold text-white mb-0.5">Your Vehicle</p>
                    <p className="text-[7px] text-white/70 leading-tight w-16 h-4">
                        {currentPhase2 > 0.3 ? "Mechanic selected" :
                            currentPhase1 > 0 ? "Searching for mechanics..." : "Starting search..."}
                    </p>
                </motion.div>
            </div>

            {/* Mechanic Nodes - animated */}
            <AnimatePresence>
                {mechanics.map((mechanic, idx) => {
                    const isSelected = idx === 0;
                    const shouldFade = currentPhase2 > 0 && !isSelected;
                    const pos = mechanicPositions[idx];

                    return (
                        <motion.div
                            key={mechanic.id}
                            className="absolute group cursor-pointer flex flex-col items-center"
                            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: mechanicsVisible ? (shouldFade ? 0.3 : 1) : 0,
                                opacity: mechanicsVisible ? (shouldFade ? 0 : 1) : 0,
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                            <motion.div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden transition-all",
                                    isSelected && currentPhase2 > 0.3 && "ring-2 ring-green-400/50"
                                )}
                                style={{
                                    background: isSelected && currentPhase2 > 0.3
                                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.35) 0%, rgba(16, 185, 129, 0.4) 100%)'
                                        : 'linear-gradient(135deg, rgba(75, 85, 99, 0.3) 0%, rgba(31, 41, 55, 0.35) 100%)',
                                    backdropFilter: 'blur(20px) saturate(180%)',
                                    border: isSelected && currentPhase2 > 0.3
                                        ? '1px solid rgba(34, 197, 94, 0.5)'
                                        : '1px solid rgba(255, 255, 255, 0.25)',
                                    boxShadow: isSelected && currentPhase2 > 0.3
                                        ? `0 8px 32px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)`
                                        : `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)`,
                                }}
                            >
                                <div className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 70%)',
                                    }}
                                />
                                <UserRoundCog className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                            </motion.div>
                            <motion.div
                                className="mt-2 px-2 py-1 rounded-lg text-center max-w-[80px]"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                                    backdropFilter: 'blur(12px) saturate(180%)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: mechanicsVisible ? 1 : 0, y: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.05) }}
                            >
                                <p className="text-[7px] font-semibold text-white mb-0.5">
                                    {isSelected && currentPhase2 > 0.3 ? "Selected" : mechanic.shop}
                                </p>
                                <p className="text-[6px] text-white/70 leading-tight">
                                    {isSelected && currentPhase2 > 0.3
                                        ? "Best match"
                                        : mechanicsVisible
                                            ? "Available"
                                            : "Searching..."}
                                </p>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

// Step 3 Visualization - Calendar Sync with auto-play animation
const Step3Visualization = ({ isOpen }: { isOpen: boolean }) => {
    const animationProgress = useMotionValue(0);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Reset and start animation
            animationProgress.set(0);
            const startTime = Date.now();
            const duration = 4000; // 4 seconds

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                animationProgress.set(progress);

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            // Stop animation when closed
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            animationProgress.set(0);
        }

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isOpen, animationProgress]);

    // Phase breakdown:
    // Phase 1 (0-50%): Path from car to mechanic
    // Phase 2 (50-100%): Path from mechanic to calendar
    const phase1Progress = useTransform(animationProgress, (p) => {
        if (p < 0.5) return p / 0.5; // 0-1 for first half
        return 1;
    });

    const phase2Progress = useTransform(animationProgress, (p) => {
        if (p < 0.5) return 0;
        return (p - 0.5) / 0.5; // 0-1 for second half
    });

    // Path animations
    // Car to Mechanic path
    const carToMechanicDashOffset = useTransform(phase1Progress, (p) => {
        return 200 - (p * 200);
    });

    // Mechanic to Calendar path
    const mechanicToCalendarDashOffset = useTransform(phase2Progress, (p) => {
        return 200 - (p * 200);
    });

    // Track phase progress for reactive updates
    const [currentPhase1, setCurrentPhase1] = useState(0);
    const [currentPhase2, setCurrentPhase2] = useState(0);

    useMotionValueEvent(phase1Progress, "change", (latest) => {
        setCurrentPhase1(latest);
    });

    useMotionValueEvent(phase2Progress, "change", (latest) => {
        setCurrentPhase2(latest);
    });

    // Node positions
    // Car: left-[30px] with w-12 h-12 (48px), center at (54, 150)
    const carX = 5 + 48; // 78px - Car right edge
    const carY = 150; // Car center Y

    // Selected Mechanic: left-[140px] top-[70px] with w-10 h-10 (40px), center at (160, 90)
    const mechanicX = 140 + 20; // 160px - Mechanic center X
    const mechanicY = 70 + 20; // 90px - Mechanic center Y

    // Calendar: left-[270px] top-1/2 with w-10 h-10 (40px), center at (290, 150)
    const calendarX = 220 + 40; // 290px - Calendar center X
    const calendarY = 140; // Calendar center Y

    // Path definitions
    const carToMechanicPath = `M ${carX} ${carY} Q ${(carX + mechanicX) / 2} ${carY - 20} ${mechanicX} ${mechanicY}`;
    const mechanicToCalendarPath = `M ${mechanicX} ${mechanicY} Q ${(mechanicX + calendarX) / 2} ${mechanicY - 20} ${calendarX} ${calendarY}`;

    return (
        <div className="relative w-full h-[300px] bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="pathGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow3">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Path from Car to Mechanic - Phase 1 */}
                <motion.path
                    d={carToMechanicPath}
                    fill="none"
                    stroke="url(#pathGradient3)"
                    strokeWidth="2"
                    strokeDasharray="200"
                    strokeDashoffset={carToMechanicDashOffset}
                    filter="url(#glow3)"
                    style={{ opacity: phase1Progress }}
                    transition={{ duration: 0.3 }}
                />

                {/* Path from Mechanic to Calendar - Phase 2 */}
                <motion.path
                    d={mechanicToCalendarPath}
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeDasharray="200"
                    strokeDashoffset={mechanicToCalendarDashOffset}
                    filter="url(#glow3)"
                    style={{ opacity: phase2Progress }}
                    transition={{ duration: 0.3 }}
                />
            </svg>

            {/* Car Node */}
            <div className="absolute left-[5px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.35) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                        }}
                    />
                    <Car className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                </div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-[8px] font-semibold text-white mb-0.5">Your Vehicle</p>
                    <p className="text-[7px] text-white/70 leading-tight w-16 h-4">
                        {currentPhase2 > 0.5 ? "Calendar synced" :
                            currentPhase2 > 0 ? "Syncing calendar..." :
                                currentPhase1 > 0.5 ? "Requesting availability..." :
                                    currentPhase1 > 0 ? "Sending request..." : "Starting sync"}
                    </p>
                </motion.div>
            </div>

            {/* Selected Mechanic Node */}
            <motion.div
                className="absolute left-[140px] top-[70px] flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.35) 0%, rgba(16, 185, 129, 0.4) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(34, 197, 94, 0.5)',
                        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 70%)',
                        }}
                    />
                    <UserRoundCog className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                </div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center max-w-[80px] w-18"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-[7px] font-semibold text-white mb-0.5">Mechanic</p>
                    <p className="text-[6px] text-white/70 leading-tight h-3">
                        {currentPhase2 > 0.5 ? "Syncing..." :
                            currentPhase2 > 0 ? "Checking availability..." :
                                currentPhase1 > 0.5 ? "Received request" : "Waiting..."}
                    </p>
                </motion.div>
            </motion.div>

            {/* Calendar Node */}
            <motion.div
                className="absolute left-[220px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <div className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.35) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                        }}
                    />
                    <Calendar className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                </div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center max-w-[80px] w-18"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-[7px] font-semibold text-white mb-0.5">Calendar Sync</p>
                    <p className="text-[6px] text-white/70 leading-tight h-3">
                        {currentPhase2 > 0.5 ? "4:00 PM confirmed" :
                            currentPhase2 > 0 ? "Syncing..." : "Waiting..."}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

// Step 4 Visualization - Booking Confirmation with auto-play animation
const Step4Visualization = ({ isOpen }: { isOpen: boolean }) => {
    const animationProgress = useMotionValue(0);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Reset and start animation
            animationProgress.set(0);
            const startTime = Date.now();
            const duration = 5000; // 5 seconds for full animation

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                animationProgress.set(progress);

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            // Stop animation when closed
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            animationProgress.set(0);
        }

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isOpen, animationProgress]);

    // Phase breakdown:
    // Phase 1 (0-60%): Path drawing from car → mechanic → calendar
    // Phase 2 (60-100%): Calendar to checkmark transformation + celebration
    const pathProgress = useTransform(animationProgress, (p) => {
        if (p < 0.6) return p / 0.6; // 0-1 for first 60%
        return 1;
    });

    const calendarToCheckTransition = useTransform(animationProgress, (p) => {
        if (p < 0.6) return 0; // Calendar state
        if (p >= 1) return 1; // Fully checkmark state
        return (p - 0.6) / 0.4; // Smooth transition from 0.6 to 1.0
    });

    // Path animation - bold green line
    const pathDashOffset = useTransform(pathProgress, (p) => {
        return 500 - (p * 500);
    });

    // Calendar to Checkmark transition animations
    const calendarCheckScale = useTransform(calendarToCheckTransition, (t) => {
        if (t < 0.3) return 1; // Normal size
        if (t < 0.7) return 1 + Math.sin((t - 0.3) * Math.PI / 0.4) * 0.2; // Pulse during transition
        return 1; // Back to normal
    });

    const calendarCheckRotate = useTransform(calendarToCheckTransition, (t) => {
        return t * 360; // Rotate 360 degrees during transition
    });

    // Background gradient transition from purple to green
    const calendarCheckBackground = useTransform(calendarToCheckTransition, (t) => {
        const r1 = Math.round(139 + (34 - 139) * t);
        const g1 = Math.round(92 + (197 - 92) * t);
        const b1 = Math.round(246 + (94 - 246) * t);
        const a1 = 0.3 + (0.4 - 0.3) * t;

        const r2 = Math.round(99 + (16 - 99) * t);
        const g2 = Math.round(102 + (185 - 102) * t);
        const b2 = Math.round(241 + (129 - 241) * t);
        const a2 = 0.35 + (0.45 - 0.35) * t;

        return `linear-gradient(135deg, rgba(${r1}, ${g1}, ${b1}, ${a1}) 0%, rgba(${r2}, ${g2}, ${b2}, ${a2}) 100%)`;
    });

    // Border color transition
    const calendarCheckBorder = useTransform(calendarToCheckTransition, (t) => {
        if (t < 0.5) {
            return '1px solid rgba(255, 255, 255, 0.3)';
        }
        const greenOpacity = 0.3 + (0.5 - 0.3) * ((t - 0.5) * 2);
        return `1px solid rgba(34, 197, 94, ${greenOpacity})`;
    });

    // Box shadow transition with glow effect
    const calendarCheckShadow = useTransform(calendarToCheckTransition, (t) => {
        if (t < 0.5) {
            return '0 8px 32px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)';
        }
        const greenGlow = 0.4 + (0.8 - 0.4) * ((t - 0.5) * 2);
        return `0 8px 32px rgba(34, 197, 94, ${greenGlow}), 0 0 40px rgba(34, 197, 94, ${greenGlow * 0.8}), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.1)`;
    });

    // Icon opacity for smooth transition
    const calendarIconOpacity = useTransform(calendarToCheckTransition, (t) => {
        if (t < 0.5) return 1 - (t * 2); // Fade out calendar
        return 0;
    });

    const checkIconOpacity = useTransform(calendarToCheckTransition, (t) => {
        if (t < 0.5) return 0;
        return (t - 0.5) * 2; // Fade in checkmark
    });

    // Celebration pulse effect when booking is confirmed
    const celebrationPulse = useTransform(calendarToCheckTransition, (t) => {
        if (t < 0.8) return 1;
        // Pulse effect after confirmation
        const pulsePhase = (t - 0.8) * 10; // Speed up pulse
        return 1 + Math.sin(pulsePhase * Math.PI) * 0.1; // Pulse between 1 and 1.1
    });

    // Track progress for reactive updates
    const [currentPathProgress, setCurrentPathProgress] = useState(0);
    const [currentTransition, setCurrentTransition] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useMotionValueEvent(pathProgress, "change", (latest) => {
        setCurrentPathProgress(latest);
    });

    useMotionValueEvent(calendarToCheckTransition, "change", (latest) => {
        setCurrentTransition(latest);
        if (latest > 0.8 && !isConfirmed) {
            setIsConfirmed(true);
        } else if (latest <= 0.8 && isConfirmed) {
            setIsConfirmed(false);
        }
    });

    // Node positions (using user's updated positions)
    // Car: left-[10px] with w-12 h-12 (48px), right edge at 58px
    const carX = 5 + 48; // 58px - Car right edge
    const carY = 150; // Car center Y

    // Selected Mechanic: left-[140px] top-[70px] with w-10 h-10 (40px), center at (160, 90)
    const mechanicX = 140 + 20; // 160px - Mechanic center X
    const mechanicY = 70 + 20; // 90px - Mechanic center Y

    // Calendar/Checkmark: left-[240px] with w-10 h-10 (40px), center at (260, 140)
    const calendarX = 240 + 20; // 260px - Calendar center X (using +20 for w-10 center)
    const calendarY = 140; // Calendar center Y

    // Path definition: car → mechanic → calendar
    const confirmationPath = `M ${carX} ${carY} L ${mechanicX} ${mechanicY} L ${calendarX} ${calendarY}`;

    return (
        <div className="relative w-full h-[300px] bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <filter id="glow4">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Final confirmation line - bold green line from car through mechanic to calendar */}
                <motion.path
                    d={confirmationPath}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="500"
                    strokeDashoffset={pathDashOffset}
                    filter="url(#glow4)"
                    style={{ opacity: pathProgress }}
                    transition={{ duration: 0.1, ease: "linear" }}
                />
            </svg>

            {/* Car Node */}
            <motion.div
                className="absolute left-[5px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: currentPathProgress > 0.8
                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.4) 100%)'
                            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.35) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: currentPathProgress > 0.8
                            ? '1px solid rgba(34, 197, 94, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: currentPathProgress > 0.8
                            ? '0 8px 32px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                            : '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                    animate={isConfirmed ? {
                        boxShadow: [
                            '0 8px 32px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                            '0 8px 32px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                            '0 8px 32px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                        ],
                    } : {}}
                    transition={{
                        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        background: { duration: 0.5 },
                        border: { duration: 0.5 },
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                        }}
                    />
                    <Car className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                </motion.div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-[8px] font-semibold text-white mb-0.5">Your Vehicle</p>
                    <p className="text-[7px] text-white/70 leading-tight w-16 h-4">
                        {isConfirmed ? "Booking confirmed!" :
                            currentPathProgress > 0.5 ? "Finalizing booking..." :
                                currentPathProgress > 0 ? "Processing confirmation..." : "Ready to confirm"}
                    </p>
                </motion.div>
            </motion.div>

            {/* Selected Mechanic Node */}
            <motion.div
                className="absolute left-[140px] top-[70px] flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.35) 0%, rgba(16, 185, 129, 0.4) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(34, 197, 94, 0.5)',
                        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 70%)',
                        }}
                    />
                    <UserRoundCog className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                </div>
            </motion.div>

            {/* Calendar/Checkmark Node - transforms from calendar to checkmark */}
            <motion.div
                className="absolute left-[230px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                        scale: calendarCheckScale,
                        rotate: calendarCheckRotate,
                    }}
                >
                    {/* Background color transition from purple to green */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: calendarCheckBackground,
                            backdropFilter: 'blur(20px) saturate(180%)',
                            border: calendarCheckBorder,
                            boxShadow: calendarCheckShadow,
                        }}
                    />
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                        }}
                    />
                    {/* Icon transition: Calendar to CheckCircle with smooth crossfade */}
                    <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                        <motion.div
                            className="absolute"
                            style={{
                                opacity: calendarIconOpacity,
                            }}
                        >
                            <Calendar className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                        </motion.div>
                        <motion.div
                            className="absolute"
                            style={{
                                opacity: checkIconOpacity,
                                scale: celebrationPulse,
                            }}
                        >
                            <CheckCircle className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    className="mt-2 px-2 py-1 rounded-lg text-center max-w-[80px] w-20"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                        backdropFilter: 'blur(12px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-[7px] font-semibold text-white mb-0.5">
                        {isConfirmed ? "Confirmed" : "Calendar Sync"}
                    </p>
                    <p className="text-[6px] text-white/70 leading-tight h-2">
                        {isConfirmed ? "Booked!" :
                            currentTransition > 0 ? "Transforming..." : "4:00 PM"}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default function DatabaseMobile() {
    const [openValue, setOpenValue] = useState<string | null>(stepData[0].value);

    const renderStepVisualization = (stepValue: string) => {
        const isOpen = openValue === stepValue;
        switch (stepValue) {
            case "step-1":
                return <Step1Visualization isOpen={isOpen} />;
            case "step-2":
                return <Step2Visualization isOpen={isOpen} />;
            case "step-3":
                return <Step3Visualization isOpen={isOpen} />;
            case "step-4":
                return <Step4Visualization isOpen={isOpen} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full  mx-auto lg:hidden">
            <Accordion
                collapsible
                value={openValue || undefined}
                defaultValue={"-1"}
                onValueChange={(value) => setOpenValue(value)}
                type="single"
                className="-space-y-px w-full"
            >
                {stepData.map((step) => {
                    const Icon = step.icon;
                    return (
                        <AccordionItem
                            key={step.value}
                            value={step.value}
                            className="overflow-hidden border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b"
                        >
                            <AccordionTrigger className="group hover:no-underline [&>svg]:hidden justify-between ">
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-left font-medium">{`${step.value.split('-')[1]}. ${step.title}`}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                                <div className="w-full h-full bg-gray-100/80 p-1 rounded-lg border border-gray-200">
                                    {renderStepVisualization(step.value)}
                                </div>
                                <p className="text-[9px] text-muted-foreground mt-2 text-end">Fig. {step.value.split('-')[1]} {step.title}</p>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}


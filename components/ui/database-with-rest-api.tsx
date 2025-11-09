"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon, LucideIcon, Calendar, CheckCircle2, Clock, Wrench, DollarSign, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Mechanic {
  id: string;
  name: string;
  shop: string;
  price: number;
  rating: number;
}

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    firstIcon?: LucideIcon;
    secondIcon?: LucideIcon;
    thirdIcon?: LucideIcon;
    fourthIcon?: LucideIcon;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mechanics: Mechanic[] = [
    { id: "1", name: "Mike", shop: "Mike's Auto", price: 150, rating: 4.8 },
    { id: "2", name: "Sarah", shop: "Quick Fix Garage", price: 175, rating: 4.9 },
    { id: "3", name: "Tom", shop: "Tom's Service", price: 200, rating: 4.7 },
  ];

  const stepCount = 4; // Service, Quote, Time, Book

  // Track scroll progress through the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to step index (0 to stepCount)
  // Add padding at the end to ensure final step completes
  const scrollBasedStep = useTransform(
    scrollYProgress,
    [0, 1],
    [0, stepCount]
  );

  // Calculate path progress for each step with more granular control
  // Each step gets 25% of scroll, but we add easing to ensure completion
  // Step 1: 0-25% of scroll
  const path1Progress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.25], // Start early, complete by 25%
    [0, 0.95, 1],
    { clamp: true }
  );
  // Step 2: 25-50% of scroll
  const path2Progress = useTransform(
    scrollYProgress,
    [0.25, 0.45, 0.5],
    [0, 0.95, 1],
    { clamp: true }
  );
  // Step 3: 50-75% of scroll
  const path3Progress = useTransform(
    scrollYProgress,
    [0.5, 0.7, 0.75],
    [0, 0.95, 1],
    { clamp: true }
  );
  // Step 4: 75-100% of scroll - ensure it completes fully
  const path4Progress = useTransform(
    scrollYProgress,
    [0.75, 0.9, 1], // Start at 75%, complete by 100%
    [0, 0.95, 1],
    { clamp: true }
  );

  // Use useMotionValueEvent to avoid infinite loops - only update when step actually changes
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | null>(null);
  const activeStepRef = useRef<1 | 2 | 3 | 4 | null>(null);

  // Use useMotionValueEvent instead of useEffect to prevent infinite loops
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress directly to steps based on scroll ranges
    let newStep = 0;
    if (latest < 0.25) {
      newStep = 1; // Step 1: 0-25%
    } else if (latest < 0.5) {
      newStep = 2; // Step 2: 25-50%
    } else if (latest < 0.75) {
      newStep = 3; // Step 3: 50-75%
    } else {
      newStep = 4; // Step 4: 75-100%
    }

    const stepValue = newStep as 1 | 2 | 3 | 4;

    // Only update if step actually changed (using ref to avoid stale closure)
    if (activeStepRef.current !== stepValue) {
      activeStepRef.current = stepValue;
      setActiveStep(stepValue);
    }
  });

  // Status messages for each step based on path progress
  const getStatusMessage = (step: number, progress: number): string => {
    if (step === 1) {
      // Service step messages - spread out more evenly
      if (progress < 0.3) return "Connecting to local garages...";
      if (progress < 0.6) return "Scanning for mechanics in your area...";
      if (progress < 0.9) return "Finding available pros...";
      return ""; // Path complete, show service name
    } else if (step === 2) {
      // Quote step - no messages, just show quote
      return "";
    } else if (step === 3) {
      // Time step messages - spread out more evenly
      if (progress < 0.3) return "Checking 4:00 PM availability...";
      if (progress < 0.6) return "Confirming schedule with 'Mike's Auto'...";
      if (progress < 0.9) return "Holding your spot...";
      return ""; // Path complete, show time
    } else if (step === 4) {
      // Book step messages - spread out to ensure all messages show
      if (progress < 0.25) return "Connecting you now...";
      if (progress < 0.5) return "Connecting you now...";
      if (progress < 0.7) return "Booking confirmed!";
      if (progress < 0.95) return "Booking confirmed!";
      return "You're all set! 'Mike's Auto' will see you at 4:00 PM.";
    }
    return "";
  };

  // Track status message with state that updates based on path progress
  const [statusMessage, setStatusMessage] = useState<string>("");
  const statusMessageRef = useRef<string>("");

  // Update status message based on path progress
  React.useEffect(() => {
    if (!activeStep) {
      setStatusMessage("");
      statusMessageRef.current = "";
      return;
    }

    const updateStatus = () => {
      let progress = 0;
      if (activeStep === 1) {
        progress = path1Progress.get();
      } else if (activeStep === 2) {
        progress = path2Progress.get();
      } else if (activeStep === 3) {
        progress = path3Progress.get();
      } else if (activeStep === 4) {
        progress = path4Progress.get();
      }

      const newMessage = getStatusMessage(activeStep, progress);
      // Only update if message actually changed (using ref to avoid stale closure)
      if (newMessage !== statusMessageRef.current) {
        statusMessageRef.current = newMessage;
        setStatusMessage(newMessage);
      }
    };

    // Subscribe to path progress changes
    const unsubscribe1 = path1Progress.on("change", updateStatus);
    const unsubscribe2 = path2Progress.on("change", updateStatus);
    const unsubscribe3 = path3Progress.on("change", updateStatus);
    const unsubscribe4 = path4Progress.on("change", updateStatus);

    // Initial update
    updateStatus();

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
    };
  }, [activeStep, path1Progress, path2Progress, path3Progress, path4Progress]);

  const currentStatusMessage = statusMessage;

  // Memoize content based on active step to avoid recalculations
  const contentData = React.useMemo(() => {
    if (activeStep === 1) {
      return {
        service: "Brake Replacement",
        mechanic: null,
        time: "",
        confirmed: false,
      };
    } else if (activeStep === 2) {
      return {
        service: "Brake Replacement",
        mechanic: mechanics[0],
        time: "",
        confirmed: false,
      };
    } else if (activeStep === 3) {
      return {
        service: "Brake Replacement",
        mechanic: mechanics[0],
        time: "4:00 PM",
        confirmed: false,
      };
    } else if (activeStep === 4) {
      return {
        service: "Brake Replacement",
        mechanic: mechanics[0],
        time: "4:00 PM",
        confirmed: true,
      };
    }
    return {
      service: "",
      mechanic: null,
      time: "",
      confirmed: false,
    };
  }, [activeStep, mechanics]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-5xl",
        className
      )}
      style={{
        height: `${stepCount * 120}vh`, // Each step gets 120vh of scroll space for better control
        minHeight: '480vh' // Increased to ensure all animations complete
      }}
    >
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div
          className={cn(
            "relative flex h-[350px] w-full flex-col items-center",
          )}
        >
          {/* SVG Paths  */}
          <svg
            className="h-full sm:w-full text-neutral-600"
            width="100%"
            height="100%"
            viewBox="0 0 200 100"
          >
            <g
              stroke="currentColor"
              fill="none"
              strokeWidth="0.4"
              strokeDasharray="100 100"
            >
              <motion.path
                d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
                pathLength="100"
                strokeDashoffset={useTransform(path1Progress, (p) => 100 - (p * 100))}
                stroke={activeStep === 1 ? "#3B82F6" : "currentColor"}
                strokeWidth={activeStep === 1 ? "0.6" : "0.4"}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
                pathLength="100"
                strokeDashoffset={useTransform(path2Progress, (p) => 100 - (p * 100))}
                stroke={activeStep === 2 ? "#3B82F6" : "currentColor"}
                strokeWidth={activeStep === 2 ? "0.6" : "0.4"}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
                pathLength="100"
                strokeDashoffset={useTransform(path3Progress, (p) => 100 - (p * 100))}
                stroke={activeStep === 3 ? "#3B82F6" : "currentColor"}
                strokeWidth={activeStep === 3 ? "0.6" : "0.4"}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
                pathLength="100"
                strokeDashoffset={useTransform(path4Progress, (p) => 100 - (p * 100))}
                stroke={activeStep === 4 ? "#3B82F6" : "currentColor"}
                strokeWidth={activeStep === 4 ? "0.6" : "0.4"}
                transition={{ duration: 0.1 }}
              />
            </g>
            {/* Blue Lights */}
            <g mask="url(#db-mask-1)">
              <circle
                className="database db-light-1"
                cx="0"
                cy="0"
                r="12"
                fill="url(#db-blue-grad)"
              />
            </g>
            <g mask="url(#db-mask-2)">
              <circle
                className="database db-light-2"
                cx="0"
                cy="0"
                r="12"
                fill="url(#db-blue-grad)"
              />
            </g>
            <g mask="url(#db-mask-3)">
              <circle
                className="database db-light-3"
                cx="0"
                cy="0"
                r="12"
                fill="url(#db-blue-grad)"
              />
            </g>
            <g mask="url(#db-mask-4)">
              <circle
                className="database db-light-4"
                cx="0"
                cy="0"
                r="12"
                fill="url(#db-blue-grad)"
              />
            </g>
            {/* Buttons */}
            <g stroke="currentColor" fill="none" strokeWidth="0.4">
              {/* First Button - Service */}
              <g>
                <motion.rect
                  fill={activeStep === 1 ? "#3B82F6" : "#FFFFFF"}
                  x="14"
                  y="5"
                  width="34"
                  height="10"
                  rx="5"
                  stroke={activeStep === 1 ? "#2563EB" : "#E5E7EB"}
                  strokeWidth="0.5"
                  animate={{
                    fill: activeStep === 1 ? "#3B82F6" : "#FFFFFF",
                    stroke: activeStep === 1 ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.rect>
                {badgeTexts?.firstIcon ? (
                  <foreignObject x="18" y="7.5" width="5" height="5">
                    {React.createElement(badgeTexts.firstIcon, {
                      className: `w-full h-full ${activeStep === 1 ? 'text-white' : 'text-neutral-700'}`
                    })}
                  </foreignObject>
                ) : (
                  <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
                )}
                <text
                  x="28"
                  y="12"
                  fill={activeStep === 1 ? "#FFFFFF" : "#1F2937"}
                  stroke="none"
                  fontSize="5"
                  fontWeight="500"
                >
                  {badgeTexts?.first || "Service"}
                </text>
              </g>
              {/* Second Button - Quote */}
              <g>
                <motion.rect
                  fill={activeStep === 2 ? "#3B82F6" : "#FFFFFF"}
                  x="60"
                  y="5"
                  width="34"
                  height="10"
                  rx="5"
                  stroke={activeStep === 2 ? "#2563EB" : "#E5E7EB"}
                  strokeWidth="0.5"
                  animate={{
                    fill: activeStep === 2 ? "#3B82F6" : "#FFFFFF",
                    stroke: activeStep === 2 ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.rect>
                {badgeTexts?.secondIcon ? (
                  <foreignObject x="64" y="7.5" width="5" height="5">
                    {React.createElement(badgeTexts.secondIcon, {
                      className: `w-full h-full ${activeStep === 2 ? 'text-white' : 'text-neutral-700'}`
                    })}
                  </foreignObject>
                ) : (
                  <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
                )}
                <text
                  x="74"
                  y="12"
                  fill={activeStep === 2 ? "#FFFFFF" : "#1F2937"}
                  stroke="none"
                  fontSize="5"
                  fontWeight="500"
                >
                  {badgeTexts?.second || "Quote"}
                </text>
              </g>
              {/* Third Button - Time */}
              <g>
                <motion.rect
                  fill={activeStep === 3 ? "#3B82F6" : "#FFFFFF"}
                  x="108"
                  y="5"
                  width="34"
                  height="10"
                  rx="5"
                  stroke={activeStep === 3 ? "#2563EB" : "#E5E7EB"}
                  strokeWidth="0.5"
                  animate={{
                    fill: activeStep === 3 ? "#3B82F6" : "#FFFFFF",
                    stroke: activeStep === 3 ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.rect>
                {badgeTexts?.thirdIcon ? (
                  <foreignObject x="112" y="7.5" width="5" height="5">
                    {React.createElement(badgeTexts.thirdIcon, {
                      className: `w-full h-full ${activeStep === 3 ? 'text-white' : 'text-neutral-700'}`
                    })}
                  </foreignObject>
                ) : (
                  <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
                )}
                <text
                  x="122"
                  y="12"
                  fill={activeStep === 3 ? "#FFFFFF" : "#1F2937"}
                  stroke="none"
                  fontSize="5"
                  fontWeight="500"
                >
                  {badgeTexts?.third || "Time"}
                </text>
              </g>
              {/* Fourth Button - Book */}
              <g>
                <motion.rect
                  fill={activeStep === 4 ? "#3B82F6" : "#FFFFFF"}
                  x="150"
                  y="5"
                  width="40"
                  height="10"
                  rx="5"
                  stroke={activeStep === 4 ? "#2563EB" : "#E5E7EB"}
                  strokeWidth="0.5"
                  animate={{
                    fill: activeStep === 4 ? "#3B82F6" : "#FFFFFF",
                    stroke: activeStep === 4 ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.rect>
                {badgeTexts?.fourthIcon ? (
                  <foreignObject x="154" y="7.5" width="5" height="5">
                    {React.createElement(badgeTexts.fourthIcon, {
                      className: `w-full h-full ${activeStep === 4 ? 'text-white' : 'text-neutral-700'}`
                    })}
                  </foreignObject>
                ) : (
                  <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
                )}
                <text
                  x="165"
                  y="12"
                  fill={activeStep === 4 ? "#FFFFFF" : "#1F2937"}
                  stroke="none"
                  fontSize="5"
                  fontWeight="500"
                >
                  {badgeTexts?.fourth || "Book"}
                </text>
              </g>
            </g>
            <defs>
              {/* 1 -  user list */}
              <mask id="db-mask-1">
                <path
                  d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              {/* 2 - task list */}
              <mask id="db-mask-2">
                <path
                  d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              {/* 3 - backlogs */}
              <mask id="db-mask-3">
                <path
                  d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              {/* 4 - misc */}
              <mask id="db-mask-4">
                <path
                  d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              {/* Blue Grad */}
              <radialGradient id="db-blue-grad" fx="1">
                <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
          {/* Main Box */}
          <div className="absolute bottom-10 flex w-full flex-col items-center">
            {/* bottom shadow */}
            <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-neutral-200/40" />
            {/* box title */}
            <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-2 py-1 sm:-top-4 sm:py-1.5 shadow-sm">
              <SparklesIcon className="size-3 text-neutral-700" />
              <span className="ml-2 text-[10px] text-neutral-700">
                {title ? title : "Data exchange using a customized REST API"}
              </span>
            </div>
            {/* box outter circle */}
            {/* <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t border-neutral-200 bg-white font-semibold text-xs text-neutral-700 shadow-sm">
              {circleText ? circleText : "SVG"}
            </div> */}
            {/* box content */}
            <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md">
              {/* Dynamic Content Based on Step */}
              <AnimatePresence mode="wait">
                {activeStep === null && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Badges */}
                    <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-white px-3 text-xs border border-neutral-200 flex items-center gap-2 text-neutral-700 shadow-sm">
                      <HeartHandshakeIcon className="size-4 text-neutral-700" />
                      <span>{buttonTexts?.first || "LegionDev"}</span>
                    </div>
                    <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-white px-3 text-xs sm:flex border border-neutral-200 items-center gap-2 text-neutral-700 shadow-sm">
                      <Folder className="size-4 text-neutral-700" />
                      <span>{buttonTexts?.second || "v2_updates"}</span>
                    </div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <div className="text-center space-y-2">
                      <Wrench className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <AnimatePresence mode="wait">
                        {currentStatusMessage && (
                          <motion.p
                            key={currentStatusMessage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-xs text-neutral-600"
                          >
                            {currentStatusMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <PathProgressIndicator
                        progress={path1Progress}
                        threshold={1}
                      >
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm font-semibold text-neutral-900 mt-2"
                        >
                          {contentData.service || "Service"}
                        </motion.p>
                      </PathProgressIndicator>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    {contentData.mechanic ? (
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <p className="text-sm font-semibold text-neutral-900">${contentData.mechanic.price}</p>
                        <p className="text-xs text-neutral-600">{contentData.mechanic.shop}</p>
                        <p className="text-xs text-neutral-500">⭐ {contentData.mechanic.rating}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <p className="text-sm font-semibold text-neutral-900">Quote</p>
                        <p className="text-xs text-neutral-600">Fetching prices...</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <div className="text-center space-y-2">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <AnimatePresence mode="wait">
                        {currentStatusMessage && (
                          <motion.p
                            key={currentStatusMessage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-xs text-neutral-600"
                          >
                            {currentStatusMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <PathProgressIndicator
                        progress={path3Progress}
                        threshold={1}
                      >
                        {contentData.time && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-1"
                          >
                            <p className="text-sm font-semibold text-neutral-900">{contentData.time}</p>
                            <p className="text-xs text-neutral-600">Time slot confirmed</p>
                          </motion.div>
                        )}
                      </PathProgressIndicator>
                    </div>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                  >
                    <div className="text-center space-y-2">
                      <PathProgressRange
                        progress={path4Progress}
                        min={0}
                        max={0.4}
                      >
                        <>
                          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <AnimatePresence mode="wait">
                            {currentStatusMessage && (
                              <motion.p
                                key={currentStatusMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs text-neutral-600"
                              >
                                {currentStatusMessage}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </>
                      </PathProgressRange>
                      <PathProgressRange
                        progress={path4Progress}
                        min={0.4}
                        max={0.8}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <motion.div
                            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <motion.svg
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          </motion.div>
                          <AnimatePresence mode="wait">
                            {currentStatusMessage && (
                              <motion.p
                                key={currentStatusMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm font-semibold text-neutral-900"
                              >
                                {currentStatusMessage}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </PathProgressRange>
                      <PathProgressRange
                        progress={path4Progress}
                        min={0.8}
                        max={1}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <motion.div
                            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <motion.svg
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          </motion.div>
                          <AnimatePresence mode="wait">
                            {currentStatusMessage && (
                              <motion.p
                                key={currentStatusMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs text-neutral-600 text-center"
                              >
                                {currentStatusMessage}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </PathProgressRange>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Circles */}
              <motion.div
                className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t border-neutral-200 bg-neutral-100/30"
                animate={{
                  scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t border-neutral-200 bg-neutral-100/30"
                animate={{
                  scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t border-neutral-200 bg-neutral-100/30"
                animate={{
                  scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t border-neutral-200 bg-neutral-100/30"
                animate={{
                  scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component to show content when path progress reaches threshold
const PathProgressIndicator = ({
  progress,
  threshold,
  children
}: {
  progress: any;
  threshold: number;
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const unsubscribe = progress.on("change", (latest: number) => {
      setShow(latest >= threshold);
    });
    // Initial check
    setShow(progress.get() >= threshold);
    return unsubscribe;
  }, [progress, threshold]);

  return show ? <>{children}</> : null;
};

// Helper component to show content when path progress is in a range
const PathProgressRange = ({
  progress,
  min,
  max,
  children
}: {
  progress: any;
  min: number;
  max: number;
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const unsubscribe = progress.on("change", (latest: number) => {
      setShow(latest >= min && latest < max);
    });
    // Initial check
    const current = progress.get();
    setShow(current >= min && current < max);
    return unsubscribe;
  }, [progress, min, max]);

  return show ? <>{children}</> : null;
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1F2937"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};

// Booking Flow Component
interface Mechanic {
  id: string;
  name: string;
  shop: string;
  price: number;
  rating: number;
  photo?: string;
}

interface BookingFlowProps {
  className?: string;
}

export const BookingFlow = ({ className }: BookingFlowProps) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const services = ["Brake Replacement", "Oil Change", "Tire Rotation", "Engine Diagnostic"];
  const mechanics: Mechanic[] = [
    { id: "1", name: "Mike", shop: "Mike's Auto", price: 150, rating: 4.8 },
    { id: "2", name: "Sarah", shop: "Quick Fix Garage", price: 175, rating: 4.9 },
    { id: "3", name: "Tom", shop: "Tom's Service", price: 200, rating: 4.7 },
  ];
  const timeSlots = ["9:00 AM", "12:00 PM", "4:00 PM", "6:00 PM"];

  // Step 1: Service Selection
  const handleServiceSelect = async (service: string) => {
    setSelectedService(service);
    setIsLoading(true);

    const statusMessages = [
      "Connecting to local garages...",
      "Scanning for mechanics in your area...",
      "Finding available pros...",
    ];

    for (let i = 0; i < statusMessages.length; i++) {
      setLoadingStatus(statusMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setIsLoading(false);
    setStep(2);
  };

  // Step 3: Time Selection
  const handleTimeSelect = async (time: string) => {
    setSelectedTime(time);
    setIsLoading(true);

    const statusMessages = [
      `Checking ${time} availability...`,
      `Confirming schedule with '${selectedMechanic?.shop}'...`,
      "Holding your spot...",
    ];

    for (let i = 0; i < statusMessages.length; i++) {
      setLoadingStatus(statusMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsLoading(false);
    setStep(4);
  };

  // Step 4: Booking Confirmation
  const handleBookNow = async () => {
    setIsLoading(true);
    setLoadingStatus("Connecting you now...");

    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoadingStatus("Booking confirmed!");
    setBookingConfirmed(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 space-y-6", className)}>
      {/* Step 1: Service Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-neutral-900">Select a Service</h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <motion.button
                key={service}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceSelect(service)}
                className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <span className="font-medium text-neutral-900">{service}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Loading State for Step 1 */}
      {step === 1 && isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.2,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.4,
                ease: "easeInOut",
              }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingStatus}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-neutral-600"
            >
              {loadingStatus}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Step 2: Quote Display */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Available Mechanics for {selectedService}
            </h2>
            <p className="text-sm text-neutral-600">Select a mechanic to continue</p>
          </div>

          <div className="space-y-3">
            {mechanics.map((mechanic, idx) => (
              <motion.div
                key={mechanic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                onClick={() => {
                  setSelectedMechanic(mechanic);
                  setStep(3);
                }}
                className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{mechanic.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{mechanic.shop}</h3>
                      <p className="text-sm text-neutral-600">⭐ {mechanic.rating}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">${mechanic.price}</p>
                    <p className="text-xs text-neutral-500">Starting price</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: Time Selection */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Select a Time
            </h2>
            <p className="text-sm text-neutral-600">
              Booking with {selectedMechanic?.shop}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Calendar className="w-5 h-5 text-blue-500" />
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStatus}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-neutral-600"
                  >
                    {loadingStatus}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTimeSelect(time)}
                  className="p-4 rounded-lg border border-neutral-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="font-medium text-neutral-900">{time}</span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Step 4: Booking Confirmation */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Confirm Your Booking
            </h2>
            <div className="p-4 rounded-lg bg-neutral-50 space-y-2">
              <p className="text-sm text-neutral-600">
                <span className="font-medium">Service:</span> {selectedService}
              </p>
              <p className="text-sm text-neutral-600">
                <span className="font-medium">Mechanic:</span> {selectedMechanic?.shop}
              </p>
              <p className="text-sm text-neutral-600">
                <span className="font-medium">Time:</span> {selectedTime}
              </p>
              <p className="text-sm font-semibold text-neutral-900 pt-2">
                Total: ${selectedMechanic?.price}
              </p>
            </div>
          </div>

          {isLoading && !bookingConfirmed ? (
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingStatus}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-neutral-600 text-center"
                >
                  {loadingStatus}
                </motion.p>
              </AnimatePresence>
            </div>
          ) : bookingConfirmed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold text-neutral-900"
              >
                You're all set!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-neutral-600"
              >
                {selectedMechanic?.shop} will see you at {selectedTime}.
              </motion.p>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookNow}
              className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Now
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon, LucideIcon, Calendar, CheckCircle2, Clock, Wrench, DollarSign, CheckCircle, Activity, Server, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";
import { Sparkles } from "./sparkles";
import { Card } from "../card-stacking";
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

const projects = [
  {
    title: 'Matthias Leidinger',
    description:
      'Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.',
    src: 'rock.jpg',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    color: '#5196fd',
  },
  {
    title: 'Clément Chapillon',
    description:
      'This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.',
    src: 'tree.jpg',
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    color: '#8f89ff',
  },
  {
    title: 'Zissou',
    description:
      'Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.',
    src: 'water.jpg',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    color: '#13006c',
  },
  {
    title: 'Mathias Svold and Ulrik Hasemann',
    description:
      'The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.',
    src: 'house.jpg',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    color: '#ed649e',
  },
  {
    title: 'Mark Rammers',
    description:
      'Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    color: '#fd521a',
  },
];

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
    offset: ["start start", "end start"]
  });

  // Calculate path progress for each step with more granular control
  // Adjusted ranges to give more time for each step, especially the final one
  // Step 1: 0-20% of scroll
  const path1Progress = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2], // Start early, complete by 20%
    [0, 0.95, 1],
    { clamp: true }
  );
  // Step 2: 20-40% of scroll
  const path2Progress = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.4],
    [0, 0.95, 1],
    { clamp: true }
  );
  // Step 3: 40-60% of scroll
  const path3Progress = useTransform(
    scrollYProgress,
    [0.4, 0.55, 0.6],
    [0, 0.95, 1],
    { clamp: true }
  );
  // Step 4: 60-85% of scroll - give more time for final step to complete
  const path4Progress = useTransform(
    scrollYProgress,
    [0.6, 0.75, 0.85], // Start at 60%, complete by 85% (leaves 15% buffer)
    [0, 0.95, 1],
    { clamp: true }
  );

  // Use useMotionValueEvent to avoid infinite loops - only update when step actually changes
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | null>(null);
  const activeStepRef = useRef<1 | 2 | 3 | 4 | null>(null);

  // Use useMotionValueEvent instead of useEffect to prevent infinite loops
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress directly to steps based on adjusted scroll ranges
    let newStep = 0;
    if (latest < 0.2) {
      newStep = 1; // Step 1: 0-20%
    } else if (latest < 0.4) {
      newStep = 2; // Step 2: 20-40%
    } else if (latest < 0.6) {
      newStep = 3; // Step 3: 40-60%
    } else {
      newStep = 4; // Step 4: 60-100%
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
      // Service step messages - includes diagnosis phase first, then service search
      if (progress < 0.2) return "Analyzing vehicle symptoms...";
      if (progress < 0.4) return "Identifying potential issues...";
      if (progress < 0.5) return "Diagnosing car problems...";
      if (progress < 0.65) return "Connecting to local garages...";
      if (progress < 0.8) return "Scanning for mechanics in your area...";
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
        diagnosis: "Brake System Issue",
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

  // Dynamic title based on active step
  const dynamicTitle = React.useMemo(() => {
    if (title) return title; // Use custom title if provided

    switch (activeStep) {
      case 1:
        return "AI diagnostics & mechanic search";
      case 2:
        return "Fetching real-time quotes";
      case 3:
        return "Syncing calendar availability";
      case 4:
        return "Processing booking confirmation";
      default:
        return "Real-time booking sync API";
    }
  }, [activeStep, title]);

  // Dynamic icon based on active step
  const DynamicIcon = React.useMemo(() => {
    switch (activeStep) {
      case 1:
        return Server; // Searching/querying
      case 2:
        return DollarSign; // Pricing/quotes
      case 3:
        return Calendar; // Calendar/scheduling
      case 4:
        return CheckCircle; // Confirmation
      default:
        return Activity; // Default API activity
    }
  }, [activeStep]);

  // Card data for each step
  const stepCards = [
    {
      step: 1,
      title: "AI Diagnostics & Service Discovery",
      description: "Our AI connects with your car's information including mileage, service history, and vehicle specifications. We analyze your vehicle symptoms, identify potential issues, and search our network of certified mechanics to find the best match for your specific service needs.",
      icon: Server,
      color: "blue",
      features: [
        "Real-time vehicle analysis",
        "Network-wide mechanic search",
        "Service matching algorithm"
      ],
      link: '/service.png',

    },
    {
      step: 2,
      title: "Real-Time Quote Generation",
      description: "Get instant, transparent pricing from verified mechanics. Our system fetches real-time quotes based on your location, service type, and current market rates.",
      icon: DollarSign,
      color: "green",
      features: [
        "Transparent pricing",
        "Market rate comparison",
        "Instant quote delivery"
      ],
      link: '/quote.png',

    },
    {
      step: 3,
      title: "Calendar Synchronization",
      description: "We sync with mechanic calendars in real-time to show you available time slots. Your preferred time is held while we confirm availability with the shop.",
      icon: Calendar,
      color: "purple",
      features: [
        "Live calendar sync",
        "Availability checking",
        "Time slot reservation"
      ],
      link: '/appointment.png',

    },
    {
      step: 4,
      title: "Booking Confirmation",
      description: "Your appointment is processed and confirmed instantly. You'll receive all booking details, including shop information, time, and service confirmation.",
      icon: CheckCircle,
      color: "emerald",
      features: [
        "Instant confirmation",
        "Booking details delivery",
        "Appointment secured"
      ],
      link: '/book.png',

    }
  ];



  return (
    <div className="flex flex-col items-center justify-center w-screen " ref={containerRef}>
      <div
        className={cn(
          "relative w-full ",
          className
        )}
        style={{
          height: `${stepCount * 100}vh`, // Each step gets 100vh of scroll space for better control
          minHeight: '480vh' // Increased to ensure all animations complete
        }}
      >
        {/* Sticky container that stays in view while scrolling */}
        <div className="sticky top-0 flex flex-col items-center justify-center min-h-screen  w-full max-w-8xl">
          {/* Step Information Cards Section */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 right-0 z-30 max-w-5xl w-full">
            <div className="relative w-full flex items-center justify-center" style={{ height: '500px' }}>
              {/* Single container for all cards to stack */}
              <div className="relative w-full flex items-center justify-center " style={{ height: '500px' }}>
                {stepCards.map((project, i) => {
                  const targetScale = 1 - (stepCards.length - i) * 0.05;
                  // Map card index to step number (card 0 = step 1, card 1 = step 2, etc.)
                  const stepNumber = i + 1;
                  // Adjusted scroll ranges: step 1 = 0-0.2, step 2 = 0.2-0.4, step 3 = 0.4-0.6, step 4 = 0.6-0.85
                  const stepRanges = [0, 0.2, 0.4, 0.6, 0.85];
                  const stepStart = stepRanges[i];
                  const stepEnd = stepRanges[i + 1];
                  return (
                    <Card
                      key={`p_${i}`}
                      i={i}
                      url={project?.link}
                      src={project?.link}
                      title={project?.title}
                      features={project?.features}
                      description={project?.description}
                      progress={scrollYProgress}
                      range={[stepStart, stepEnd]}
                      targetScale={targetScale}
                      activeStep={activeStep}
                      stepNumber={stepNumber}
                    />
                  );
                })}
              </div>
            </div>
          </div>


          {/* Original content */}
          <div className="flex flex-col items-start justify-start h-screen mt-32 max-w-5xl">
            <div
              className={cn(
                "relative flex h-[350px] w-full flex-col items-center",
              )}
            >
              {/* SVG Paths  */}
              <svg
                className="h-full sm:w-full text-white"
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
                <g fill="none" strokeWidth="0.4">
                  {/* First Button - Service */}
                  <g
                  >
                    <motion.rect
                      x="14"
                      y="5"
                      width="34"
                      height="10"
                      rx="5"
                      fill={(activeStep ?? 0) > 1 ? "#3B82F6" : activeStep === 1 ? "rgba(59, 130, 246, 0.15)" : "transparent"}
                      stroke={(activeStep ?? 0) >= 1 ? "#2563EB" : "#E5E7EB"}
                      strokeWidth="0.5"
                      animate={{
                        fill: (activeStep ?? 0) > 1 ? "#3B82F6" : activeStep === 1 ? "rgba(59, 130, 246, 0.15)" : "transparent",
                        stroke: (activeStep ?? 0) >= 1 ? "#2563EB" : "#E5E7EB",
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.rect>
                    {badgeTexts?.firstIcon ? (
                      <foreignObject x="18" y="7.5" width="5" height="5">
                        {React.createElement(badgeTexts.firstIcon, {
                          className: `w-full h-full text-white`
                        })}
                      </foreignObject>
                    ) : (
                      <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
                    )}
                    <text
                      x="25"
                      y="12"
                      fill={`#FFFFFF`}
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
                      fill={(activeStep ?? 0) > 2 ? "#3B82F6" : activeStep === 2 ? "rgba(59, 130, 246, 0.15)" : "transparent"}
                      x="60"
                      y="5"
                      width="34"
                      height="10"
                      rx="5"
                      stroke={(activeStep ?? 0) >= 2 ? "#2563EB" : "#E5E7EB"}
                      strokeWidth="0.5"
                      animate={{
                        fill: (activeStep ?? 0) > 2 ? "#3B82F6" : activeStep === 2 ? "rgba(59, 130, 246, 0.15)" : "transparent",
                        stroke: (activeStep ?? 0) >= 2 ? "#2563EB" : "#E5E7EB",
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.rect>
                    {badgeTexts?.secondIcon ? (
                      <foreignObject x="64" y="7.5" width="5" height="5">
                        {React.createElement(badgeTexts.secondIcon, {
                          className: `w-full h-full text-white`
                        })}
                      </foreignObject>
                    ) : (
                      <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
                    )}
                    <text
                      x="74"
                      y="12"
                      fill={`#FFFFFF`}
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
                      fill={(activeStep ?? 0) > 3 ? "#3B82F6" : activeStep === 3 ? "rgba(59, 130, 246, 0.15)" : "transparent"}
                      x="108"
                      y="5"
                      width="34"
                      height="10"
                      rx="5"
                      stroke={(activeStep ?? 0) >= 3 ? "#2563EB" : "#E5E7EB"}
                      strokeWidth="0.5"
                      animate={{
                        fill: (activeStep ?? 0) > 3 ? "#3B82F6" : activeStep === 3 ? "rgba(59, 130, 246, 0.15)" : "transparent",
                        stroke: (activeStep ?? 0) >= 3 ? "#2563EB" : "#E5E7EB",
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.rect>
                    {badgeTexts?.thirdIcon ? (
                      <foreignObject x="112" y="7.5" width="5" height="5">
                        {React.createElement(badgeTexts.thirdIcon, {
                          className: `w-full h-full text-white`
                        })}
                      </foreignObject>
                    ) : (
                      <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
                    )}
                    <text
                      x="122"
                      y="12"
                      fill={`#FFFFFF`}
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
                      fill={(activeStep ?? 0) > 4 ? "#3B82F6" : activeStep === 4 ? "rgba(59, 130, 246, 0.15)" : "transparent"}
                      x="150"
                      y="5"
                      width="40"
                      height="10"
                      rx="5"
                      stroke={(activeStep ?? 0) >= 4 ? "#2563EB" : "#E5E7EB"}
                      strokeWidth="0.5"
                      animate={{
                        fill: (activeStep ?? 0) > 4 ? "#3B82F6" : activeStep === 4 ? "rgba(59, 130, 246, 0.15)" : "transparent",
                        stroke: (activeStep ?? 0) >= 4 ? "#2563EB" : "#E5E7EB",
                      }}
                      transition={{ duration: 0.3 }}
                    ></motion.rect>
                    {badgeTexts?.fourthIcon ? (
                      <foreignObject x="154" y="7.5" width="5" height="5">
                        {React.createElement(badgeTexts.fourthIcon, {
                          className: `w-full h-full text-white`
                        })}
                      </foreignObject>
                    ) : (
                      <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
                    )}
                    <text
                      x="165"
                      y="12"
                      fill={`#FFFFFF`}
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
                {/* box title */}
                <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-neutral-200 bg-transparent backdrop-blur-lg px-2 py-1 sm:-top-4 sm:py-1.5 shadow-sm ">
                  <div className="relative w-3 h-3 shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`icon-${activeStep}`}
                        initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden"
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <DynamicIcon className="size-3 text-blue-400" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="ml-2 h-[14px] relative w-full min-w-[180px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={dynamicTitle}
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden"
                        }}
                        className="absolute inset-0 text-[10px] text-white font-medium flex items-center"
                      >
                        {dynamicTitle}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                {/* box outter circle */}
                {/* <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t border-neutral-200 bg-white font-semibold text-xs text-white shadow-sm">
          {circleText ? circleText : "SVG"}
                  </div> */}
                {/* box content */}
                <div className="relative z-10 flex h-[150px] w-[90%] items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent backdrop-blur-sm shadow-md">
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
                        <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-white px-3 text-xs border border-neutral-200 flex items-center gap-2 text-white shadow-sm">
                          <HeartHandshakeIcon className="size-4 text-white" />
                          <span>{buttonTexts?.first || "LegionDev"}</span>
                        </div>
                        <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-white px-3 text-xs sm:flex border border-neutral-200 items-center gap-2 text-white shadow-sm">
                          <Folder className="size-4 text-white" />
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
                          <Wrench className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                          <AnimatePresence mode="wait">
                            {currentStatusMessage && (
                              <motion.p
                                key={currentStatusMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs text-white"
                              >
                                {currentStatusMessage}
                              </motion.p>
                            )}
                          </AnimatePresence>
                          {/* Show diagnosis first (when progress < 0.5), then service */}
                          <PathProgressRange
                            progress={path1Progress}
                            min={0}
                            max={0.5}
                          >
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm font-semibold text-neutral-900 mt-2"
                            >
                              {contentData.diagnosis || "Diagnosis"}
                            </motion.p>
                          </PathProgressRange>
                          <PathProgressIndicator
                            progress={path1Progress}
                            threshold={0.5}
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
                            <p className="text-xs text-white">{contentData.mechanic.shop}</p>
                            <p className="text-xs text-neutral-500">⭐ {contentData.mechanic.rating}</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                            <p className="text-sm font-semibold text-neutral-900">Quote</p>
                            <p className="text-xs text-white">Fetching prices...</p>
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
                          <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                          <AnimatePresence mode="wait">
                            {currentStatusMessage && (
                              <motion.p
                                key={currentStatusMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs text-white"
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
                                <p className="text-xs text-white">Time slot confirmed</p>
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
                              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                              <AnimatePresence mode="wait">
                                {currentStatusMessage && (
                                  <motion.p
                                    key={currentStatusMessage}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-xs text-white"
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
                                    className="text-xs text-white text-center"
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
                </div>
              </div>
            </div>
          </div>

          {/* Sparkles */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-1/2 ">
            <div className='relative h-1/2 w-full overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_90%)] before:opacity-100  after:absolute after:border-2 after:-left-1/2 after:top-1/3 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#7876c566] after:bg-zinc-200'>
              <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-size-[70px_80px] '></div>
              <Sparkles
                density={400}
                size={1.4}
                direction='top'
                className='absolute inset-x-0 top-0 h-full w-full mask-[radial-gradient(50%_50%,white,transparent_85%)]'
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



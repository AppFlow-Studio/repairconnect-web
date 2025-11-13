"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon, LucideIcon, Calendar, CheckCircle2, Clock, Wrench, DollarSign, CheckCircle, Activity, Server, Zap, Car, User, Brain, Users, UserRoundCog } from "lucide-react";
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

// Data Packet Component - animated data bits flowing from car to AI Brain in arc fashion
const DataPacket = ({
  progress,
  startX,
  startY,
  endX,
  endY,
  label,
  delay = 0,
  verticalOffset = 0
}: {
  progress: MotionValue<number>;
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

  // Calculate position along quadratic arc (curved path)
  const x = useTransform(packetProgress, (t) => {
    // Linear interpolation for X
    return startX + (endX - startX) * t;
  });

  const y = useTransform(packetProgress, (t) => {
    // Arc: start at startY, curve up, then down to endY
    // Control point for the arc (midpoint with upward curve)
    // Increase arc height for longer distances
    const distance = Math.abs(endX - startX);
    const arcHeight = Math.max(40, distance * 0.15); // Scale arc height with distance
    const midY = Math.min(startY, endY) - arcHeight;
    // Quadratic bezier curve
    return (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * (midY + verticalOffset) + t * t * endY;
  });

  const opacity = useTransform(packetProgress, (p) => {
    if (p <= 0 || p >= 1) return 0;
    // Fade in quickly, stay visible, fade out at end
    if (p < 0.1) return p / 0.1;
    if (p > 0.9) return (1 - p) / 0.1;
    return 1;
  });

  const scale = useTransform(packetProgress, (p) => {
    if (p <= 0 || p >= 1) return 0.8;
    // Slight scale animation as it moves
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
      <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-500/95 via-cyan-500/95 to-blue-600/95 backdrop-blur-md border border-blue-400/60 shadow-xl text-[7px] sm:text-[9px] font-mono font-semibold text-white whitespace-nowrap relative overflow-hidden">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
        <span className="relative z-10">{label}</span>
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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

// Diagnostic Icon Component - animated icon traveling back from AI to Car with diagnosis
const DiagnosticIcon = ({
  progress,
  startX,
  startY,
  endX,
  endY
}: {
  progress: MotionValue<number>;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) => {
  const diagnosticProgress = useTransform(progress, (p: number) => {
    if (p < 0.1) return 0;
    return (p - 0.1) / 0.9;
  });

  // Calculate position along straight line (back to car)
  const x = useTransform(diagnosticProgress, (t) => startX + (endX - startX) * t);
  const y = useTransform(diagnosticProgress, (t) => startY + (endY - startY) * t);
  const opacity = useTransform(diagnosticProgress, (p) => p > 0 && p < 1 ? 1 : 0);

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
      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 backdrop-blur-xl border sm:border-2 border-purple-400/60 shadow-xl flex items-center justify-center relative overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white relative z-10 drop-shadow-lg" />
        {/* Pulse ring */}
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

// Price Icon Component - separate component to use hooks at top level
const PriceIcon = ({
  progress,
  startX,
  startY,
  endX,
  endY
}: {
  progress: MotionValue<number>;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) => {
  const priceProgress = useTransform(progress, (p: number) => {
    // No delay - starts immediately when Phase 3 begins
    return p;
  });

  // Calculate position along quadratic curve
  const x = useTransform(priceProgress, (t) => {
    const midX = (startX + endX) / 2;
    return (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX;
  });
  const y = useTransform(priceProgress, (t) => {
    const midY = startY + 50;
    return (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY;
  });
  const opacity = useTransform(priceProgress, (p) => p > 0 && p < 1 ? 1 : 0);

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        opacity: opacity,
      }}
      animate={{
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 backdrop-blur-xl border-2 border-amber-400/50 shadow-xl flex items-center justify-center">
        <DollarSign className="w-3 h-3 text-white" />
      </div>
    </motion.div>
  );
};

const
  DatabaseWithRestApi = ({
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

    const stepCount = 4; // Service, Price, Time, Book

    // Track scroll progress through the component (vertical scroll controls horizontal visualization)
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"]
    });

    // Create eased scroll progress for smoother, slower animations
    // This applies easing to make animations progress more gradually
    // Additional easing for steps 2-4 to make them even smoother
    const easedScrollProgress = useTransform(scrollYProgress, (p) => {
      // Ease-in-out cubic function for smooth, slower progression
      if (p <= 0) return 0;
      if (p >= 1) return 1;

      // Apply stronger easing for steps 2-4 (after 25% scroll)
      if (p >= 0.25) {
        // Normalize to 0-1 for steps 2-4
        const steps2to4Progress = (p - 0.25) / 0.75;
        // Apply stronger easing (quintic ease-in-out for very smooth progression)
        const eased = steps2to4Progress < 0.5
          ? 16 * steps2to4Progress * steps2to4Progress * steps2to4Progress * steps2to4Progress * steps2to4Progress
          : 1 - Math.pow(-2 * steps2to4Progress + 2, 5) / 2;
        return 0.25 + eased * 0.75;
      }

      // Step 1 uses standard cubic easing
      return p < 0.5
        ? 4 * p * p * p
        : 1 - Math.pow(-2 * p + 2, 3) / 2;
    });

    // Calculate path progress for each step - using eased progress for smoother animations
    // Step 1: 0-25% of scroll - split into 3 phases
    const path1Progress = useTransform(
      easedScrollProgress,
      [0, 0.2, 0.25],
      [0, 0.95, 1],
      { clamp: true }
    );

    // Step 1 Phase breakdown: 
    // Phase 1 (0-33%): Data packets flow from car to AI brain
    // Phase 2 (33-66%): AI brain processes
    // Phase 3 (66-100%): Signal/path goes back from AI brain to car
    const phase1Progress = useTransform(path1Progress, (p) => {
      if (p < 0.33) return p / 0.33; // 0-1 for first third
      return 1;
    });
    const phase2Progress = useTransform(path1Progress, (p) => {
      if (p < 0.33) return 0;
      if (p < 0.66) return (p - 0.33) / 0.33; // 0-1 for second third
      return 1;
    });
    const phase3Progress = useTransform(path1Progress, (p) => {
      if (p < 0.66) return 0;
      return (p - 0.66) / 0.34; // 0-1 for final third
    });

    // Opacity transforms for conditional rendering
    const phase1Opacity = useTransform(phase1Progress, (p) => p > 0 ? 1 : 0);
    const phase3Opacity = useTransform(phase3Progress, (p) => p > 0 ? 1 : 0);
    const aiBrainOpacity = useTransform(phase1Progress, (p) => p > 0.2 ? 1 : 0); // Show earlier, when data starts arriving
    // AI Brain should be visible only before Phase 3 (Signal Sent) starts
    const shouldShowAiBrain = useTransform(phase3Progress, (p) => p < 0.1);

    // Return signal path from AI brain to car (Phase 3) - longer path now
    const returnSignalDashOffset = useTransform(phase3Progress, (p) => 800 - (p * 800));
    const aiBrainPulseScale = useTransform(phase2Progress, (p) => {
      if (p === 0) return 1;
      // Pulse during processing
      return 1 + Math.sin(p * Math.PI * 4) * 0.1;
    });
    const aiBrainGlow = useTransform(phase2Progress, (p) => {
      if (p === 0) return 0.3;
      // Increase glow during processing
      return 0.3 + (p * 0.7);
    });
    // Step 2: 25-50% of scroll - expanded range for smoother animation
    const path2Progress = useTransform(
      easedScrollProgress,
      [0.25, 0.48, 0.5],
      [0, 0.95, 1],
      { clamp: true }
    );

    // Step 2 Phase breakdown:
    // Phase 1 (0-33%): Mechanic search - query lines from car to mechanics
    // Phase 2 (33-66%): Mechanic selection - highlight selected mechanic
    // Phase 3 (66-100%): Price being sent back from selected mechanic to car
    const step2Phase1Progress = useTransform(path2Progress, (p) => {
      if (p < 0.33) return p / 0.33; // 0-1 for first third
      return 1;
    });
    const step2Phase2Progress = useTransform(path2Progress, (p) => {
      if (p < 0.12) return 0;
      if (p < 0.66) return (p - 0.33) / 0.33; // 0-1 for second third
      return 1;
    });
    const step2Phase3Progress = useTransform(path2Progress, (p) => {
      if (p < 0.66) return 0;
      return (p - 0.66) / 0.34; // 0-1 for final third
    });

    // Step 3: 50-75% of scroll - expanded range for smoother animation
    const path3Progress = useTransform(
      easedScrollProgress,
      [0.5, 0.73, 0.75],
      [0, 0.95, 1],
      { clamp: true }
    );
    // Step 4: 75-100% of scroll - expanded range for smoother animation
    // Give Step 4 more scroll space so the line draws smoothly
    const path4Progress = useTransform(
      easedScrollProgress,
      [0.75, 0.98, 1],
      [0, 0.99, 1],
      { clamp: true }
    );

    // Create strokeDashoffset transforms at top level (hooks cannot be in loops)
    // Step 1 Phase 1: Data stream from car to AI Brain (longer path now)
    const phase1DashOffset = useTransform(phase1Progress, (p) => 800 - (p * 800));
    // Step 2 Phase 1: Query lines from Car to mechanics (mechanic search)
    const step2Phase1DashOffset = useTransform(step2Phase1Progress, (p) => 1000 - (p * 1000));

    // Create opacity transforms for each mechanic's path
    // All mechanics visible in Phase 1, only selected in Phase 2+
    // Selected mechanic (idx 0) - always visible once Phase 1 completes
    const mechanicPathOpacity0 = useTransform(step2Phase1Progress, (p) => {
      return p > 0 ? 1 : 0; // Visible once Phase 1 starts, stays visible
    });
    // Non-selected mechanics (idx 1, 2) - visible in Phase 1, fade out in Phase 2
    // Use path2Progress to determine overall step 2 progress
    const mechanicPathOpacity1 = useTransform(path2Progress, (p) => {
      // Phase 1 (0-33%): Show line
      if (p < 0.1) return 1
      // Phase 2 (33-66%): Fade out after selection starts
      if (p < 0.2) return Math.max(0, 1 - ((p - 0.33) / 0.17) * 1); // Fade from 1 to 0
      // Phase 3+: Hidden
      return 0;
    });
    const mechanicPathOpacity2 = useTransform(path2Progress, (p) => {
      // Phase 1 (0-33%): Show line
      if (p < 0.1) return 1
      // Phase 2 (33-66%): Fade out after selection starts
      if (p < 0.2) return Math.max(0, 1 - ((p - 0.33) / 0.17) * 1); // Fade from 1 to 0
      // Phase 3+: Hidden
      return 0;
    });
    // Step 2 Phase 3: Price path (removed - price icon handles its own animation)
    const path2DashOffset = useTransform(path2Progress, (p) => {
      // Not used for price path anymore, but keep for compatibility
      return 0;
    });
    const path3DashOffset = useTransform(path3Progress, (p) => 1000 - (p * 1000));
    // Step 4 path: car (124, 200) → mechanic (304, 164) → calendar (480, 200)
    // Path length is approximately 1500px for the full path
    const path4DashOffset = useTransform(path4Progress, (p) => {
      // Start with full dash offset (line hidden), animate to 0 (line fully visible)
      // This creates a smooth drawing effect as user scrolls
      return 1500 - (p * 1500);
    });

    // Step 4 checkmark animations - appear when path reaches calendar (around 85% complete)
    const checkmarkOpacity = useTransform(path4Progress, (p) => p > 0.85 ? 1 : 0);
    const checkmarkScale = useTransform(path4Progress, (p) => {
      if (p < 0.85) return 0;
      if (p < 0.92) return (p - 0.85) / 0.07 * 1.5; // Scale from 0 to 1.5
      return 1 + (p - 0.92) / 0.08 * 0.3; // Bounce back to 1
    });
    const checkmarkRotate = useTransform(path4Progress, (p) => {
      if (p < 0.85) return -180;
      return -180 + ((p - 0.85) / 0.15) * 180; // Rotate from -180 to 0
    });

    // Car icon celebration animation - triggers when price icon reaches car
    // Price is sent in Step 2 Phase 3
    const priceProgressForCar = useTransform(step2Phase3Progress, (p: number) => {
      return p; // Already normalized to 0-1
    });
    const carPulseScale = useTransform(priceProgressForCar, (p) => {
      if (p < 0.85) return 1; // Normal size until price is close
      if (p < 0.95) return 1 + (p - 0.85) / 0.1 * 0.3; // Scale up to 1.3
      // After reaching, create a pulsing effect
      const pulsePhase = (p - 0.95) * 20; // Speed up pulse
      return 1 + Math.sin(pulsePhase * Math.PI) * 0.15; // Pulse between 1 and 1.15
    });
    const carGlowIntensity = useTransform(priceProgressForCar, (p) => {
      if (p < 0.85) return 0;
      if (p < 0.95) return (p - 0.85) / 0.1; // Fade in glow
      return 1; // Full glow after price arrives
    });

    // Track when price has arrived to trigger color change
    const [priceArrived, setPriceArrived] = useState(false);
    useMotionValueEvent(priceProgressForCar, "change", (latest) => {
      if (latest >= 0.85 && !priceArrived) {
        setPriceArrived(true);
      } else if (latest < 0.85 && priceArrived) {
        setPriceArrived(false);
      }
    });

    // Use useMotionValueEvent to avoid infinite loops - only update when step actually changes
    const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | null>(null);
    const activeStepRef = useRef<1 | 2 | 3 | 4 | null>(null);
    const [mechanicsVisible, setMechanicsVisible] = useState(false);

    // Track when mechanics should be visible - they appear in Step 2 Phase 1
    useMotionValueEvent(step2Phase1Progress, "change", (latest) => {
      setMechanicsVisible(latest > 0.1 && (activeStep ?? 0) >= 2);
    });

    // Use useMotionValueEvent instead of useEffect to prevent infinite loops
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      // Map scroll progress directly to steps based on adjusted scroll ranges
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
        // Phase 1: Data Streaming (0-33%)
        if (progress < 0.15) return "Syncing Vehicle Data (via Smartcar API)...";
        if (progress < 0.25) return "Reading: mileage, oil_life, DTC codes...";
        if (progress < 0.33) return "Data stream complete";
        // Phase 2: AI Diagnosis (33-66%)
        if (progress < 0.45) return "AI analyzing diagnostic data...";
        if (progress < 0.55) return "Processing: DTC P0420 detected...";
        if (progress < 0.66) return "Diagnosis: Catalyst System Issue";
        // Phase 3: Return Signal (66-100%)
        if (progress < 0.8) return "Sending diagnosis back to vehicle...";
        if (progress < 0.9) return "Signal received, ready to search...";
        return "Ready for mechanic search";
      } else if (step === 2) {
        // Step 2 Phase 1: Mechanic Search (0-33%)
        if (progress < 0.15) return "Searching for certified mechanics...";
        if (progress < 0.25) return "Matching service requirements...";
        if (progress < 0.33) return "Found available shops in your area";
        // Step 2 Phase 2: Mechanic Selection (33-66%)
        if (progress < 0.45) return "Analyzing best match...";
        if (progress < 0.55) return "Selecting optimal mechanic...";
        if (progress < 0.66) return "Mechanic selected";
        // Step 2 Phase 3: Price Sending (66-100%)
        if (progress < 0.8) return "Requesting price quote...";
        if (progress < 0.9) return "Price received, sending to vehicle...";
        return ""; // Price complete, show price
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
          return "Comparing direct pricing across shops";
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
          return DollarSign; // Pricing
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
        description: "Our AI instantly analyzes your vehicle's data to pinpoint the exact issue. Then it finds verified mechanics in your area who specialize in your specific repair.",
        icon: Server,
        color: "blue",
        features: [
          "Intelligent vehicle analysis using ML models",
          "Real-time mechanic matching based on expertise",
          "Service history and diagnostic data integration",
        ],
        link: '/service.png',
      },
      {
        step: 2,
        title: "Direct Pricing",
        description: "See real-time prices from multiple shops instantly—no phone calls needed. Compare options side-by-side and choose the best value for your repair.",
        icon: DollarSign,
        color: "green",
        features: [
          "Direct pricing from verified shops",
          "Transparent pricing with no hidden fees",
          "Price comparison across multiple mechanics",
          "Instant price display via secure channels"
        ],
        link: '/quote.png',
      },
      {
        step: 3,
        title: "Calendar Sync & Availability Check",
        description: "We automatically check your mechanic's real-time availability and hold your preferred time slot. Get the appointment that fits your schedule perfectly.",
        icon: Calendar,
        color: "purple",
        features: [
          "Live calendar synchronization",
          "Real-time availability checking",
          "Automatic time slot reservation",
          "Flexible scheduling options"
        ],
        link: '/appointment.png',
      },
      {
        step: 4,
        title: "Booking Confirmation & Details",
        description: "Your appointment is confirmed instantly with all the details you need. No phone calls, no back-and-forth—just a ready-to-go booking.",
        icon: CheckCircle,
        color: "emerald",
        features: [
          "Instant booking confirmation",
          "Complete service details delivered",
          "Mechanic contact information",
          "Appointment reminders and updates"
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
            height: `${stepCount * 300}vh`, // Each step gets 300vh of scroll space - more space for steps 2-4
            minHeight: '1200vh' // Increased significantly to slow down animations, especially for steps 2-4
          }}
        >
          <div className="text-start w-full sm:hidden flex flex-row space-x-8 sm:px-12 ">
            <div className="flex flex-col space-y-8">
              <p className=" text-gray-700 sm:text-3xl text-xl font-[--font-lora] leading-tight tracking-tight">Otopair reads your request, finds the right shop,<br />syncs calendars, and confirms payment in one flow.</p>

              <p className="sm:text-3xl text-xl font-[--font-lora] leading-tight tracking-tight text-gray-800">
                No phone-tag, just a booked bay.
              </p>
            </div>
          </div>
          {/* Sticky container that stays in view while scrolling */}
          <div className="sticky top-0 flex flex-col items-center justify-center  min-h-screen  w-full max-w-8xl">
            <div className="text-start w-full sm:flex hidden flex-row space-x-8 sm:px-12 ">
              <div className="flex flex-col space-y-8">
                <p className=" text-gray-700 sm:text-3xl text-xl font-[--font-lora] leading-tight tracking-tight">Otopair reads your request, finds the right shop,<br />syncs calendars, and confirms payment in one flow.</p>

                <p className="sm:text-3xl text-xl font-[--font-lora] leading-tight tracking-tight text-gray-800">
                  No phone-tag, just a booked bay.
                </p>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-12 items-start justify-center w-full max-w-[1600px] mx-auto mt-16">
              {/* Left Side - Cards */}
              <div className="flex-1 min-w-0 lg:w-[60%] md:w-[600px] mx-auto w-full h-full lg:order-first lg:px-0 px-2">
                <div className="relative w-full flex items-center justify-center ">
                  <div className="w-full flex flex-col items-start justify-center min-h-[400px] ">
                    {/* Vertical Step Indicator - Top of Box */}
                    <div className="flex flex-row items-start justify-center gap-2 absolute xl:top-1/3 top-0 lg:left-12 mb-2 lg:px-2 rotate-180 rotate-y-180">
                      {[1, 2, 3, 4].map((stepNum) => (
                        <motion.div
                          key={stepNum}
                          className={`w-px rounded-full transition-colors duration-300 ${(activeStep ?? 0) === stepNum
                            ? 'bg-neutral-900'
                            : 'bg-gray-500'
                            }`}
                          initial={false}
                          animate={{
                            height: (activeStep ?? 0) === stepNum ? '1rem' : '0.5rem',
                            opacity: (activeStep ?? 0) === stepNum ? 1 : 0.5,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                        />
                      ))}
                    </div>
                    {/* Cards - all present, smoothly animate in/out based on active step */}
                    {stepCards.map((project, i) => {
                      // Map card index to step number (card 0 = step 1, card 1 = step 2, etc.)
                      const stepNumber = i + 1;
                      return (
                        <Card
                          key={`card-${stepNumber}`}
                          i={i}
                          url={project?.link}
                          src={project?.link}
                          title={project?.title}
                          features={project?.features}
                          description={project?.description}
                          progress={scrollYProgress}
                          range={[0, 1]}
                          targetScale={1}
                          activeStep={activeStep}
                          stepNumber={stepNumber}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side - Horizontal Scrolling Node Visualization in Boxed Window */}
              <div className="flex-shrink-0 sm:w-[600px] w-full relative overflow-visible z-30 lg:order-last order-first mx-auto sm:mt-0 mt-4">
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-2" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

                  <div className="relative w-full h-[250px] sm:h-[400px] mx-auto overflow-hidden bg-white/30 rounded-lg">
                    {/* SVG Container for paths */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
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

                      {/* Step 1 Phase 1: Data stream from Car to AI Brain (far right) */}
                      {(activeStep ?? 0) >= 1 && (
                        <motion.path
                          d="M 124 200 L 480 200"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="1.5"
                          className="sm:stroke-[2]"
                          strokeDasharray="800"
                          strokeDashoffset={phase1DashOffset}
                          filter="url(#glow)"
                          style={{ opacity: phase1Opacity }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Step 1 Phase 3: Return signal from AI Brain back to Car */}
                      {(activeStep ?? 0) >= 1 && (
                        <motion.path
                          d="M 480 200 L 124 200"
                          fill="none"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                          className="sm:stroke-[3]"
                          strokeDasharray="800"
                          strokeDashoffset={returnSignalDashOffset}
                          filter="url(#glow)"
                          style={{ opacity: phase3Opacity }}
                          transition={{ duration: 0.1 }}
                        />
                      )}

                      {/* Step 2 Phase 1: Query lines from Car to Mechanics (mechanic search starts from car) */}
                      {(activeStep ?? 0) >= 2 && (
                        <>
                          {mechanics.map((mechanic, idx) => {
                            // Car right edge: 124px, Mechanic centers calculated
                            const carX = 124; // Car right edge X
                            const carY = 200; // Car center Y
                            const mechanicX = 280 + (idx === 2 ? 120 : 0) + 24; // Mechanic center X
                            const mechanicY = (idx === 1 ? 260 : 140) + 24; // Mechanic center Y
                            const midX = (carX + mechanicX) / 2;
                            const pathD = `M ${carX} ${carY} Q ${midX} ${carY - 30} ${mechanicX} ${mechanicY}`;

                            // Use the pre-created opacity transforms
                            const pathOpacity = idx === 0
                              ? mechanicPathOpacity0
                              : idx === 1
                                ? mechanicPathOpacity1
                                : mechanicPathOpacity2;

                            return (
                              <motion.path
                                key={`path-2-phase1-${mechanic.id}`}
                                d={pathD}
                                fill="none"
                                stroke="url(#pathGradient)"
                                strokeWidth="1.5"
                                className="sm:stroke-[2]"
                                strokeDasharray="1000"
                                strokeDashoffset={step2Phase1DashOffset}
                                filter="url(#glow)"
                                style={{ opacity: pathOpacity }}
                                transition={{ duration: 0.3 }}
                              />
                            );
                          })}
                        </>
                      )}

                      {/* Step 2: Price paths removed - lines for non-selected mechanics are hidden */}
                      {/* Only the price icons animate back, the lines themselves are removed */}

                      {/* Step 3: Calendar sync line - from selected mechanic to calendar - scaled */}
                      {(activeStep ?? 0) >= 3 && (
                        <>
                          {/* Line from selected mechanic (idx 0) to calendar - scaled positions */}
                          {/* Selected mechanic center: (304, 164), Calendar center: (480, 200) */}
                          <motion.path
                            d="M 304 164 Q 380 150 480 200"
                            fill="none"
                            stroke="#8B5CF6"
                            strokeWidth="1.5"
                            className="sm:stroke-[2]"
                            strokeDasharray="1000"
                            strokeDashoffset={path3DashOffset}
                            filter="url(#glow)"
                            opacity={(activeStep ?? 0) >= 3 ? 1 : 0}
                            transition={{ duration: 0.3 }}
                          />
                        </>
                      )}

                      {/* Step 4: Final confirmation line - bold green line from car through mechanic to calendar - scaled */}
                      {(activeStep ?? 0) >= 4 && (
                        <motion.path
                          d="M 124 200 L 304 164 L 480 200"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          className="sm:stroke-[5]"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="1500"
                          strokeDashoffset={path4DashOffset}
                          filter="url(#glow)"
                          opacity={1}
                          style={{ zIndex: 10 }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      )}
                    </svg>

                    {/* Nodes Container - scaled for smaller box */}
                    <div className="relative w-full h-full scale-[0.625] sm:scale-100 origin-top-left" style={{ zIndex: 2 }}>
                      {/* Central Car/User Node - positioned to fit 400px container */}
                      <motion.div
                        className="absolute left-[30px] sm:left-[60px] top-1/2 -translate-y-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <motion.div
                          className="relative group cursor-pointer flex flex-col items-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            scale: carPulseScale,
                          }}
                        >
                          {/* Liquid Glass Node - scaled down */}
                          <motion.div
                            className={cn(
                              "w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500",
                              priceArrived && "ring-2 sm:ring-4 ring-green-400/50"
                            )}
                            style={{
                              background: priceArrived
                                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.4) 100%)'
                                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.35) 100%)',
                              backdropFilter: 'blur(20px) saturate(180%)',
                              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                              border: priceArrived
                                ? ''
                                : '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                            animate={priceArrived ? {
                              boxShadow: [
                                '0 8px 32px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                                '0 8px 32px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                                '0 8px 32px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                              ],
                            } : {
                              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                            }}
                            transition={{
                              boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                              background: { duration: 0.5 },
                              border: { duration: 0.5 },
                            }}
                          >
                            {/* Success glow ring - appears when price arrives */}
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{
                                opacity: carGlowIntensity,
                                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4), transparent 70%)',
                              }}
                              animate={priceArrived ? {
                                boxShadow: [
                                  '0 0 30px rgba(34, 197, 94, 0.8)',
                                  '0 0 50px rgba(34, 197, 94, 1)',
                                  '0 0 30px rgba(34, 197, 94, 0.8)',
                                ],
                              } : {}}
                              transition={{
                                boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                              }}
                            />
                            {/* Inner glow */}
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                              }}
                            />
                            {/* Ripple effect when price arrives */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-green-400"
                              style={{
                                scale: useTransform(priceProgressForCar, (p) => {
                                  if (p < 0.85) return 1;
                                  // if (p < 0.95) return 1 + (p - 0.85) / 0.1 * 0.5; // Expand to 1.5
                                  // Create ripple effect
                                  const ripplePhase = (p - 0.95) * 10;
                                  return 1.5 + Math.sin(ripplePhase * Math.PI) * 0.3;
                                }),
                                opacity: useTransform(priceProgressForCar, (p) => {
                                  if (p < 0.85) return 0;
                                  if (p < 0.95) return (p - 0.85) / 0.1;
                                  return Math.max(0, 1 - (p - 0.95) * 2); // Fade out after initial pulse
                                }),
                              }}
                            />
                            <Car className="w-5 h-5 sm:w-8 sm:h-8 text-white relative z-10 drop-shadow-lg" />
                          </motion.div>
                          {/* Informational Text - scaled down */}
                          <motion.div
                            className="mt-1.5 sm:mt-3 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-center"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                              backdropFilter: 'blur(12px) saturate(180%)',
                              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <p className="text-[8px] sm:text-[10px] font-semibold text-white mb-0.5">Your Vehicle</p>
                            <p className="text-[7px] sm:text-[9px] text-white/70 leading-tight w-16 sm:w-24">
                              {(() => {
                                const step = activeStep ?? 0;
                                if (step === 1) {
                                  // Step 1: AI Diagnostics
                                  if (phase1Progress.get() > 0 && phase1Progress.get() < 1) {
                                    return "Syncing Vehicle Data...";
                                  } else if (phase2Progress.get() > 0 && phase3Progress.get() === 0) {
                                    return "AI analyzing...";
                                  } else if (phase3Progress.get() > 0) {
                                    return "Ready for mechanic search";
                                  }
                                  return "Starting point";
                                } else if (step === 2) {
                                  // Step 2: Pricing
                                  if (step2Phase3Progress.get() > 0 && step2Phase3Progress.get() < 1) {
                                    return "Receiving price quote...";
                                  } else if (step2Phase3Progress.get() >= 1) {
                                    return "Price received";
                                  } else if (step2Phase2Progress.get() > 0.3) {
                                    return "Mechanic selected";
                                  } else {
                                    return "Searching for mechanics...";
                                  }
                                } else if (step === 3) {
                                  // Step 3: Calendar Sync
                                  if (path3Progress.get() > 0 && path3Progress.get() < 1) {
                                    return "Syncing calendar...";
                                  } else if (path3Progress.get() >= 1) {
                                    return "Calendar synced";
                                  }
                                  return "Checking availability...";
                                } else if (step === 4) {
                                  // Step 4: Booking Confirmation
                                  if (path4Progress.get() > 0.85) {
                                    return "Booking confirmed!";
                                  } else if (path4Progress.get() > 0) {
                                    return "Processing booking...";
                                  }
                                  return "Finalizing...";
                                }
                                return "Starting point";
                              })()}
                            </p>
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      {/* AI Brain Node - appears in Step 1 only, positioned far right, disappears when Signal Sent (Phase 3) */}
                      <AnimatePresence>
                        {(activeStep ?? 0) === 1 && shouldShowAiBrain.get() && (
                          <motion.div
                            className="absolute left-[240px] sm:left-[480px] top-1/2 -translate-y-1/2 flex flex-col items-center"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="relative group cursor-pointer"
                              style={{
                                scale: phase2Progress.get() > 0 ? aiBrainPulseScale : 1,
                              }}
                            >
                              {/* Liquid Glass AI Brain Node */}
                              <motion.div
                                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                                style={{
                                  background: `linear-gradient(135deg, rgba(168, 85, 247, ${aiBrainGlow.get()}) 0%, rgba(236, 72, 153, ${aiBrainGlow.get() + 0.05}) 100%)`,
                                  backdropFilter: 'blur(20px) saturate(180%)',
                                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                  border: '1px solid rgba(255, 255, 255, 0.3)',
                                  boxShadow: `0 8px 32px rgba(168, 85, 247, ${aiBrainGlow.get() * 0.6}),
                                  inset 0 1px 0 rgba(255, 255, 255, 0.4),
                                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)`,
                                }}
                                animate={phase2Progress.get() > 0 ? {
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
                                <div
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                                  }}
                                />
                                <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-lg" />
                              </motion.div>
                              {/* Informational Text */}
                              <motion.div
                                className="mt-1.5 sm:mt-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-center max-w-[60px] sm:max-w-[100px]"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                                  backdropFilter: 'blur(12px) saturate(180%)',
                                  WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                  opacity: phase1Progress.get() > 0.5 ? 1 : 0,
                                  y: 0
                                }}
                                transition={{ delay: 0.5 }}
                              >
                                <p className="text-[7px] sm:text-[9px] font-semibold text-white mb-0.5">
                                  {phase3Progress.get() > 0 ? "Signal Sent" : phase2Progress.get() > 0.5 ? "Diagnosis Complete" : "AI Diagnostics"}
                                </p>
                                <p className="text-[6px] sm:text-[8px] text-white/70 leading-tight">
                                  {phase3Progress.get() > 0.5
                                    ? "Returning to vehicle..."
                                    : phase2Progress.get() > 0.5
                                      ? "Catalyst System Issue"
                                      : phase1Progress.get() > 0.5
                                        ? "Processing data..."
                                        : "Receiving data..."}
                                </p>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Animated Diagnostic Icon - Phase 3: traveling from AI position back to Car with diagnosis */}
                      {(activeStep ?? 0) >= 1 && phase3Progress.get() > 0 && phase3Progress.get() < 1 && (
                        <DiagnosticIcon
                          progress={phase3Progress}
                          startX={480}
                          startY={200}
                          endX={124}
                          endY={200}
                        />
                      )}

                      {/* Animated Data Packets - Phase 1: flowing from Car to AI Brain (far right) in arc fashion - spread out more */}
                      {(activeStep ?? 0) >= 1 && phase1Progress.get() > 0 && phase1Progress.get() < 1 && (
                        <>
                          <DataPacket
                            progress={phase1Progress}
                            startX={124}
                            startY={200}
                            endX={480}
                            endY={200}
                            label="mileage: 84,032"
                            delay={0}
                            verticalOffset={-50}
                          />
                          <DataPacket
                            progress={phase1Progress}
                            startX={124}
                            startY={220}
                            endX={480}
                            endY={200}
                            label="oil_life: 15%"
                            delay={0.08}
                            verticalOffset={-18}
                          />
                          <DataPacket
                            progress={phase1Progress}
                            startX={124}
                            startY={240}
                            endX={480}
                            endY={200}
                            label="DTC: P0420"
                            delay={0.16}
                            verticalOffset={18}
                          />
                          <DataPacket
                            progress={phase1Progress}
                            startX={124}
                            startY={260}
                            endX={480}
                            endY={200}
                            label="vin: ...X45B"
                            delay={0.24}
                            verticalOffset={50}
                          />
                        </>
                      )}

                      {/* Mechanic Nodes - appear in Step 2 Phase 1 (mechanic search) - positioned to fit 400px container */}
                      <AnimatePresence>
                        {mechanics.map((mechanic, idx) => {
                          // Position mechanics: idx 0 (top-left), idx 1 (middle), idx 2 (top-right)
                          // Use responsive positioning - scale factor 0.625 for mobile
                          const x = 280 + (idx === 2 ? 120 : 0); // Desktop positions
                          const y = idx === 1 ? 260 : 140; // Desktop positions
                          // Mobile positions will be handled via CSS transform scale on container
                          const isSelected = idx === 0;
                          // Fade non-selected mechanics in Step 2 Phase 2 (selection phase)
                          const shouldFade = (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > -0.4 && !isSelected;

                          return (
                            <motion.div
                              key={mechanic.id}
                              className="absolute group cursor-pointer flex flex-col items-center"
                              style={{ left: `${x}px`, top: `${y}px` }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: mechanicsVisible ? (shouldFade ? 0.3 : 1) : 0,
                                opacity: mechanicsVisible ? (shouldFade ? 0 : 1) : 0,
                              }}
                              exit={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: shouldFade ? 0.4 : 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                              {/* Liquid Glass Node - scaled down */}
                              <div
                                className={cn(
                                  "w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative overflow-hidden transition-all",
                                  isSelected && (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > 0.3 && "ring-1 sm:ring-2 ring-green-400/50"
                                )}
                                style={{
                                  background: isSelected && (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > 0.3
                                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.35) 0%, rgba(16, 185, 129, 0.4) 100%)'
                                    : 'linear-gradient(135deg, rgba(75, 85, 99, 0.3) 0%, rgba(31, 41, 55, 0.35) 100%)',
                                  backdropFilter: 'blur(20px) saturate(180%)',
                                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                  border: isSelected && (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > 0.3
                                    ? '1px solid rgba(34, 197, 94, 0.5)'
                                    : '1px solid rgba(255, 255, 255, 0.25)',
                                  boxShadow: isSelected && (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > 0.3
                                    ? `0 8px 32px rgba(34, 197, 94, 0.4),
                                   inset 0 1px 0 rgba(255, 255, 255, 0.4),
                                   inset 0 -1px 0 rgba(0, 0, 0, 0.1)`
                                    : `0 8px 32px rgba(0, 0, 0, 0.3),
                                   inset 0 1px 0 rgba(255, 255, 255, 0.2),
                                   inset 0 -1px 0 rgba(0, 0, 0, 0.1)`,
                                }}
                              >
                                <div
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 70%)',
                                  }}
                                />
                                <UserRoundCog className="w-4 h-4 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-lg" />
                              </div>
                              {/* Informational Text - scaled down */}
                              <motion.div
                                className="mt-1.5 sm:mt-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-center max-w-[60px] sm:max-w-[100px]"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                                  backdropFilter: 'blur(12px) saturate(180%)',
                                  WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: mechanicsVisible ? 1 : 0, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                              >
                                <p className="text-[7px] sm:text-[9px] font-semibold text-white mb-0.5">
                                  {isSelected && (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > 0.3 ? "Selected" : mechanic.shop}
                                </p>
                                <p className="text-[6px] sm:text-[8px] text-white/70 leading-tight">
                                  {isSelected && (activeStep ?? 0) >= 2 && step2Phase2Progress.get() > 0.3
                                    ? "Best match"
                                    : (activeStep ?? 0) >= 2
                                      ? "Available"
                                      : "Searching..."}
                                </p>
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>

                      {/* Animated Price Icons - Step 2 Phase 3 - from selected mechanic to car - scaled */}
                      {/* {(activeStep ?? 0) >= 2 && step2Phase3Progress.get() > 0 && (() => {
                        // Selected mechanic is at index 0 - updated positions for 400px container
                        const selectedMechanic = mechanics[0];
                        const mechanicX = 280 + 24; // Mechanic center X (280px left + 24px half width)
                        const mechanicY = 140 + 24; // Mechanic center Y (140px top + 24px half height)
                        const carX = 60 + 64; // Car node right edge X (60px left + 64px width)
                        const carY = 200; // Car node center Y (center of 400px)

                        return (
                          <PriceIcon
                            key={`price-icon-${selectedMechanic.id}`}
                            progress={step2Phase3Progress}
                            startX={mechanicX}
                            startY={mechanicY}
                            endX={carX}
                            endY={carY}
                          />
                        );
                      })()} */}

                      {/* Calendar Node - appears in step 3 - positioned at right side */}
                      <AnimatePresence>
                        {(activeStep ?? 0) >= 3 && (
                          <motion.div
                            className="absolute left-[240px] sm:left-[480px] top-[125px] sm:top-[200px] flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                          >
                            {/* Liquid Glass Node - scaled down */}
                            <div
                              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.35) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: `
                                0 8px 32px rgba(139, 92, 246, 0.4),
                                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                              `,
                              }}
                            >
                              <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)',
                                }}
                              />
                              <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-lg" />
                            </div>
                            {/* Informational Text - scaled down */}
                            <motion.div
                              className="mt-1.5 sm:mt-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-center max-w-[60px] sm:max-w-[100px]"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                                backdropFilter: 'blur(12px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 }}
                            >
                              <p className="text-[7px] sm:text-[9px] font-semibold text-white mb-0.5">Calendar Sync</p>
                              <p className="text-[6px] sm:text-[8px] text-white/70 leading-tight">
                                {currentStatusMessage || contentData.time || "Syncing..."}
                              </p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Checkmark - appears in step 4 - positioned at calendar */}
                      <AnimatePresence>
                        {(activeStep ?? 0) >= 4 && (
                          <motion.div
                            className="absolute flex flex-col items-center"
                            style={{
                              left: typeof window !== 'undefined' && window.innerWidth < 640 ? '240px' : '480px', // Calendar center X position
                              top: typeof window !== 'undefined' && window.innerWidth < 640 ? '125px' : '200px', // Calendar center Y position
                              x: '-50%',
                              y: '-50%',
                              opacity: checkmarkOpacity,
                              scale: checkmarkScale,
                              rotate: checkmarkRotate,
                            }}
                          >
                            {/* Liquid Glass Checkmark Node - scaled down */}
                            <div
                              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                              style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(16, 185, 129, 0.45) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(34, 197, 94, 0.5)',
                                boxShadow: `
                                0 8px 32px rgba(34, 197, 94, 0.5),
                                inset 0 1px 0 rgba(255, 255, 255, 0.5),
                                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                              `,
                              }}
                            >
                              <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 70%)',
                                }}
                              />
                              <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-lg" />
                            </div>
                            {/* Informational Text - scaled down */}
                            <motion.div
                              className="mt-1.5 sm:mt-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-center max-w-[60px] sm:max-w-[100px]"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                                backdropFilter: 'blur(12px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                opacity: checkmarkOpacity,
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <p className="text-[7px] sm:text-[9px] font-semibold text-white mb-0.5">Confirmed</p>
                              <p className="text-[6px] sm:text-[8px] text-white/70 leading-tight">
                                {currentStatusMessage || "Booked!"}
                              </p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>


                  </div>
                </div>
                {/* Figure Caption - Bottom Right */}
                <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-4 z-20">
                  <motion.p
                    className="text-[10px] sm:text-xs font-medium text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Fig. {activeStep ?? 1} {activeStep === 1 ? "AI Diagnostics & Service Discovery" : activeStep === 2 ? "Direct Pricing " : activeStep === 3 ? "Calendar Sync" : "Booking Confirmed"}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Sparkles */}
            {/* <div className="absolute -bottom-50 left-0 right-0 w-full h-1/2 ">
            <div className='relative h-1/2 w-full overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_90%)] before:opacity-100  after:absolute after:border-2 after:-left-1/2 after:top-1/3 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#7876c566] after:bg-zinc-200'>
              <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-size-[70px_80px] '></div>
              <Sparkles
                density={400}
                size={1.4}
                direction='top'
                className='absolute inset-x-0 top-0 h-full w-full mask-[radial-gradient(50%_50%,white,transparent_85%)]'
              />
            </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  };





export default DatabaseWithRestApi;





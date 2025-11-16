"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Wrench } from "lucide-react";
import TransBar, { TransBarTwo } from "@/components/trans-bar";
import OurVision from "@/components/our-vision";
import Flow from "@/components/Flow";
import Coordination from "@/components/coordination";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "motion/react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import BlogSection from "@/components/blog-section";
import CoordinationPlax from "@/components/coordination-plax";
import { ChevronMarqueeButton } from "@/components/ui/chevron-marquee-button";

const text = [
  "Booking a mechanic is now as easy as ordering takeout",
  "•",
  "See real prices, availability, and reviews instantly.",
  "•",
  "No phone calls, no back-and-forth, no guessing.",
  "•",
  "AI matches your car with the perfect mechanic.",
  "•",
  "Book in minutes, pay once, receipts forever.",
  "•"
]

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
export default function Home() {

  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Track scroll progress through Hero section
  // Account for aspect ratio - section height is determined by aspectRatio: "1553/1450"
  // Track from when section enters viewport to when section end reaches viewport top (TransBar appears)
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"] // Track from start to when section end reaches viewport top
  });

  // Transform scroll progress to create smooth scrolling for the card
  // Card scrolls down smoothly as user scrolls through hero section
  // When scroll progress reaches 1, card stops moving and stays fixed
  // Use negative values to move down (positive y moves down in CSS)
  const cardYOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 150], // Moves down 150px as you scroll through hero section
    { clamp: true }
  );

  // Opacity: keep card visible throughout
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1], // Stay fully visible
    { clamp: true }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ name, email });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
    }, 3000);
  };



  return (
    <main className="min-h-screen w-full bg-white">
      <section
        ref={heroSectionRef}
        className="relative w-full overflow-hidden flex-1 lg:h-screen  h-screen"
        style={{
          // minHeight: '100vh'
        }}
      >
        <div className="relative w-full lg:h-screen h-screen"
          style={{

          }}
        >
          <Image
            src="/home14.png"
            alt="Cityscape background"
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute inset-0 w-full h-full backdrop-blur-[3px]"
          style={{
            background: "linear-gradient(to bottom, rgba(30,30,32,0.2) 80%, transparent 120%)"
          }}
        />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center w-full px-4">
          <div className=" relative pt-8 flex flex-col items-center justify-center">
            <p
              className="pointer-events-none w-fit text-transparent bg-linear-to-r bg-clip-text  from-[#f9f9f9] to-[#0d72ff] xl:text-8xl sm:text-6xl text-4xl leading-none font-semibold ">
              Join the <span className="bg-linear-to-t px-1 from-[#f9f9f9] to-[#0d72ff] bg-clip-text text-transparent text-shadow ">Waitlist</span>
            </p>
            <p className="text-center text-sm lg:text-2xl leading-tight mb-3 text-[#E4E4E4] backdrop-blur-sm px-4 py-4 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_1rem),linear-gradient(to_left,transparent,black_1rem),linear-gradient(to_top,transparent,black_1rem),linear-gradient(to_bottom,transparent,black_1rem)] ">
              Receive all the latest news and updates,<br />as well as early access to the beta.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center mt-6 gap-4 w-full">
              <div className="relative sm:w-82 w-fit h-full flex gap-4">
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
                  className="sm:px-5 px-4 sm:py-3 py-2 rounded-2xl relative z-20 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-50 w-full  sm:text-lg text-base placeholder-gray-100 flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitted}
                  style={{ background: "transparent", fontSize: "16px" }}
                />
              </div>
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
                  className="sm:px-8 px-4 sm:py-3 py-2 rounded-2xl text-white font-semibold sm:text-lg text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 hover:cursor-pointer relative z-20"
                  style={{ backdropFilter: "brightness(1.1) blur(15px)" }}
                  disabled={submitted || !email}
                >
                  {submitted ? "Submitted!" : "Join Waitlist"}
                </button>
              </div>
            </form>

            <div className="border-b py-4 h-3 p-2 sm:w-[30%] w-[15%] relative self-center my-4" />
            {/* <p className="text-sm lg:text-base leading-relaxed text-[#E4E4E4] mt-6">Powered By</p> */}
            <Marquee className="sm:w-[30%] w-[20%] backdrop-blur-sm rounded-lg py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)] space-x-2 flex flex-row">
              {
                text.map((item, i) => (
                  <p key={i} className="text-xs leading-relaxed text-[#E4E4E4]">{item}</p>
                ))
              }
            </Marquee>
          </div>

          {/* <div className="border-b py-4 h-3 p-2 w-[40%] relative" />
          <p className="lg:text-2xl mb-3 text-gray-300 my-4 z-10 font-af font-medium text-lg tracking-[-0.15px] leading-relaxed">Powered By</p>
          <Marquee className="w-[25%] backdrop-blur-sm rounded-lg py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)] space-x-4 flex flex-row">
            {
              IconsArray.map((item) => (
                <div key={item.name} className="grayscale"><item.icon className="h-8 w-8 " /></div>
              ))
            }
          </Marquee> */}
        </div>


        <motion.div
          className='p-3 absolute sm:left-8 left-1/2 -translate-x-1/2 sm:translate-x-0  bottom-12 rounded-2xl backdrop-blur-[15px] border border-white/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-linear-to-r from-black/12 via-black/7 to-black/7 bg-clip-padding lg:max-w-[500px] sm:max-w-[300px] w-[90%] z-30'
          style={{
            y: cardYOffset.get() * 10,
            opacity: cardOpacity,
          }}
        >
          <div className="relative z-10 p-4  text-white rounded-2xl flex flex-col ">
            <h2 className='font-medium font-mondwest lg:text-4xl sm:text-xl  text-2xl leading-[120%] md:leading-10 tracking-[-0.44px] sm:tracking-[-0.56px] xl:tracking-[-0.8px] text-white max-w-[25ch] text-left mb-2 font-serif'>AI That runs car care autonomously </h2>
            <p className='sm:text-sm text-xs xl:text-base leading-relaxed my-4 tracking-wider'>
              Book faster, pay once, get receipts forever.
              Shops get predictable calendars. Get your time back.
            </p>

            <div className="relative flex gap-x-3">
              <p className="underline text-white sm:text-sm text-xs inline-flex items-center gap-2 underline-offset-4 group">
                Get to know us
              </p>
              <ChevronMarqueeButton />
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 right-8 z-10 p-5 xl:p-8 xl:pr-6 text-white sm:block hidden">
          <div className="w-full flex justify-end pr-6"><Wrench className="w-8 h-8 mb-4 rotate-280 self-end flex" /></div>
          <p className='text-sm xl:text-base leading-relaxed mb-3 tracking-wider '>
            Agentic auto service is on the
            horizon, <br />and we’re deploying it bay by bay.
          </p>
        </div>
      </section >
      <TransBar />


      <OurVision />
      <TransBarTwo />
      <Flow />
      <div className="rotate-180"><TransBarTwo /></div>
      <CoordinationPlax />
      <BlogSection />

    </main >
  );
}

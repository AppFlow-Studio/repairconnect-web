"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronRight, Wrench } from "lucide-react";
import TransBar, { TransBarTwo } from "@/components/trans-bar";
import OurVision from "@/components/our-vision";
import Flow from "@/components/Flow";
import Coordination from "@/components/coordination";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "motion/react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import BlogSection from "@/components/blog-section";

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
        className="relative w-full overflow-hidden flex-1"
        style={{
          minHeight: '100vh'
        }}
      >
        <div className="relative w-full h-full"
          style={{
            aspectRatio: "1553/1450"
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
            background: "linear-gradient(to bottom, rgba(30,30,32,0.1) 80%, transparent 120%)"
          }}
        />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center w-full px-4">
          <div className="flex self-center w-22 h-22 relative justify-center items-center">
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
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
              style={{
                filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                backdropFilter: 'brightness(1.1) blur(2px)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                }}
              />
            </div>

            <Image src="/repairconnectglasslogo.png" alt="RepairConnect Hero" width={100} height={100} className="object-cover z-20 h-22 w-22  mt-3" />
          </div>
          <div className=" relative pt-8 flex flex-col items-center justify-center">
            <p
              className="pointer-events-none w-fit text-transparent bg-linear-to-r bg-clip-text  from-[#f9f9f9] to-[#0d72ff] text-8xl leading-none font-semibold ">
              Join the <span className="bg-linear-to-t px-1 from-[#f9f9f9] to-[#0d72ff] bg-clip-text text-transparent ">Waitlist</span>
            </p>
            <p className="text-center text-sm lg:text-2xl leading-tight mb-3 text-[#E4E4E4] backdrop-blur-sm px-4 py-4 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_1rem),linear-gradient(to_left,transparent,black_1rem),linear-gradient(to_top,transparent,black_1rem),linear-gradient(to_bottom,transparent,black_1rem)] ">
              Receive all the latest news and updates,<br />as well as early access to the beta.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center mt-6 gap-4 w-full">
              <div className="relative w-82 h-full flex gap-4">
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
                  className="px-5 py-3 rounded-2xl relative z-20 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-50 w-full text-lg placeholder-gray-100 flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitted}
                  style={{ background: "transparent" }}
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
                  className="px-8 py-3 rounded-2xl text-white font-semibold text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 hover:cursor-pointer relative z-20"
                  style={{ backdropFilter: "brightness(1.1) blur(15px)" }}
                  disabled={submitted || !email}
                >
                  {submitted ? "Submitted!" : "Join Waitlist"}
                </button>
              </div>
            </form>

            <div className="border-b py-4 h-3 p-2 w-[45%] relative self-center my-4" />
            {/* <p className="text-sm lg:text-base leading-relaxed text-[#E4E4E4] mt-6">Powered By</p> */}
            <Marquee className="w-[45%] backdrop-blur-sm rounded-lg py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)] space-x-2 flex flex-row">
              {
                text.map((item) => (
                  <p key={item} className="text-xs leading-relaxed text-[#E4E4E4]">{item}</p>
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
          className='p-5 absolute left-8 bottom-8 h-fit rounded-2xl backdrop-blur-[15px] border border-white/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-gradient-to-r from-black/12 via-black/7 to-black/7 bg-clip-padding max-w-[500px] z-30'
          style={{
            y: cardYOffset.get() * 10,
            opacity: cardOpacity,
          }}
        >
          <div className="relative z-10 p-4  text-white rounded-2xl  ">
            <h2 className='text-2xl lg:text-3xl font-bold mb-4 leading-tight tracking-wider'>AI That runs car care autonomously </h2>
            <p className='text-sm lg:text-base leading-relaxed mb-3 tracking-wider'>
              Book faster, pay once, get receipts forever.
              Shops get predictable calendars. Everyone gets their time back.
            </p>

            <p className="underline text-white inline-flex items-center gap-2">
              Get to know us <ChevronRight className="w-4 h-4" />
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-8 right-8 z-10 p-5 lg:p-8 lg:pr-6 text-white ">
          <div className="w-full flex justify-end pr-6"><Wrench className="w-8 h-8 mb-4 rotate-280 self-end flex" /></div>
          <p className='text-sm lg:text-base leading-relaxed mb-3 tracking-wider '>
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
      <Coordination />

      <section className="w-full  min-h-screen flex flex-col mt-4 items-center justify-center relative ">

        <section className="w-[90%] mx-auto relative aspect-video  overflow-hidden rounded-2xl ring-4 ring-black/10">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden ">
            <Image
              src="/repairconnect-home2.jpg"
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
                  RepairConnect helps manage <TypingAnimation words={endtoend} loop />
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
                      className="px-8 py-3 rounded-2xl text-white font-semibold text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-blue-900 hover:bg-blue-950 relative z-20"
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
            <div className=" z-10 max-w-xl p-14 absolute bottom-1/5 -left-10">
              <div className="relative p-5 lg:p-10 ml-8 rounded-2xl   ">

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


      <BlogSection />


    </main >
  );
}

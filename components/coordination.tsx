"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react'
import { Iphone } from './ui/iphone'
import { AnimatedList } from './ui/animated-list'
import {
  Gift,
  Droplet,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Package,
  TrendingDown,
  CreditCard
} from 'lucide-react'
import { ProgressiveBlur } from './ui/progressive-blur'
import TextAnimation from './ui/scroll-text'
import Image from 'next/image'

export default function Coordination() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const items = [
    {
      icon: Gift,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      emoji: '🎁',
      headline: 'You just earned 120 points',
      sub: "You're 380 away from a free tire rotation.",
      description: "Otopair rewards every service.|Get points for every booking, review, and referral.|Free maintenance is just a few appointments away.",
      cta: 'View rewards',
      type: 'loyalty'
    },
    {
      icon: Droplet,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100',
      emoji: '🛢️',
      headline: 'Oil change coming up',
      sub: "You're ~200 miles out. Grab a 30-min slot.",
      description: "No more guessing when service is due.|Otopair tracks your mileage and alerts you proactively.|Book instantly with certified mechanics who know your vehicle.",
      cta: 'Book now',
      type: 'oil-change'
    },
    {
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      emoji: '✅',
      headline: 'Your car is ready for pickup',
      sub: 'Pay in the app to release the vehicle.',
      description: "The future of car care is here.|Get real-time updates, pay securely in-app, and unlock your vehicle—all without stepping foot in the shop.|Welcome to seamless service.",
      cta: 'Pay in app',
      type: 'car-ready'
    },
    {
      icon: AlertTriangle,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      emoji: '⚠️',
      headline: 'Check-engine light detected',
      sub: 'We decoded the issue. See nearby openings today.',
      description: "Otopair's AI-powered diagnostics read your codes instantly.|No more mystery lights.|Get matched with specialists who can fix it today, with transparent pricing upfront.",
      cta: 'See live slots',
      type: 'check-engine'
    },
    {
      icon: Calendar,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      emoji: '📅',
      headline: 'Today 9:30 AM at John\'s Shop',
      sub: 'Bring wheel lock key if you have it.',
      description: "Smart scheduling that works around your life.|Otopair syncs with your calendar, sends reminders, and even suggests the best times based on your routine.|Booking made simple.",
      cta: 'Manage',
      type: 'appointment'
    },
    {
      icon: CreditCard,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      emoji: '💳',
      headline: 'Balance due before pickup',
      sub: 'Pay in the app to finalize and unlock release.',
      description: "One app for everything.|Pay securely, get instant receipts, track your service history, and never handle cash at the shop again.|Otopair is the new standard.",
      cta: 'Pay now',
      type: 'payment'
    },
  ]

  const itemCount = items.length

  // Track scroll progress through the notifications section
  const { scrollYProgress } = useScroll({
    target: notificationsRef,
    offset: ["start start", "end start"] // Start tracking when section enters viewport
  })

  // Transform scroll progress to item index (0 to itemCount-1)
  const scrollBasedIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, itemCount + 1]
  )

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollBasedIndex.on("change", (latest) => {
      const newIndex = Math.min(Math.max(0, Math.floor(latest)), itemCount - 1)
      setActiveIndex(newIndex)
    })
    return () => unsubscribe()
  }, [scrollBasedIndex, itemCount])

  return (
    <section className="w-full px-6 lg:px-12 py-12 grid grid-cols-1  gap-12 items-center max-w-6xl mx-auto sticky top-0">
      <div
        ref={notificationsRef}
        className='w-full relative'
        id='notifications'
        style={{
          height: `${itemCount * 100}vh` // Each item gets 100vh of scroll space
        }}
      >
        <div className='w-full lg:hidden flex items-center justify-center'>
          <div className="w-full flex items-start flex-col justify-end xl:h-[70%] h-[50%] px-8 gap-y-8">
            <div className="space-y-6 flex flex-col">
              <TextAnimation
                text="You need clarity before you drive over."
                direction="left"
                classname="text-xl sm:text-4xl lg:text-3xl text-neutral-900 "
              />
              <TextAnimation
                text="You need confidence when you hand over the keys."
                direction="left"
                classname="text-xl sm:text-4xl lg:text-3xl text-neutral-900"
              />
              <TextAnimation
                text="You need coordination."
                direction="left"
                classname="text-xl sm:text-4xl lg:text-3xl text-neutral-900"
              />
            </div>

          </div>
        </div>
        {/* Sticky container that stays in view while scrolling */}
        <div className='sticky top-0 h-screen w-full flex justify-center lg:justify-end items-center'>
          <div className='lg:w-[70%] w-[50%] h-full lg:flex hidden items-center justify-center px-8'>
            <div className="w-full flex items-start flex-col justify-end xl:h-[70%] h-[50%] px-8 gap-y-8">
              <div className="space-y-6 flex flex-col">
                <TextAnimation
                  text="You need clarity before you drive over."
                  direction="left"
                  classname="text-3xl sm:text-4xl lg:text-3xl text-neutral-900 font-serif"
                />
                {/* <h2 className={` text-3xl sm:text-4xl lg:text-3xl text-neutral-900 font-serif `}>You need clarity before you drive over.</h2> */}
                <TextAnimation
                  text="You need confidence when you hand over the keys."
                  direction="left"
                  classname="text-3xl sm:text-4xl lg:text-3xl text-neutral-900 font-serif"
                />
                <TextAnimation
                  text="You need coordination."
                  direction="left"
                  classname="text-3xl sm:text-4xl lg:text-3xl text-neutral-900 font-serif"
                />
                {/* <h2 className={` text-3xl sm:text-4xl lg:text-3xl text-neutral-900 font-serif`}>You need confidence when you hand over the keys.</h2> */}
                {/* <h2 className={` text-3xl sm:text-4xl lg:text-3xl text-neutral-900 font-serif`}>You need coordination.</h2> */}
              </div>
              {/* Vertical Rectangle Indicator */}
              <div className="flex flex-row items-end gap-3 h-full mt-auto flex-1 justify-end">
                {items.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-px rounded-full transition-colors duration-300 ${idx === activeIndex
                      ? 'bg-neutral-900'
                      : 'bg-neutral-300'
                      }`}
                    initial={false}
                    animate={{
                      height: idx === activeIndex ? '1rem' : '0.5rem',
                      opacity: idx === activeIndex ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  />
                ))}
              </div>

              {/* Description Text */}
              <div className=' w-full'>
                <AnimatePresence mode="wait">
                  {items[activeIndex] && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex-1 "
                    >
                      <div className="space-y-4 leading-tight ">
                        {items[activeIndex].description.split('|').map((sentence, idx) => (
                          <motion.p
                            key={`${activeIndex}-${idx}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: idx * 0.15,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="text-lg text-neutral-700 leading-relaxed"
                          >
                            {sentence.trim()}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex lg:w-[40%] sm:w-full w-[90%] mx-auto md:flex-row flex-col justify-center lg:justify-end items-center lg:mt-0 mt-14">
            <Iphone className='relative lg:w-full h-full md:w-[45%] w-full' src="/liquidglassphone.png">
              <div className="p-4  w-full h-fit">
                <div className='w-full mb-4 flex items-center justify-center relative'>
                  {/* Blurred text behind for liquid glass effect */}
                  <div
                    className="absolute text-6xl sm:text-7xl md:text-8xl  font-light tracking-tight select-none  [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_8rem),linear-gradient(to_bottom,transparent,black_6rem),linear-gradient(to_left,transparent,black_3rem),linear-gradient(to_right,transparent,black_3rem)]"
                    style={{
                      // background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(200,220,255,0.6) 50%, rgba(150,180,255,0.4) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      // filter: 'blur(12px)',
                      // WebkitFilter: 'blur(12px)',
                      // opacity: 0.7,
                    }}
                  >
                    {currentTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    }).split(' ')[0]}
                  </div>
                  {/* Main time text with liquid glass gradient */}
                  <div
                    className="relative text-8xl sm:text-7xl md:text-8xl px-2   tracking-tight select-none z-10 [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_1rem),linear-gradient(to_bottom,transparent,black_1rem),linear-gradient(to_left,transparent,black_1rem),linear-gradient(to_right,transparent,black_1rem)]"
                    style={{
                      // background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,245,255,0.95) 25%, rgba(220,235,255,0.85) 50%, rgba(200,225,255,0.75) 75%, rgba(180,210,255,0.65) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: `
                        0 0 40px rgba(200,220,255,0.6),
                        0 0 80px rgba(180,210,255,0.4),
                        0 0 120px rgba(150,180,255,0.2),
                        0 2px 10px rgba(0, 0, 0, 0.15),
                        0 0 2px rgba(255, 255, 255, 0.5)
                      `,
                      WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.6)',
                      // filter: 'blur(0.5px) drop-shadow(0 0 25px rgba(200,220,255,0.5))',
                      // WebkitFilter: 'blur(0.5px) drop-shadow(0 0 25px rgba(200,220,255,0.5))',
                    }}
                  >
                    {currentTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    }).split(' ')[0]}
                  </div>
                </div>
                <AnimatedList
                  className='w-full h-full'
                  onActiveIndexChange={setActiveIndex}
                  currentIndex={activeIndex}
                >
                  {items.map((item, i) => {
                    const IconComponent = item.icon
                    return (
                      <div
                        key={item.type}
                        className="relative xl:w-[80vw] max-[420px] max-w-full lg:max-w-[315px] rounded-2xl px-3 py-2.5 sm:py-3 bg-white/60 backdrop-blur-[20px]  shadow-[0_1px_8px_0_rgba(0,0,0,0.05)]"
                      >

                        <div className="flex items-start sm:gap-3 gap-2 relative">
                          <div className='lg:w-10 w-8 lg:h-10 h-8 rounded-lg flex items-center justify-center relative self-center bg-white/60 border border-white/60'>
                            <Image src={'/Repairconnectglasslogo.png'} alt={item.headline} fill className='object-cover h-full w-full rounded-2xl  ' />
                          </div>
                          {/* Icon with background */}
                          {/* <div className={`${item.bgColor} rounded-full p-2 aspect-square shrink-0`}>
                            {item.emoji}
                          </div> */}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="xl:text-xs lg:text-[10px] text-[10px] font-semibold text-neutral-900 leading-tight relative w-full">
                                {item.headline} <span className={`${i == 4 ? 'sm:block hidden' : ''}`}>{item.emoji}</span>  <span className="xl:text-[9px] lg:text-[7px] text-[7px]  text-neutral-500 absolute top-1/2 -translate-y-1/2 right-0">Just now</span>
                              </h3>
                            </div>
                            <p className="xl:text-[11px] lg:text-[9px] text-[9px] text-neutral-800 leading-relaxed mb-1.5">
                              {item.sub}
                            </p>
                            {/* <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                              {item.cta} →
                            </button> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </AnimatedList>
              </div>
            </Iphone>
            <div className='lg:hidden sm:flex hidden items-start justify-start flex-col mt-4 h-62 relative w-full md:order-first order-last md:w-[45%] w-full'>
              {/* Vertical Rectangle Indicator */}
              <div className="flex flex-row items-end gap-3 h-full flex-1 justify-end -bottom-12 left-0 absolute">
                {items.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-px rounded-full transition-colors duration-300 ${idx === activeIndex
                      ? 'bg-neutral-900'
                      : 'bg-neutral-300'
                      }`}
                    initial={false}
                    animate={{
                      height: idx === activeIndex ? '1rem' : '0.5rem',
                      opacity: idx === activeIndex ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  />
                ))}
              </div>

              {/* Description Text */}
              <div className=' w-full sm:flex hidden'>
                <AnimatePresence mode="wait">
                  {items[activeIndex] && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex-1 "
                    >
                      <div className="space-y-4 leading-tight ">
                        {items[activeIndex].description.split('|').map((sentence, idx) => (
                          <motion.p
                            key={`${activeIndex}-${idx}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: idx * 0.15,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="text-lg text-neutral-700 leading-relaxed"
                          >
                            {sentence.trim()}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
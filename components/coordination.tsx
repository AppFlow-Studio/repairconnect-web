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
      description: "RepairConnect rewards every service.|Get points for every booking, review, and referral.|Free maintenance is just a few appointments away.",
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
      description: "No more guessing when service is due.|RepairConnect tracks your mileage and alerts you proactively.|Book instantly with certified mechanics who know your vehicle.",
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
      description: "RepairConnect's AI-powered diagnostics read your codes instantly.|No more mystery lights.|Get matched with specialists who can fix it today, with transparent pricing upfront.",
      cta: 'See live slots',
      type: 'check-engine'
    },
    {
      icon: Calendar,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      emoji: '📅',
      headline: 'Tomorrow 10:30 AM at Midtown Motors',
      sub: 'Bring wheel lock key if you have it.',
      description: "Smart scheduling that works around your life.|RepairConnect syncs with your calendar, sends reminders, and even suggests the best times based on your routine.|Booking made simple.",
      cta: 'Manage',
      type: 'appointment'
    },
    // {
    //   icon: Package,
    //   iconColor: 'text-teal-600',
    //   bgColor: 'bg-teal-100',
    //   emoji: '📦',
    //   headline: 'Parts just landed',
    //   sub: 'We opened extra slots this week.',
    //   description: "Our network of shops works together.|When parts arrive anywhere, we open slots across the network.|Get faster service with RepairConnect's coordinated system.",
    //   cta: 'Pick a time',
    //   type: 'parts'
    // },
    // {
    //   icon: TrendingDown,
    //   iconColor: 'text-emerald-600',
    //   bgColor: 'bg-emerald-100',
    //   emoji: '💰',
    //   headline: 'Same-day slots dropped in price',
    //   sub: 'Two shops nearby lowered brake service today only.',
    //   description: "Dynamic pricing means you save.|RepairConnect shows you real-time deals from vetted mechanics.|Compare prices, read reviews, and book with confidence—all in one place.",
    //   cta: 'Compare',
    //   type: 'price-drop'
    // },
    {
      icon: CreditCard,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      emoji: '💳',
      headline: 'Balance due before pickup',
      sub: 'Pay in the app to finalize and unlock release.',
      description: "One app for everything.|Pay securely, get instant receipts, track your service history, and never handle cash at the shop again.|RepairConnect is the new standard.",
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
    <section className="w-full px-6 lg:px-12 py-12 grid grid-cols-1  gap-12 items-center max-w-6xl mx-auto">
      <div
        ref={notificationsRef}
        className='w-full relative min-h-[200vh]'
        id='notifications'
        style={{
          height: `${itemCount * 100}vh` // Each item gets 100vh of scroll space
        }}
      >
        {/* Sticky container that stays in view while scrolling */}
        <div className='sticky top-0 h-screen w-full flex justify-center lg:justify-end items-center'>
          <div className='w-[70%] h-full flex items-center justify-center px-8'>
            <div className="w-full flex items-start flex-col justify-end h-[70%] px-8 gap-y-8 ">
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
                    className={`w-1 rounded-full transition-colors duration-300 ${idx === activeIndex
                      ? 'bg-neutral-900'
                      : 'bg-neutral-300'
                      }`}
                    initial={false}
                    animate={{
                      height: idx === activeIndex ? '24px' : '12px',
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
                            className="text-lg sm:text-xl text-neutral-700 leading-relaxed"
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
          <div className="flex w-[40%] justify-center lg:justify-end items-center">
            <Iphone className=' relative w-full h-full' src="/liquidglassphone.png">
              <div className="p-4  w-full h-full">
                <div className='w-full mb-4 flex items-center justify-center relative'>
                  {/* Blurred text behind for liquid glass effect */}
                  <div
                    className="absolute text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight select-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(200,220,255,0.6) 50%, rgba(150,180,255,0.4) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'blur(12px)',
                      WebkitFilter: 'blur(12px)',
                      opacity: 0.7,
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
                    className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight select-none z-10"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,245,255,0.95) 25%, rgba(220,235,255,0.85) 50%, rgba(200,225,255,0.75) 75%, rgba(180,210,255,0.65) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      // textShadow: `
                      //   0 0 40px rgba(200,220,255,0.6),
                      //   0 0 80px rgba(180,210,255,0.4),
                      //   0 0 120px rgba(150,180,255,0.2),
                      //   0 2px 10px rgba(0, 0, 0, 0.15),
                      //   0 0 2px rgba(255, 255, 255, 0.5)
                      // `,
                      WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
                      filter: 'blur(0.5px) drop-shadow(0 0 25px rgba(200,220,255,0.5))',
                      WebkitFilter: 'blur(0.5px) drop-shadow(0 0 25px rgba(200,220,255,0.5))',
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
                  {items.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <div
                        key={item.type}
                        className="w-full rounded-xl relative shadow-sm px-4 py-3 hover:shadow-md transition-shadow"
                      >
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
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backdrop-blur-[3px]"
                          style={{
                            filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                            backdropFilter: 'brightness(2) blur(18x)',
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
                        <div className="flex items-start gap-3 relative">
                          <div className='w-10 h-10 rounded-2xl flex items-center justify-center relative self-center'>
                            <Image src={'/repairconnectglasslogo.png'} alt={item.headline} fill className='object-cover h-full w-full rounded-2xl  ' />
                          </div>
                          {/* Icon with background */}
                          {/* <div className={`${item.bgColor} rounded-full p-2 aspect-square shrink-0`}>
                            {item.emoji}
                          </div> */}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-neutral-900 leading-tight">
                                {item.headline} {item.emoji}
                              </h3>
                            </div>
                            <p className="text-xs text-neutral-800 leading-relaxed mb-1.5">
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
          </div>
        </div>
      </div>
    </section>
  )
}
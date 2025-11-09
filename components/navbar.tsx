'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import LiquidGlass from '@nkzw/liquid-glass'
const navItems = [
    {
        label: 'About',
        href: '/'
    },
    {
        label: 'Careers',
        href: '/careers'
    },
    {
        label: 'Services',
        href: '/services'
    }
]
function Navbar() {
    return (
        <div className='fixed lg:top-4 lg:left-1/2 lg:-translate-x-1/2 z-[112] w-full lg:max-w-fit mx-auto lg:rounded-[12px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[background-color,border-color,box-shadow,backdrop-filter] lg:border border-white/20 bg-gradient-to-r from-[rgba(249,250,247,0.12)] to-[rgba(249,250,247,0.18)] lg:shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] backdrop-blur-[9px]'>
            <main className='flex gap-6 items-center px-5 py-3 lg:px-3 lg:py-2 w-full justify-between'>
                <div className='flex self-center w-12 h-12 relative'><Image src="/repairconnectglasslogo.png" alt="RepairConnect Hero" fill className="object-cover" /></div>

                {
                    navItems.map((item) => (
                        <Link key={item.href} href={item.href} className='font-medium text-[15px] leading-[140%] tracking-[-0.15px] hover:opacity-80 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] font-af text-white'>
                            {item.label}
                        </Link>
                    ))
                }
            </main>
        </div>
    )
}

export default Navbar

// Liquid Glass
// <div className="relative w-full p-4 rounded-3xl overflow-hidden">
// {/* SVG Filter Definition */}
// <svg style={{ display: 'none' }}>
//     <filter id="displacementFilter">
//         <feTurbulence
//             type="turbulence"
//             baseFrequency="0.01"
//             numOctaves="2"
//             result="turbulence"
//         />
//         <feDisplacementMap
//             in="SourceGraphic"
//             in2="turbulence"
//             scale="200"
//             xChannelSelector="R"
//             yChannelSelector="G"
//         />
//     </filter>
// </svg>

// {/* Liquid Glass Background */}
// <div
//     className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
//     style={{
//         filter: 'drop-shadow(-8px -10px 46px #0000005f)',
//         backdropFilter: 'brightness(1.1) blur(2px)',
//         border: '1px solid rgba(255, 255, 255, 0.2)',
//     }}
// >
//     <div
//         className="absolute inset-0 rounded-3xl"
//         style={{
//             boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
//         }}
//     />
// </div>
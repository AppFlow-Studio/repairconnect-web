import { ArrowRight, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Writing', href: '/writing' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Company', href: '/company' },
]
export default function Content() {
    return (
        <div className='h-full w-full flex flex-col justify-between'>
            <Section1 />
            <Section2 />
        </div>
    )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle email subscription
        console.log('Email submitted:', email)
        setEmail('')
    }
    return (
        <div />
    )
}

const Nav = () => {
    return (
        <div className='flex shrink-0 gap-20 relative w-full h-[700px] '>

            <Image src='/footerimg2.png' alt='Otopair Footer img' fill className='object-cover' />
            <div
                className="absolute inset-0 w-full h-full backdrop-blur-[1px]"
                style={{
                    background: "linear-gradient(to bottom, rgba(30,30,32,0.2) 80%, transparent 120%)"
                }}
            />
            {/* Overlay Text - Bottom Left */}
            <div className="absolute sm:bottom-6 sm:left-10 left-1/2 bottom-3 -translate-x-1/2 sm:translate-x-0 lg:bottom-8 lg:left-8 z-10 w-full sm:w-auto sm:text-start text-center">
                <p className="text-white text-base sm:text-sm w-full text-center">
                    © Repair Connect of New York 2025
                </p>
            </div>

            {/* Overlay Text - Bottom Right */}
            <div className="absolute sm:bottom-6  sm:right-6 right-1/2 bottom-11 translate-x-1/2 lg:bottom-8  w-fit sm:translate-x-0">
                <p className="text-white text-xs sm:text-sm">
                    Design by <span className='underline sm:text-neutral-300 text-neutral-200'>Appflow Studio</span>
                </p>
            </div>
        </div>
    )
}
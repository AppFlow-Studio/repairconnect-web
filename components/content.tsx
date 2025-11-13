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

            <Image src='/footerimg2.png' alt='RepairConnect Footer img' fill className='object-cover ' />
            <div
                className="absolute inset-0 w-full h-full backdrop-blur-[1px]"
                style={{
                    background: "linear-gradient(to bottom, rgba(30,30,32,0.2) 80%, transparent 120%)"
                }}
            />
            {/* Overlay Text - Bottom Left */}
            <div className="absolute bottom-6 left-10 lg:bottom-8 lg:left-8 z-10">
                <p className="text-white text-xs sm:text-sm">
                    © Repair Connect of New York 2025
                </p>
            </div>

            {/* Overlay Text - Bottom Right */}
            <div className="absolute bottom-6 right-10 lg:bottom-8 lg:right-8 z-10">
                <p className="text-white text-xs sm:text-sm">
                    Design by <span className='underline text-neutral-500'>Appflow Studio</span>
                </p>
            </div>
        </div>
    )
}
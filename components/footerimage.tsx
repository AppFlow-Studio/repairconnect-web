"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Twitter, Linkedin, ArrowRight } from 'lucide-react'
import Image from 'next/image';
import Background from '../../public/images/2.jpg';

import { useScroll, useTransform, motion } from 'framer-motion';

import { useRef } from 'react';
import Content from './content';
export default function FooterImage() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle email subscription
        console.log('Email submitted:', email)
        setEmail('')
    }

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Writing', href: '/writing' },
        { label: 'Careers', href: '/careers' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Company', href: '/company' },
    ]

    return (
        <div

            className='relative sm:h-[700px] h-[400px]'

            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}

        >

            <div className='relative sm:h-[calc(100vh+700px)] h-[calc(100vh+400px)] -top-[100vh]'>

                <div className='sm:h-[700px] h-[400px] sticky top-[calc(100vh-700px)]'>

                    <Content />

                </div>

            </div>

        </div>
    )
}


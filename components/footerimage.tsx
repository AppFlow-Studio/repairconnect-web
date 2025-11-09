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

            className='relative h-screen'

            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}

        >

            <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>

                <div className='h-[800px] sticky top-[calc(100vh-800px)]'>

                    <Content />

                </div>

            </div>

        </div>
    )
}


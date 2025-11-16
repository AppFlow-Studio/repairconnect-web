'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeInCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeInCard({ children, delay = 0, className = '' }: FadeInCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px" // Start animation when element is 100px from viewport
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
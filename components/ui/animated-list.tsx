"use client"

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  onActiveIndexChange?: (index: number) => void
  currentIndex?: number // External control for scroll-based animation
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, onActiveIndexChange, currentIndex, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    // Use external currentIndex if provided, otherwise use internal state
    const activeIndex = currentIndex !== undefined ? currentIndex : index

    useEffect(() => {
      if (onActiveIndexChange) {
        onActiveIndexChange(activeIndex)
      }
    }, [activeIndex, onActiveIndexChange])

    // Only auto-advance if not externally controlled
    useEffect(() => {
      if (currentIndex === undefined && index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)

        return () => clearTimeout(timeout)
      }
    }, [index, delay, childrenArray.length, currentIndex])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, activeIndex + 1).reverse()
      return result
    }, [activeIndex, childrenArray])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"

'use client'
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue, useMotionValue, useMotionValueEvent } from 'motion/react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  progress: MotionValue<number>;
  features: string[];
  range: [number, number];
  targetScale: number;
  activeStep: number | null;
  stepNumber: number; // Which step this card corresponds to (1, 2, 3, 4)
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  url,
  progress,
  features,
  range,
  targetScale,
  activeStep,
  stepNumber,
}) => {
  const container = useRef(null);

  // Only show the active card, smoothly animate in/out
  const isActive = activeStep === stepNumber;

  return (
    <motion.div
      ref={container}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.95,
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        x: '-50%',
        width: '100%',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      className={`flex flex-col h-fit px-12 origin-bottom w-full rounded-2xl relative  mt-auto`}
    >
      <div className={`flex h-full mt-5 gap-10`}>
        <div className={`w-full relative`}>
          <h2 className={`text-xl text-start font-semibold text-gray-800 mb-3`}>{title}</h2>
          <p className={`text-sm text-gray/90 leading-relaxed mb-4`}>{description}</p>
         
          <div className='flex flex-col gap-3 mt-4'>
            {
              features.map((feature, index) => (
                <div key={index} className='flex items-center  gap-2 '>
                  <span className='text-base text-blue-400 '>•</span>
                  <p className={`text-xs text-gray/90 leading-relaxed`}>{feature}</p>
                </div>
              ))
            }
          </div>
        </div>

        {/* <div
          className={`relative w-[60%] h-full rounded-lg overflow-hidden`}
        >
          <motion.div
            className={`w-full h-full `}
            style={{ scale: imageScale }}
          >
            <Image fill src={url} alt='image' className='object-cover aspect-square' />
          </motion.div>
        </div> */}
      </div>
    </motion.div>
  );
};
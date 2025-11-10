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


  const imageScale = useTransform(progress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale], { clamp: true });

  // Calculate base opacity from scroll progress - fade in and stay at 1
  const baseOpacity = useTransform(
    progress,
    [
      Math.max(0, range[0] - 0.1),
      range[0],
      range[0] + 0.15,
      range[1]
    ],
    [0, 0, 1, 1],  // Fade in and stay at 1
    { clamp: true }
  );

  // Create a motion value for opacity that we can update reactively
  const opacity = useMotionValue(0);
  const hasBeenVisible = useRef(false);

  // Update opacity based on activeStep and baseOpacity
  useEffect(() => {
    const updateOpacity = () => {
      const base = baseOpacity.get();
      if (activeStep === stepNumber) {
        // Active step: fade in, then stay at 1
        if (base >= 1) {
          hasBeenVisible.current = true;
        }
        opacity.set(base);
      } else if (activeStep !== null && activeStep > stepNumber) {
        // Past step: keep at opacity 1 once it has been visible
        if (hasBeenVisible.current) {
          opacity.set(1);
        } else {
          opacity.set(0);
        }
      } else {
        // Future step: hidden
        opacity.set(0);
        hasBeenVisible.current = false;
      }
    };

    // Update when baseOpacity changes
    const unsubscribe = baseOpacity.on("change", updateOpacity);
    // Initial update
    updateOpacity();

    return () => unsubscribe();
  }, [activeStep, stepNumber, baseOpacity, opacity]);

  // Calculate step states for z-index
  const isActive = activeStep === stepNumber;
  const isPast = activeStep !== null && activeStep > stepNumber;

  return (
    <motion.div
      ref={container}
      style={{
        scale,
        opacity,
        position: 'absolute',
        top: `${i * 10}px`,
        left: '50%',
        x: '-50%',
        zIndex: isActive ? 50 : isPast ? 40 - (activeStep || 0) + stepNumber : 30 - stepNumber,
        maxWidth: '800px',
      }}
      className={`flex flex-col h-[450px] sm:p-4 p-2 origin-top w-full rounded-2xl lg:p-8 lg:pr-6 relative backdrop-blur-[15px] border border-white/20 shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] bg-linear-to-r from-black/7 via-black/5 to-black/2 bg-clip-padding max-w-[500px] `}
    >
      <h2 className='text-2xl text-start font-semibold'>{title}</h2>
      <div className={`flex h-full mt-5 gap-10`}>
        <div className={`w-[40%] relative top-[10%]`}>
          <p className='text-sm'>{description}</p>
          <span className='flex items-center gap-2 pt-2'>
            <a
              href={'#'}
              target='_blank'
              className='underline cursor-pointer'
            >
              See more
            </a>
            <svg
              width='22'
              height='12'
              viewBox='0 0 22 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                fill='black'
              />
            </svg>
          </span>
          <div className='flex flex-col gap-2 mt-4'>
            {
              features.map((feature, index) => (
                <div key={index} className='flex items-center gap-2 '>
                  <span className='text-sm text-blue-500'>•</span>
                  <p className='text-sm'>{feature}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div
          className={`relative w-[60%] h-full rounded-lg overflow-hidden`}
        >
          <motion.div
            className={`w-full h-full `}
            style={{ scale: imageScale }}
          >
            <Image fill src={url} alt='image' className='object-cover aspect-square' />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
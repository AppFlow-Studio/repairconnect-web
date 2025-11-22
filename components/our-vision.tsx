"use client";

import Image from "next/image";
import { World } from "./World";
import { motion } from "motion/react";
import { TextAnimate } from "./ui/text-animate";
import { Sparkles } from "./ui/sparkles";

export default function OurVision() {

    return (
        <section className="relative w-full sm:min-h-screen min-h-[60vh] bg-white flex sm:flex-row flex-col items-center justify-between sm:px-8 max-w-5xl mx-auto">
            <div className="relative sm:w-[50%] w-full h-full mask-intersect [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_8rem),linear-gradient(to_bottom,transparent,black_6rem),linear-gradient(to_left,transparent,black_3rem),linear-gradient(to_right,transparent,black_3rem)] border items-center justify-center flex">
                <World />
                <Sparkles
                    density={800}
                    speed={1.2}
                    size={1.2}
                    direction='top'
                    opacitySpeed={2}
                    color='#32A7FF'
                    className='absolute inset-x-0 bottom-0 h-full w-full sm:block hidden'
                />
                <Sparkles
                    density={300}
                    speed={1.2}
                    size={1.2}
                    direction='top'
                    opacitySpeed={2}
                    color='#32A7FF'
                    className='absolute inset-x-0 bottom-0 h-full w-full sm:hidden block'
                />
            </div>

            <div className="relative sm:w-[40%] w-[90%] sm:px-0 px-4 items-center flex flex-col justify-between sm:space-y-20 space-y-8">
                <div className="flex flex-col sm:space-y-10 space-y-4">
                    <p

                        className="font-af font-medium sm:text-base text-sm tracking-[-0.15px] leading-[140%] text-neutral-600"
                    >
                        Our Mission is to reinvent vehicle maintenance and care for every driver on the road today. From preset prices that dont change “when the job is done” to confirmed appointment times so you’re never late to work again.                     </p>
                    <p

                        className="font-af font-medium sm:text-base text-sm tracking-[-0.15px] leading-[140%] text-neutral-600"
                    >
                        Waking up a to a weird noise, or a Christmas tree dashboard in the middle of July will never be an issue again.
                    </p>
                </div>
                <TextAnimate animation="blurIn" as="h1"
                    className="font-af font-medium sm:text-3xl text-2xl tracking-[-0.15px] leading-[140%] text-neutral-700"
                    style={{ fontFamily: "var(--font-Jersey_20)" }}
                >
                    Otopair puts automotive repair at your fingertips.
                </TextAnimate>
            </div>
        </section>
    )
}
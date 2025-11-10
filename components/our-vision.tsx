"use client";

import Image from "next/image";
import { World } from "./World";
import { motion } from "motion/react";
import { TextAnimate } from "./ui/text-animate";
import { Sparkles } from "./ui/sparkles";

export default function OurVision() {

    return (
        <section className="relative w-full min-h-screen bg-white flex flex-row items-center justify-between px-8 max-w-5xl mx-auto">
            <div className="relative w-[50%] h-full mask-intersect [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_8rem),linear-gradient(to_bottom,transparent,black_6rem),linear-gradient(to_left,transparent,black_3rem),linear-gradient(to_right,transparent,black_3rem)] border items-center justify-center flex">
                <World />
                <Sparkles
                    density={800}
                    speed={1.2}
                    size={1.2}
                    direction='top'
                    opacitySpeed={2}
                    color='#32A7FF'
                    className='absolute inset-x-0 bottom-0 h-full w-full '
                />
            </div>

            <div className="relative w-[40%] items-center flex flex-col justify-between space-y-20">
                <div className="flex flex-col space-y-10">
                    <p

                        className="font-af font-medium text-base tracking-[-0.15px] leading-[140%] text-neutral-600"
                    >
                        We envision a world where car care runs itself. Anyone with a vehicle can see real prices, real availability, and real reviews, then book the right mechanic in minutes.
                    </p>
                    <p

                        className="font-af font-medium text-base tracking-[-0.15px] leading-[140%] text-neutral-600"
                    >
                        A world where someone wakes up to a weird engine light, gets a notification, and gets a confirmed repair slot in real time.
                    </p>
                </div>
                <TextAnimate animation="blurIn" as="h1"
                    className="font-af font-medium text-3xl font-serif tracking-[-0.15px] leading-[140%] text-neutral-700"
                // style={{ fontFamily: "var(--font-Roboto_Slab)" }}
                >
                    Where booking a mechanic is as easy as ordering delivery.
                </TextAnimate>
            </div>
        </section>
    )
}
import React from "react";
import DatabaseWithRestApi from "./ui/database-with-rest-api";
import { LogoCarouselDemo } from "./logo-carousel-demo";
import { Marquee } from "./ui/marquee";
import { IconsArray } from "@/components/icons/icons-array";
import { Calendar, Clock, DollarSign, Wrench } from "lucide-react";
import DatabaseMobile from "./ui/database-mobile";

export default function Flow() {
    return (
        <section
            className="relative w-full max-w-8xl mx-auto h-full sm:min-h-screen flex flex-col sm:p-8 items-center justify-center sm:px-8 px-4 py-12 bg-gray-100"
        // style={{
        //     background: "radial-gradient(circle, #d9e2ef, #9faabe, #69768e, #374561, #051937)"
        // }}
        >
            <div className=" rounded-xl w-full items-center justify-center sm:flex hidden">
                <DatabaseWithRestApi
                    badgeTexts={{
                        first: "Service",
                        firstIcon: Wrench,
                        second: "Quote",
                        secondIcon: DollarSign,
                        third: "Time",
                        thirdIcon: Clock,
                        fourth: "Book",
                        fourthIcon: Calendar,
                    }}
                />
            </div>
            <div className="rounded-xl w-full items-center justify-center sm:hidden block space-y-8">
                <div className="text-start w-full lg:hidden flex flex-row space-x-8 sm:px-12 ">
                    <div className="flex flex-col space-y-8">
                        <p className=" text-gray-700 sm:text-3xl text-xl font-[--font-lora] leading-tight tracking-tight">Otopair reads your request, finds the right shop,<br />syncs calendars, and confirms payment in one flow.</p>

                        <p className="sm:text-3xl text-xl font-[--font-lora] leading-tight tracking-tight text-gray-800">
                            No phone-tag, just a booked bay.
                        </p>
                    </div>
                </div>
                <DatabaseMobile />
            </div>
        </section>
    )
}
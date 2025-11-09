import React from "react";
import DatabaseWithRestApi from "./ui/database-with-rest-api";
import { LogoCarouselDemo } from "./logo-carousel-demo";
import { Marquee } from "./ui/marquee";
import { IconsArray } from "@/components/icons/icons-array";
import { Calendar, Clock, DollarSign, Wrench } from "lucide-react";

export default function Flow() {
    return (
        <section
            className="relative w-full max-w-5xl mx-auto h-full min-h-screen flex flex-col p-8 items-center justify-center px-8 py-12 ">
            <div className="text-start w-full flex flex-row space-x-8">
                <div className="flex flex-col space-y-8">
                    <p className=" text-black text-3xl font-[--font-lora] leading-tight tracking-tight">RepairConnect reads your request, finds the right shop,<br />syncs calendars, and confirms payment in one flow.</p>

                    <p className="text-3xl font-[--font-lora] leading-tight tracking-tight">
                        No phone-tag, just a booked bay.
                    </p>
                </div>
                {/* <LogoCarouselDemo /> */}
            </div>
            <div className="border-b py-4 h-3 p-2 w-[60%] relative" />
            {/* <p className="lg:text-2xl mb-3 text-gray-300 my-4 z-10 font-af font-medium text-lg tracking-[-0.15px] leading-relaxed">Powered By</p>
            <Marquee className="w-[25%] backdrop-blur-xl rounded-lg py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)] space-x-4 flex flex-row items-center">
                {
                    IconsArray.map((item) => (
                        <div key={item.name} className="grayscale"><item.icon className={`h-8 w-8 ${item.name === "Stripe" ? "h-12 w-12" : ""}`} /></div>
                    ))
                }
            </Marquee> */}
            <div className="p-4 rounded-xl w-full flex items-center justify-center">
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
        </section>
    )
}
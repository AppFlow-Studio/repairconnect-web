import React from "react";
import DatabaseWithRestApi from "./ui/database-with-rest-api";
import { LogoCarouselDemo } from "./logo-carousel-demo";
import { Marquee } from "./ui/marquee";
import { IconsArray } from "@/components/icons/icons-array";
import { Calendar, Clock, DollarSign, Wrench } from "lucide-react";

export default function Flow() {
    return (
        <section
            className="relative w-full max-w-8xl mx-auto h-full min-h-screen flex flex-col p-8 items-center justify-center px-8 py-12 bg-gray-100"
            // style={{
            //     background: "radial-gradient(circle, #d9e2ef, #9faabe, #69768e, #374561, #051937)"
            // }}
            >
            
            <div className=" rounded-xl w-full flex items-center justify-center">
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
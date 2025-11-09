import Image from "next/image";

export default function HomeHero() {
    return (
        <main>
            <section
                className="bg-background relative w-full overflow-hidden"
            >
                {/* 1. THE BACKGROUND IMAGE 
              This is the key change. This <Image> is in the layout flow.
              Replace 1920 and 3000 with your image's actual dimensions.
            */}
                <Image
                    src="/home2.png"
                    alt="Cityscape background"
                    width={1534}  // <-- REPLACE with your image's actual width
                    height={1531} // <-- REPLACE with your image's actual height
                    className="w-full h-auto min-h-screen object-cover" // This scales the image and sets the section height
                />

                {/* 2. THE GRADIENT OVERLAY
              This was already absolute, so it's fine.
            */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background: "linear-gradient(to bottom, rgba(30,30,32,0.2) 80%, transparent 120%)"
                    }}
                />

                {/* 3. CENTERED CONTENT
              We now wrap the "Waitlist" and "Marquee" sections in one
              absolutely centered div.
            */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center w-full px-4">
                    {/* Join the Waitlist Section */}
                    <div className=" relative pt-12">
                        <span className="pointer-events-none bg-linear-to-b w-fit px-1 from-white to-gray-300/50 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
                            <span className="font-[--font-lora] italic">Join</span> the Waitlist
                        </span>
                        <p className="text-center text-sm lg:text-3xl leading-tight mb-3 text-[#E4E4E4]">
                            Receive all the latest news and updates,<br />as well as early access to the beta.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center mt-6 gap-4 w-full">
                            <div className="relative w-82 h-full flex gap-4">
                                {/* SVG Filter Definition */}
                                <svg style={{ display: 'none' }}>
                                    <filter id="displacementFilter">
                                        <feTurbulence
                                            type="turbulence"
                                            baseFrequency="0.08"
                                            numOctaves="8"
                                            result="turbulence"
                                        />
                                        <feDisplacementMap
                                            in="SourceGraphic"
                                            in2="turbulence"
                                            scale="200"
                                            xChannelSelector="R"
                                            yChannelSelector="G"
                                        />
                                    </filter>
                                </svg>

                                {/* Liquid Glass Input Background */}
                                <div
                                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                                    style={{
                                        filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                        backdropFilter: 'brightness(1.1) blur(2px)',
                                        border: '1px solid rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                        }}
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-5 py-3 rounded-2xl relative z-20 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-50 w-full text-lg placeholder-gray-100 flex-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={submitted}
                                    style={{ background: "transparent" }}
                                />
                            </div>
                            {/* Liquid Glass Button Wrapper */}
                            <div className="relative w-fit z-20 h-full flex items-center ml-2">
                                <div
                                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                                    style={{
                                        filter: 'drop-shadow(-8px -10px 50px #0000005f)',
                                        backdropFilter: 'brightness(1.1) blur(2px)',
                                        border: '1px solid rgba(255, 255, 255, 0.5)',
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-2xl text-white font-semibold text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 relative z-20"
                                    style={{ background: "rgba(37, 99, 235, 0.7)", backdropFilter: "brightness(1.1) blur(2px)" }}
                                    disabled={submitted || !email}
                                >
                                    {submitted ? "Submitted!" : "Join Waitlist"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="border-b py-4 h-3 p-2 w-[40%] relative" />
                    <p className="lg:text-2xl mb-3 text-gray-300 my-4 font-af font-medium text-lg tracking-[-0.15px] leading-relaxed">Powered By</p>
                    <Marquee className="w-[35%]  backdrop-blur-sm rounded-lg py-3 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)] space-x-4 flex flex-row">
                        {
                            IconsArray.map((item) => (
                                <div key={item.name} className=""><item.icon className="h-12 w-12 " /></div>
                            ))
                        }
                    </Marquee>
                </div>


                {/* About Section - Bottom Left */}
                <div className='absolute bottom-8 left-8 z-10 p-5 lg:p-8 lg:pr-6 text-white rounded-2xl'>
                    <div className="flex flex-col gap-4 w-full h-full relative">
                        {/* SVG Filter Definition */}
                        <svg style={{ display: 'none' }}>
                            <filter id="displacementFilter">
                                <feTurbulence
                                    type="turbulence"
                                    baseFrequency="0.08"
                                    numOctaves="8"
                                    result="turbulence"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="turbulence"
                                    scale="200"
                                    xChannelSelector="R"
                                    yChannelSelector="G"
                                />
                            </filter>
                        </svg>

                        {/* Liquid Glass Background */}
                        <div
                            className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                            style={{
                                filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                                backdropFilter: 'brightness(1.1) blur(2px)',
                                border: '1px solid rgba(255, 255, 255, 0.7)',
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                }}
                            />
                        </div>

                        <div className="relative z-10 p-5 lg:p-8 lg:pr-6 text-white rounded-2xl w-100">
                            <h2 className='text-2xl lg:text-3xl font-bold mb-4'>AI That runs car care autonomously </h2>
                            <p className='text-sm lg:text-base leading-relaxed mb-3'>
                                Book faster, pay once, get receipts forever.
                                Shops get predictable calendars. Everyone gets their time back.
                            </p>

                            <p className="underline text-white inline-flex items-center gap-2">
                                Get to know us <ChevronRight className="w-4 h-4" />
                            </p>
                        </div>
                    </div>
                </div >

                <div className="absolute bottom-8 right-8 z-10 p-5 lg:p-8 lg:pr-6 text-white ">
                    <div className="w-full flex justify-end pr-6"><Wrench className="w-8 h-8 mb-4 rotate-280 self-end flex" /></div>
                    <p className='text-sm lg:text-base leading-relaxed mb-3 tracking-wider font-semibold'>
                        Agentic auto service is on the
                        horizon, <br />and we’re deploying it bay by bay.
                    </p>
                </div>
            </section >
            <TransBar />
        </main>
    )
}
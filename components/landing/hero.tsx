import { Mic, Calendar } from "lucide-react"

export const Hero = () => {
    return (

        <section className="relative h-screen flex items-start overflow-hidden pt-20">
            {/* DARK BASE */}
            <div className="absolute inset-0 bg-[#111111]">
                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[linear-gradient(to_bottom,#000_30%,transparent_80%)]"></div>
            </div>

            {/* GLOW ORBS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-[90%] sm:w-[80%] mx-auto flex items-center justify-between">
                {/* Left Side */}
                <div className="flex flex-col gap-8 items-start w-full md:w-[60%] lg:w-[50%]  ">
                    <div className="flex items-center justify-between border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-md shadow-lg">
                        <div className="size-2 bg-primary rounded-full"></div>
                        <p className="text-xs text-amber-500">AI-Powered Dental Assistant</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-4xl sm:text-5xl font-bold text-white">Your dental</span>
                        <span className="text-4xl sm:text-5xl font-bold text-primary">questions</span>
                        <span className="text-4xl sm:text-5xl font-bold text-white">answered </span>
                        <span className="text-4xl sm:text-5xl font-bold text-white">instantly</span>
                    </div>

                    <div>
                        <p className="text-muted-foreground font-semibold text-sm">Chat with our AI dental assistant for instant advice , book smart appointments and get personalized care recommendations. Available 24/7 , no waiting required,</p>
                    </div>

                    <div className="flex gap-5 max-[350px]:flex-col">
                        <button className="flex gap-1 items-center bg-primary rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 ">
                            <Mic className="size-4  text-black" />
                            <p className="text-xs sm:text-sm text-black">Try voice chat</p>
                        </button>
                        <button className="flex gap-2 items-center border border-[#ffffff]/15 rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 ">
                            <Calendar className="size-4 text-white" />
                            <p className="text-xs sm:text-sm text-white">Book appointment</p>
                        </button>
                    </div>

                </div>

                {/* Right Side */}
                <div></div>
            </div>
        </section>
    )
}

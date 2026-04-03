import { Calendar, Mic } from "lucide-react"
import Image from "next/image"

export const CTA = () => {
  return (
    <div className=" w-[90%] sm:w-[80%] mx-auto flex items-center justify-between pb-10">
                {/* Left Side */}
                <div className="flex flex-col gap-8 items-start w-full md:w-[65%] lg:w-[50%]">
                    <div className="flex items-center justify-between border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                        <div className="size-2 bg-primary rounded-full"></div>
                        <p className="text-xs text-amber-500">Ready when you are</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-4xl sm:text-5xl font-bold text-white">Your dental health</span>
                        <span className="text-4xl sm:text-5xl font-bold text-primary">journey starts here</span>
                    </div>

                    <div>
                        <p className="text-muted-foreground font-semibold text-sm">Join 1200+ patients who trust our AI for instant guidance and personalized care.</p>
                    </div>

                    <div className="flex gap-5 max-[350px]:flex-col">
                        <button className="flex gap-1 items-center bg-primary rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 ">
                            <Mic className="size-4  text-black" />
                            <p className="text-xs sm:text-sm text-black">Start free chat</p>
                        </button>
                        <button className="flex gap-2 items-center border border-[#ffffff]/15 rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 bg-white/5 backdrop-blur-sm shadow-lg">
                            <Calendar className="size-4 text-white" />
                            <p className="text-xs sm:text-sm text-white">Book appointment</p>
                        </button>
                    </div>

                   

                </div>

                {/* Right Side */}
                <div className="w-full md:w-[35%] lg:w-[50%] hidden lg:flex justify-center items-center">
                    <Image src="/cta.png" alt="Hero Image" width={400} height={400} />
                </div>
            </div>
  )
}


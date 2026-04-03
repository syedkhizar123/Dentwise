import { Mic, Calendar, Star } from "lucide-react"
import Image from "next/image"

export const Hero = () => {
    return (

        <section className="relative h-screen flex items-start overflow-hidden pt-10">
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
                <div className="flex flex-col gap-8 items-start w-full md:w-[65%] lg:w-[50%]  ">
                    <div className="flex items-center justify-between border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
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
                        <p className="text-muted-foreground font-semibold text-sm">Chat with our AI dental assistant for instant advice , book smart appointments and get personalized care recommendations. Available 24/7 , no waiting required.</p>
                    </div>

                    <div className="flex gap-5 max-[350px]:flex-col">
                        <button className="flex gap-1 items-center bg-primary rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 ">
                            <Mic className="size-4  text-black" />
                            <p className="text-xs sm:text-sm text-black">Try voice chat</p>
                        </button>
                        <button className="flex gap-2 items-center border border-[#ffffff]/15 rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 bg-white/5 backdrop-blur-sm shadow-lg">
                            <Calendar className="size-4 text-white" />
                            <p className="text-xs sm:text-sm text-white">Book appointment</p>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 mt-5">
                        <div className="flex -space-x-3">
                            <Image
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                                alt="Jessica Davis"
                                width={40}
                                height={40}
                                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                            />
                            <Image
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                                alt="Sam Miller"
                                width={40}
                                height={40}
                                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                            />
                            <Image
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                                alt="Anna Lopez"
                                width={40}
                                height={40}
                                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                            />
                            <Image
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                                alt="Mike Rodriguez"
                                width={40}
                                height={40}
                                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                            />
                            <Image
                                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face"
                                alt="Katie Lee"
                                width={40}
                                height={40}
                                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="flex">
                                    <Star size={20} fill="yellow" />
                                    <Star size={20} fill="yellow" />
                                    <Star size={20} fill="yellow" />
                                    <Star size={20} fill="yellow" />
                                    <Star size={20} fill="yellow" />
                                </div>
                                <p className="text-sm text-white font-semibold">4.9/5</p>
                            </div>
                            <div className="flex gap-2.5">
                                <p className="text-sm text-muted-foreground">Trusted by</p>
                                <p className="text-sm text-white">1200+ patients</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side */}
                <div className="w-full md:w-[35%] lg:w-[50%] hidden lg:flex justify-center items-center">
                    <Image src="/hero.png" alt="Hero Image" width={400} height={400} />
                </div>
            </div>
        </section>
    )
}

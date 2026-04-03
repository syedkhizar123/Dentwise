import Image from "next/image"
import { ArrowRightIcon , ZapIcon } from "lucide-react"

export const HowItWorks = () => {
    return (
        <div id="howitworks" className="flex flex-col gap-5 w-[90%] sm:w-[80%] mx-auto items-center justify-between pb-10 pt-5">

            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                <ZapIcon size={16} className="text-amber-500" />
                <p className="text-xs text-amber-500">Simple Process</p>
            </div>

            <div className="flex flex-col gap-1 mx-auto">
                <p className="text-4xl sm:text-5xl font-bold text-white mx-auto text-center">Three steps to</p>
                <p className="text-4xl sm:text-5xl font-bold text-primary mx-auto text-center">better dental health</p>
            </div>

            <div className="mx-auto flex justify-center items-center w-full max-w-150">
                <p className="text-center text-muted-foreground text-md">Our streamlined process makes dental care accessible, convenient, and stress free for everyone.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 w-full flex-wrap">
                <div className="relative mx-auto">
                    <div className="relative size-6 rounded-full bg-primary top-3 left-5 flex justify-center items-center">
                        <p className="text-black text-sm font-bold">1</p>
                    </div>
                    <div className=" h-80 w-75 sm:w-85 border border-muted-foreground/15 rounded-3xl flex flex-col gap-5 justify-center items-center">
                        <div className="flex justify-center items-center size-18 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                            <Image src="/audio.png" alt="Audio" width={50} height={50} />
                        </div>
                        <p className="text-center text-white text-xl font-bold">Ask Questions</p>
                        <p className="w-[85%] text-muted-foreground text-center text-sm">Chat with our AI assistant about any dental concerns. Get instant answers about any symptoms, treatments, and oral health tips.</p>
                        <div className="flex gap-2">
                            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-3 py-1 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                <p className="text-xs text-amber-500">24/7 Available</p>
                            </div>

                            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-3 py-1 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                <p className="text-xs text-amber-500">Instant Response</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto">
                    <div className="relative size-6 rounded-full bg-primary top-3 left-5 flex justify-center items-center">
                        <p className="text-black text-sm font-bold">2</p>
                    </div>
                    <div className=" h-80 w-75 sm:w-85 border border-muted-foreground/15 rounded-3xl flex flex-col gap-5 justify-center items-center">
                        <div className="flex justify-center items-center size-18 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                            <Image src="/brain.png" alt="Audio" width={50} height={50} />
                        </div>
                        <p className="text-center text-white text-xl font-bold">Get Expert Advice</p>
                        <p className="w-[85%] text-muted-foreground text-center text-sm">Receive personalized recommendations based on thousands of dental cases. Our AI provides professional-grade insights.</p>
                        <div className="flex gap-2">
                            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-3 py-1 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                <p className="text-xs text-amber-500">AI-Powered</p>
                            </div>

                            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-3 py-1 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                <p className="text-xs text-amber-500">Personalized</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto">
                    <div className="relative size-6 rounded-full bg-primary top-3 left-5 flex justify-center items-center">
                        <p className="text-black text-sm font-bold">3</p>
                    </div>
                    <div className=" h-80 w-75 sm:w-85 border border-muted-foreground/15 rounded-3xl flex flex-col gap-5 justify-center items-center">
                        <div className="flex justify-center items-center size-18 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                            <Image src="/calendar.png" alt="Audio" width={50} height={50} />
                        </div>
                        <p className="text-center text-white text-xl font-bold">Book & Get Care</p>
                        <p className="w-[85%] text-muted-foreground text-center text-sm">Schedule with verified dentists and receive comprehensive follow-up care. Track your progress seamlessly.</p>
                        <div className="flex gap-2">
                            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-3 py-1 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                <p className="text-xs text-amber-500">Verified Doctors</p>
                            </div>

                            <div className="flex items-center justify-between mx-auto border border-[#ffffff]/15 rounded-full px-3 py-1 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                <p className="text-xs text-amber-500">Follow-up Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10">
                 <button className="flex gap-1 items-center bg-primary rounded-sm sm:rounded-lg px-2 sm:px-4 py-3 ">
                            <ArrowRightIcon className="size-4  text-black" />
                            <p className="text-xs sm:text-sm text-black font-semibold">Get Started Now</p>
                        </button>
            </div>
        </div>
    )
}


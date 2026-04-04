import { Calendar, MessageSquare } from "lucide-react"
import Image from "next/image"


export const Actions = () => {
    return (
        <div className="w-[95%] sm:w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center py-5 sm:py-10">

            <div className="w-full md:w-[48%] flex flex-col gap-5 px-5 py-10 border border-muted/15 rounded-3xl">
                <div className="flex gap-3 ">
                    <div className="flex justify-center items-center size-18 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                        <Image src="/audio.png" alt="Audio" width={50} height={50} />
                    </div>

                    <div className="flex flex-col justify-around  ">
                        <p className="text-white text-2xl font-bold ">AI Voice Assisstant</p>
                        <p className="text-muted-foreground ">Get instant denatl advice through voice calls</p>
                    </div>
                </div>

                <div className="flex gap-3 items-center mt-3">
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                    <p className="text-muted/80 text-sm">24/7 availability</p>
                </div>
                <div  className="flex gap-3 items-center">
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                    <p className="text-muted/80 text-sm">Professional dental guidance</p>
                </div>
                <div className="flex gap-3 items-center mb-3">
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                    <p className="text-muted/80 text-sm">Instant pain relief advice</p>
                </div>

                <button className="flex justify-center gap-3 rounded-full w-full py-3 bg-primary">
                    <MessageSquare size={20} className="text-white" />
                    <p className="text-white">Start Voice Call</p>
                </button>
            </div>

             <div className="w-full md:w-[48%] flex flex-col gap-5 px-5 py-10 border border-muted/15 rounded-3xl">
                <div className="flex gap-3 ">
                    <div className="flex justify-center items-center size-18 rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                        <Image src="/calendar.png" alt="Audio" width={50} height={50} />
                    </div>

                    <div className="flex flex-col justify-around  ">
                        <p className="text-white text-2xl font-bold ">Book Appointment</p>
                        <p className="text-muted-foreground ">Schedule with verified dentists in your area</p>
                    </div>
                </div>

                <div className="flex gap-3 items-center mt-3">
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                    <p className="text-muted/80 text-sm">Verified dental professionals</p>
                </div>
                <div  className="flex gap-3 items-center">
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                    <p className="text-muted/80 text-sm">Flexible scheduling</p>
                </div>
                <div className="flex gap-3 items-center mb-3">
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                    <p className="text-muted/80 text-sm">Instant confirmations</p>
                </div>

                <button className="flex justify-center gap-3 rounded-full w-full py-3 bg-muted/5 border border-muted/15">
                    <Calendar size={20} className="text-white" />
                    <p className="text-white">Schedule Now</p>
                </button>
            </div>
        </div>
    )
}


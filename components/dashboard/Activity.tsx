import { Brain, MessageSquare } from "lucide-react"


export const Activity = () => {
    return (
        <div className="w-[95%] sm:w-[80%] mx-auto py-10 flex flex-col md:flex-row justify-betweenitems-center ">

            <div className="p-6 flex flex-col gap-8 rounded-2xl border border-muted/10 ">

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Brain size={20} className="text-primary" />
                        <p className="text-muted text-sm font-semibold">Your Dental Health</p>
                    </div>
                    <p className="text-muted-foreground text-xs">Keep track of your dental care journey</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="rounded-lg w-70 py-4 px-12 flex flex-col justify-center items-center bg-muted/5 mx-auto min-[780px]:mx-0 ">
                        <p className="text-2xl font-bold text-primary">3</p>
                        <p className="text-muted-foreground text-sm">Completed Visits</p>
                    </div>

                     <div className="rounded-lg w-70 py-4 px-12 flex flex-col justify-center items-center bg-muted/5 mx-auto min-[780px]:mx-0 ">
                        <p className="text-2xl font-bold text-primary">6</p>
                        <p className="text-muted-foreground text-sm">Total Appointments</p>
                    </div>

                     <div className="rounded-lg w-70 py-4 px-12 flex flex-col justify-center items-center bg-muted/5 mx-auto min-[780px]:mx-0 ">
                        <p className="text-2xl font-bold text-primary">Aug 2025</p>
                        <p className="text-muted-foreground text-sm">Member Since</p>
                    </div>
                </div>

                <div className="flex gap-3 p-5 rounded-xl border border-[#ffffff]/15 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                    <div className="hidden min-[425px]:flex items-center justify-center p-3 rounded-lg bg-linear-to-br from-primary/20 to-primary/10 max-h-12">
                        <MessageSquare size={20} className="text-amber-500" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-primary font-semibold">Ready to get started ? </p>
                        <p className="text-sm text-muted/30">Book your first appointment or try our AI voice assistant for instant dental advice.</p>
                        <div className="flex flex-col min-[425px]:flex-row gap-3 mt-4">
                            <button className="px-5 py-2 rounded-md bg-primary text-sm text-black">
                                Try AI Assistant
                            </button>

                            <button className="px-5 py-2 rounded-md bg-muted-foreground/15 text-sm text-muted">
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                
            </div>
        </div>
    )
}


import { getUserAppointments } from "@/hooks/useAppointments"
import { Brain, Calendar, Clock, MessageSquare, User } from "lucide-react"

interface ActivityProps {
    total?: string
    completed?: string
    month?: string
    year?: string
}

export const Activity = ({ total, completed, month, year }: ActivityProps) => {

    const { data, isLoading } = getUserAppointments()
    const upcoming = data?.upcoming
    console.log(upcoming)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="stext-muted-foreground">Loading...</p>
            </div>
        )
    }
    return (
        <div className="w-[95%] sm:w-[80%] mx-auto py-10 flex flex-col min-[860px]:flex-row justify-between items-start gap-5">

            <div className="p-6 flex flex-col gap-8 rounded-2xl border border-muted/10 ">

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Brain size={20} className="text-primary" />
                        <p className="text-muted text-sm font-semibold">Your Dental Health</p>
                    </div>
                    <p className="text-muted-foreground text-xs">Keep track of your dental care journey</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="rounded-lg px-12 py-4 flex flex-col justify-center items-center bg-muted/5 mx-auto min-[780px]:mx-0 ">
                        <p className="text-2xl font-bold text-primary">{completed}</p>
                        <p className="text-muted-foreground text-sm">Completed Visits</p>
                    </div>

                    <div className="rounded-lg px-12 py-4 flex flex-col justify-center items-center bg-muted/5 mx-auto min-[780px]:mx-0 ">
                        <p className="text-2xl font-bold text-primary">{total}</p>
                        <p className="text-muted-foreground text-sm">Total Appointments</p>
                    </div>

                    <div className="rounded-lg px-12 py-4 flex flex-col justify-center items-center bg-muted/5 mx-auto min-[780px]:mx-0 ">
                        <p className="text-2xl font-bold text-primary">{month} {year}</p>
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

            <div className="p-6 rounded-2xl border border-muted/10 flex flex-col gap-3 max-[860px]:w-full w-90 max-w-90 ">
                <div className="flex gap-4 items-center">
                    <Calendar size={20} className="text-primary" />
                    <p className="text-muted text-sm font-semibold">Next Appointment</p>
                </div>
                {
                    upcoming?.length === 0 ? (
                        <p className="text-muted-foreground text-sm">You have no upcoming appointments. Book now to take care of your dental health!</p>
                    ) : (
                        <>
                            <div className="flex gap-3 items-center mt-5 mb-3">
                                <div className="flex items-center justify-between border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                                    <div className="size-2 rounded-full bg-amber-500"></div>
                                    <p className="text-xs text-amber-500">Upcoming</p>
                                </div>

                                <div className="flex justify-center items-center px-4 py-2 bg-muted-foreground/10 rounded-md">
                                    <p className="text-sm text-muted">Confirmed</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">

                                <div className="flex gap-3">
                                    <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                                        <User size={20} className="text-amber-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-muted">Dr. {upcoming[0].doctor.name}</p>
                                        <p className="text-xs text-muted-foreground">{upcoming[0].reason}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 ">
                                    <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                                        <Calendar size={20} className="text-amber-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-muted">{new Date(upcoming[0].date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{new Intl.DateTimeFormat("en-US", {
                                            weekday: "long",
                                        }).format(new Date(upcoming[0].date))}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                                        <Clock size={20} className="text-amber-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-muted">{upcoming[0].time}</p>
                                        <p className="text-xs text-muted-foreground">Local Time</p>
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                }
                {/* <div className="flex gap-3 items-center mt-5 mb-3">
                    <div className="flex items-center justify-between border border-[#ffffff]/15 rounded-full px-4 py-2 gap-2 bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5 ">
                        <div className="size-2 rounded-full bg-amber-500"></div>
                        <p className="text-xs text-amber-500">Upcoming</p>
                    </div>

                    <div className="flex justify-center items-center px-4 py-2 bg-muted-foreground/10 rounded-md">
                        <p className="text-sm text-muted">Confirmed</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">

                    <div className="flex gap-3">
                        <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                            <User size={20} className="text-amber-500" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-muted">Dr. {upcoming[0].doctor.name}</p>
                            <p className="text-xs text-muted-foreground">{upcoming[0].reason}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 ">
                        <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                            <Calendar size={20} className="text-amber-500" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-muted">{new Date(upcoming[0].date).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}
                            </p>
                            <p className="text-xs text-muted-foreground">Saturday</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex justify-center items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg bg-linear-to-r from-primary/10 to-primary/5">
                            <Clock size={20} className="text-amber-500" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-muted">{upcoming[0].time}</p>
                            <p className="text-xs text-muted-foreground">Local Time</p>
                        </div>
                    </div>

                </div> */}
            </div>
        </div>
    )
}


import { Calendar, Clock, UserCheck, Users } from "lucide-react"

export const Stats = () => {
    return (
        <>
            <div className="w-[95%] sm:w-[80%] flex flex-wrap justify-between gap-2.5 mx-auto my-5">

                <div className="flex items-center justify-center border border-muted/15 rounded-lg w-full sm:w-[49%] lg:w-[23%] py-10">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center py-2 px-4 rounded-lg bg-primary/10 ">
                            <Users className="text-muted" size={18} />
                        </div>

                        <div className="flex flex-col ">
                            <p className="text-muted text-lg font-bold">2</p>
                            <p className="text-muted-foreground text-sm">Total Doctors</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center border border-muted/15 rounded-lg w-full sm:w-[49%] lg:w-[23%] py-10">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center py-2 px-4 rounded-lg bg-primary/10 ">
                            <UserCheck className="text-muted" size={18} />
                        </div>

                        <div className="flex flex-col ">
                            <p className="text-muted text-lg font-bold">2</p>
                            <p className="text-muted-foreground text-sm">Active Doctors</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center border border-muted/15 rounded-lg w-full sm:w-[49%] lg:w-[23%] py-10">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center py-2 px-4 rounded-lg bg-primary/10 ">
                            <Calendar className="text-muted" size={18} />
                        </div>

                        <div className="flex flex-col ">
                            <p className="text-muted text-lg font-bold">2</p>
                            <p className="text-muted-foreground text-sm">Total Appointments</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center border border-muted/15 rounded-lg w-full sm:w-[49%] lg:w-[23%] py-10">
                    <div className="flex gap-4">
                        <div className="flex items-center justify-center py-2 px-4 rounded-lg bg-primary/10 ">
                            <Clock className="text-muted" size={18} />
                        </div>

                        <div className="flex flex-col ">
                            <p className="text-muted text-lg font-bold">2</p>
                            <p className="text-muted-foreground text-sm">Completed Appointments</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


"use client"
import { useUser } from "@clerk/nextjs"
import { Calendar, CircleCheckBig, Clock, Mail, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PaymentCompleted = () => {

    const { user } = useUser()
    const router = useRouter()
    return (
        <div className="flex items-center justify-center h-screen px-5">
            <div className="flex flex-col gap-1 items-center justify-center rounded-lg bg-muted-foreground/5 border border-muted/10 px-5 py-10 max-w-110 w-full h-max max-h-[95%]">

                <div className="flex items-center p-3 rounded-full bg-primary/10 w-min">
                    <CircleCheckBig className="text-primary" size={25} />
                </div>

                <p className="text-muted text-lg font-semibold mt-3">Appointment Confirmed!</p>

                <p className="text-muted-foreground text-xs mt-1 text-center">Your appointment has been booked successfully</p>

                <Image src={'/email-sent.png'} alt="Email Sent Icon" height={120} width={120} />

                <div className="flex gap-2 items-center mt-2">
                    <Mail className="text-primary" size={20} />
                    <p className="text-primary text-xs">Details sent to your inbox</p>
                </div>

                <p className="text-muted-foreground text-xs">
                    {user?.emailAddresses[0].emailAddress}
                </p>

                <div className="w-full max-w-80 rounded-xl bg-muted-foreground/10 p-4 flex flex-col gap-2 mt-5">
                    <p className="text-xs text-muted mx-auto mb-3">Quick Summary</p>
                    <div className="flex gap-2 items-center">
                        <User className="text-muted-foreground" size={16} />
                        <p className="text-xs text-muted">Dr. Jane Smith </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Calendar className="text-muted-foreground" size={16} />
                        <p className="text-xs text-muted">Friday, April 17, 2026 </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Clock className="text-muted-foreground" size={16} />
                        <p className="text-xs text-muted">09:30</p>
                    </div>

                </div>
                
                <button onClick={() => { router.push("/appointments") }} className="w-full max-w-80 bg-primary/70 rounded-lg flex justify-center items-center py-3 mt-4">
                    <p className="text-black text-sm">View My Appointments</p>
                </button>
                <button onClick={() => { router.push("/dashboard") }} className="w-full max-w-80 bg-muted-foreground/10 rounded-lg flex justify-center items-center py-3 mt-1">
                    <p className="text-muted text-sm">Continue</p>
                </button>
            </div>
        </div>
    )
}

export default PaymentCompleted
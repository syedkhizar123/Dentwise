"use client"

import { DoctorInfo } from "@/components/appointments/DoctorInfo"
import { ProgressSteps } from "@/components/appointments/ProgressSteps"
import { Header } from "@/components/dashboard/Header"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const Appointments = () => {
    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(1)

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])


    return (
        <>
            <Header name={user?.fullName || ""} email={user?.emailAddresses[0].emailAddress} />
            <div className="w-[95%] sm:w-[80%] mx-auto my-5">
                <p className="text-muted text-2xl sm:text-3xl font-bold text-center sm:text-start">Book an Appointment</p>
                <p className="text-muted-foreground mt-3 text-sm sm:text-base text-center sm:text-start">Find and book with verified dentists in your area</p>
            </div>
            <ProgressSteps activeStep={activeStep} />

            {activeStep === 1 && (
                <div>
                    <DoctorInfo />
                    <div className="w-[95%] sm:w-[80%] mx-auto my-5">
                        <button onClick={() => { setActiveStep(2) }} className="bg-primary text-muted py-1 px-5 rounded-sm">
                            Next
                        </button>
                    </div>
                </div>
            )}

            {activeStep === 2 && (
                <div>
                    <p className="text-muted">This is Step 2</p>
                    <button onClick={() => { setActiveStep(3) }} className="bg-primary text-muted py-2 px-5 rounded-lg">
                        Next
                    </button>
                    <button onClick={() => { setActiveStep(1) }} className="bg-primary text-muted py-2 px-5 rounded-lg">
                        Back
                    </button>
                </div>
            )}

            {activeStep === 3 && (
                <div>
                    <p className="text-muted">This is Step 3</p>
                    <button onClick={() => { setActiveStep(2) }} className="bg-primary text-muted py-2 px-5 rounded-lg">
                        Back
                    </button>
                </div>
            )}

        </>
    )
}

export default Appointments

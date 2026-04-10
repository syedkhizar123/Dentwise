"use client"

import { DoctorInfo } from "@/components/appointments/DoctorInfo"
import { ProgressSteps } from "@/components/appointments/ProgressSteps"
import { Header } from "@/components/dashboard/Header"
import { useUser } from "@clerk/nextjs"
import { ChevronLeftIcon, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface selectedDoctor {
    id: string,
    name: string
}

const Appointments = () => {

    const appointmentTypes = [
        {
            type: "Regular Checkup",
            time: 60,
            price: 120
        },
        {
            type: "Teeth Cleaning",
            time: 45,
            price: 90
        },
        {
            type: "Consultation",
            time: 30,
            price: 75
        },
        {
            type: "Emergency Visit",
            time: 30,
            price: 150
        }

    ]
    const dates = [
        {
            day: "Sun",
            date: "Apr 11"
        },
        {
            day: "Mon",
            date: "Apr 12"
        },
        {
            day: "Tue",
            date: "Apr 13"
        },
        {
            day: "Wed",
            date: "Apr 14"
        },
        {
            day: "Thu",
            date: "Apr 15"
        },
        {
            day: "Fri",
            date: "Apr 16"
        },
        {
            day: "Sat",
            date: "Apr 17"
        }
    ]
    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(1)
    const [selectedDoctor, setSelectedDoctor] = useState<selectedDoctor | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedDate , setSelectedDate] = useState<string | null>(null) 

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])

    useEffect(() => {
        console.log("Selected Date:- " , selectedDate)
    } , [selectedDate])

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
                    <DoctorInfo onSelectDoctor={setSelectedDoctor} />
                    <div className="w-[95%] sm:w-[80%] mx-auto my-5 flex justify-end">
                        {
                            (activeStep === 1 && selectedDoctor) && (
                                <button onClick={() => { setActiveStep(2) }} className="bg-primary text-muted py-1 px-5 rounded-sm ">
                                    Next
                                </button>
                            )
                        }
                    </div>
                </div>
            )}

            {(activeStep === 2 && selectedDoctor) && (
                <div className="w-[95%] sm:w-[80%] mx-auto my-5 flex flex-col">
                    <div className="flex gap-3 my-2">
                        <button onClick={() => { setActiveStep(1) }} className=" text-muted px-4 py-2 flex gap-2 items-center">
                            <ChevronLeftIcon size={15} className="text-muted-foreground" />
                            <p className="text-muted-foreground text-sm">Back</p>
                        </button>

                        <div className="flex flex-col gap-1">
                            <p className="text-muted text-xl font-bold">Select Date & Time</p>
                            <p className="text-muted-foreground text-lg">Booking with Dr {selectedDoctor?.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 justify-between my-5">
                        <div className="flex flex-col gap-3 w-full lg:w-[50%]">
                            <p className="text-muted text-lg">Appointment Type</p>

                            {
                                appointmentTypes.map((item) => (
                                    <div onClick={() => {selectedType === item.type ? setSelectedType(null) : setSelectedType(item.type)}} key={item.type} className={`w-full border rounded-xl py-10 px-5 ${selectedType === item.type ? "border-2 border-primary" : "border-muted/15"}`}>
                                        <div className='flex justify-between w-full items-center'>
                                            <div className="flex flex-col">
                                                <p className="text-muted ">{item.type}</p>
                                                <p className="text-muted-foreground text-sm">{item.time} min</p>
                                            </div>

                                            <p className="text-primary font-semibold">${item.price}</p>
                                        </div>

                                    </div>
                                ))
                            }



                        </div>

                        <div className="flex flex-col gap-3 w-full lg:w-[50%]">

                            <p className="text-muted text-lg">Available Dates</p>

                            <div className="flex flex-wrap gap-3">
                                {
                                    dates.map((item) => (
                                        <div onClick={() => {
                                            const newDate = selectedDate === `${item.day}, ${item.date}` ? null :`${item.day}, ${item.date}`
                                            setSelectedDate(newDate)
                                        }} key={item.date} className={`w-full sm:w-[48%] border rounded-md py-3 ${selectedDate === `${item.day}, ${item.date}` ? "bg-primary border-primary" : "border-muted/15 bg-muted-foreground/10"}` }>
                                            <p className={`text-center ${selectedDate === `${item.day}, ${item.date}` ? "text-black" : "text-muted"}`}>
                                                {item.day}, {item.date}
                                            </p>
                                        </div>
                                    ))
                                }


                            </div>

                        </div>
                    </div>
                    <div className="self-end flex gap-3">
                        <button onClick={() => { setActiveStep(3) }} className="bg-primary text-muted py-2 px-5 rounded-lg">
                            Next
                        </button>
                        <button onClick={() => { setActiveStep(1) }} className="bg-primary text-muted py-2 px-5 rounded-lg">
                            Back
                        </button>
                    </div>
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

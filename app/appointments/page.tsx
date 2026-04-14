"use client"

import { DoctorInfo } from "@/components/appointments/DoctorInfo"
import { ProgressSteps } from "@/components/appointments/ProgressSteps"
import { Header } from "@/components/dashboard/Header"
import { useUser } from "@clerk/nextjs"
import { ChevronLeftIcon, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface selectedDoctor {
    id: string,
    name: string,
    img: string,
    speciality: string
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
    const times = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"]

    const handleSecondStep = () => {
        if (selectedType) {
            if (selectedDate) {
                if (selectedTime) {
                    setActiveStep(3)
                } else {
                    toast.error("Select time")
                }
            } else {
                toast.error("Select Date")
            }
        } else {
            toast.error("Select type");

        }
    }

    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(1)
    const [selectedDoctor, setSelectedDoctor] = useState<selectedDoctor | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [duration, setDuration] = useState<number | null>(null)
    const [price, setPrice] = useState<number | null>(null)

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])

    useEffect(() => {
        console.log("Selected Time:- ", selectedTime)
    }, [selectedTime])

    useEffect(() => {
        console.log("Selected Type:- ", selectedType)
        if (selectedType) {
            const appointment = appointmentTypes.find((app) => app.type === selectedType)
            setDuration(appointment!.time)
            setPrice(appointment!.price)
        }
    }, [selectedType])

    return (
        <>
            <Header name={user?.fullName || ""} email={user?.emailAddresses[0].emailAddress} />
            <div className="w-[95%] sm:w-[80%] mx-auto my-5">
                <p className="text-muted text-2xl sm:text-3xl font-bold text-start">Book an Appointment</p>
                <p className="text-muted-foreground mt-3 text-sm sm:text-base text-start">Find and book with verified dentists in your area</p>
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
                    <div className="flex max-[410px]:flex-col gap-5 my-4 min-[410px]:items-center">
                        <button onClick={() => { setActiveStep(1) }} className="border border-muted/15 rounded-lg text-muted px-4 py-2 flex gap-1 items-center w-max h-max">
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
                                    <div onClick={() => { selectedType === item.type ? setSelectedType(null) : setSelectedType(item.type) }} key={item.type} className={`w-full border rounded-xl py-10 px-5 cursor-pointer ${selectedType === item.type ? "border-2 border-primary" : "border-muted/15"}`}>
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
                                            const newDate = selectedDate === `${item.day}, ${item.date}` ? null : `${item.day}, ${item.date}`
                                            setSelectedDate(newDate)
                                        }} key={item.date} className={`w-full sm:w-[48%] border rounded-md py-3 cursor-pointer ${selectedDate === `${item.day}, ${item.date}` ? "bg-primary border-primary" : "border-muted/15 bg-muted-foreground/10"}`}>
                                            <p className={`text-center ${selectedDate === `${item.day}, ${item.date}` ? "text-black" : "text-muted"}`}>
                                                {item.day}, {item.date}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>

                            <p className="text-muted text-lg mt-4">Available Times</p>

                            <div className="flex flex-wrap gap-3">
                                {
                                    times.map((item) => (
                                        <div onClick={() => {
                                            const newTime = selectedTime === `${item}` ? null : `${item}`
                                            setSelectedTime(newTime)
                                        }} key={item} className={`w-full sm:w-[48%] md:w-[31%] border rounded-md py-1.5 cursor-pointer ${selectedTime === `${item}` ? "bg-primary border-primary" : "border-muted/15 bg-muted-foreground/10"}`}>
                                            <p className={`text-center flex items-center justify-center gap-2 ${selectedTime === `${item}` ? "text-black" : "text-muted"}`}>
                                                <Clock size={16} className={`${selectedTime === item ? "text-black" : "text-muted"}`} />
                                                {item}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                    <div className="self-end flex gap-3">
                        <button onClick={() => { handleSecondStep() }}
                            className="bg-primary text-black py-2 px-5 rounded-sm text-sm">
                            Review Booking
                        </button>
                        <button onClick={() => { setActiveStep(1) }} className="bg-muted-foreground/15 text-muted py-2 px-5 rounded-sm text-sm">
                            Back
                        </button>
                    </div>
                </div>
            )}

            {(activeStep === 3 && selectedType && selectedDate && selectedTime) && (
                <div className="w-[95%] sm:w-[80%] mx-auto my-5 flex flex-col ">
                    <div className="flex max-[410px]:flex-col max-[410px]:items-start gap-3 my-4 items-center">
                        <button onClick={() => { setActiveStep(2) }} className="border border-muted/15 rounded-lg text-muted px-4 py-2 flex gap-1 items-center">
                            <ChevronLeftIcon size={15} className="text-muted-foreground" />
                            <p className="text-muted-foreground text-sm">Back</p>
                        </button>

                        <p className="text-muted text-xl font-bold">Confrim Your Appointment</p>
                    </div>

                    <div className="border border-muted/15 rounded-xl flex flex-col gap-3 py-10 px-5 w-full sm:w-120 ">
                        <p className="text-muted">Appointment Summary</p>

                        <div className="flex items-center gap-3 border-b border-muted/15 pb-4">
                            <img
                                src={selectedDoctor?.img}
                                className="w-16 h-16 rounded-full object-cover"
                                alt="Doctor Image"
                            />
                            <div className="flex flex-col gap-1 ">
                                <p className="text-muted text-sm">Dr. {selectedDoctor?.name}</p>
                                <p className="text-muted-foreground text-sm">{selectedDoctor?.speciality}</p>
                            </div>
                        </div>

                        <div className="flex gap-15 mt-3">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">Appointment Type</p>
                                    <p className="text-muted">{selectedType}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="text-muted">{selectedDate}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="text-muted">Dental Centre</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="text-muted">{duration} min</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">Time</p>
                                    <p className="text-muted">{selectedTime}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-muted-foreground">Cost</p>
                                    <p className="text-primary font-semibold">${price}</p>
                                </div>

                            </div>
                        </div>

                        {/* <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-muted-foreground">Appointmnet Type</p>
                                <p className="text-muted">{selectedType}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                 <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="text-muted">30 min</p>
                            </div>
                        </div>

                         <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="text-muted">{selectedDate}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                 <p className="text-sm text-muted-foreground">Time</p>
                                <p className="text-muted">{selectedTime}</p>
                            </div>
                        </div>

                         <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="text-muted">Dental Centre</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                 <p className="text-sm text-muted-foreground">Cost</p>
                                <p className="text-primary font-semibold">$75</p>
                            </div>
                        </div> */}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 my-5">
                        <button onClick={() => { setActiveStep(2)}} className="bg-muted-foreground/10 rounded-sm px-5 py-3 ">
                            <p className="text-muted text-sm">Modify Appointment</p>
                        </button>

                         <button className="bg-primary rounded-sm px-5 py-3 ">
                            <p className="text-black text-sm">Confirm Booking</p>
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}

export default Appointments

"use client"

import { DoctorInfo } from "@/components/appointments/DoctorInfo"
import { ProgressSteps } from "@/components/appointments/ProgressSteps"
import { Header } from "@/components/dashboard/Header"
import { getUserAppointments, getBookedSlots } from "@/hooks/useAppointments"
import { usePayment } from "@/hooks/usePayment"
import { useUser } from "@clerk/nextjs"
import { Calendar, ChevronLeftIcon, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface selectedDoctor {
    id: string,
    name: string,
    img: string,
    speciality: string
}

type DateItem = {
    date: Date
    iso: string
    label: string
}

const Appointments = () => {

    const appointmentTypes = [
        {
            type: "Regular Checkup",
            time: "60",
            price: 120
        },
        {
            type: "Teeth Cleaning",
            time: "45",
            price: 90
        },
        {
            type: "Consultation",
            time: "30",
            price: 75
        },
        {
            type: "Emergency Visit",
            time: "30",
            price: 150
        }

    ]
    const days: DateItem[] = []

    const today = new Date()

    for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(today)
        nextDate.setDate(today.getDate() + i)

        days.push({
            date: nextDate,
            iso: nextDate.toISOString(),
            label: nextDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
            }),
        })
    }

    const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"]

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
    const { mutate: startPayment, isPending } = usePayment()
    const { data , isPending: appointmentsError, isLoading } = getUserAppointments()
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(1)
    const [selectedDoctor, setSelectedDoctor] = useState<selectedDoctor | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedDateIso, setSelectedDateIso] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [duration, setDuration] = useState<string | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const { data: bookedSlots, isLoading: fetchBooked } = getBookedSlots(selectedDoctor?.id, selectedDateIso!)
    const userUpcomingAppointments = data?.upcoming 
    const userCompletedAppointments = data?.completed

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])


    useEffect(() => {
        if (selectedType) {
            const appointment = appointmentTypes.find((app) => app.type === selectedType)
            setDuration(appointment!.time)
            setPrice(appointment!.price)
        }
    }, [selectedType])

    const isSlotBooked = (time: string) => {
        return bookedSlots?.bookedSlots?.some((slot: any) => slot.time == time)
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        )
    }
    return (
        <>
            <Header name={user?.fullName || ""} email={user?.emailAddresses[0].emailAddress} />
            <div className="w-[95%] sm:w-[80%] mx-auto my-5">
                <p className="text-muted text-2xl sm:text-3xl font-bold text-start">Book an Appointment</p>
                <p className="text-muted-foreground mt-3 text-sm sm:text-base text-start">Find and book with verified dentists in your area</p>
            </div>
            <ProgressSteps activeStep={activeStep} />


            {activeStep === 1 && (
                <>
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

                    <div className={`w-[95%] sm:w-[80%] mx-auto my-5 flex flex-col gap-3  ${selectedDoctor === null ? "visible" : "hidden"}`}>
                        <p className="text-lg text-muted font-semibold">Upcoming Appointments</p>

                        <div className="flex flex-wrap gap-2">
                            {
                                userUpcomingAppointments?.length === 0 ? (
                                    <div className="flex items-center">
                                        <p className="text-muted-foreground">No upcoming appointments</p>
                                    </div>
                                ) : (
                                    userUpcomingAppointments.slice(0,3).map((item: any) => (
                                        <div key={item.id} className="w-full sm:w-[49%] lg:w-[32%] flex flex-col px-5 py-5 border border-muted/10 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.doctor.imageUrl}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                    alt="Doctor Image"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-sm text-muted">Dr. {item.doctor.name}</p>
                                                    <p className="text-muted-foreground text-xs">{item.reason}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 items-center mt-3">
                                                <Calendar className="text-muted" size={14} />
                                                <p className="text-muted-foreground text-sm">{new Date(item.date).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 items-center mt-1">
                                                <Clock className="text-muted" size={14} />
                                                <p className="text-muted-foreground text-sm">{item.time}</p>
                                            </div>
                                        </div>
                                    ))
                                )
                            }


                        </div>

                        <p className={`text-muted-foreground text-sm ${userUpcomingAppointments.length > 3 ? "" : "hidden"}`}>+{userUpcomingAppointments.length - 3} more appointments</p>


                    </div>

                     <div className={`w-[95%] sm:w-[80%] mx-auto my-5 flex flex-col gap-3  ${selectedDoctor === null ? "visible" : "hidden"}`}>
                        <p className="text-lg text-muted font-semibold">Completed Appointments</p>

                        <div className="flex flex-wrap gap-2">
                            {
                                userCompletedAppointments?.length === 0 ? (
                                    <div className="flex items-center">
                                        <p className="text-muted-foreground">No completed appointments</p>
                                    </div>
                                ) : (
                                    userCompletedAppointments.map((item: any) => (
                                        <div key={item.id} className="w-full sm:w-[49%] lg:w-[32%] flex flex-col px-5 py-5 border border-muted/10 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.doctor.imageUrl}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                    alt="Doctor Image"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-sm text-muted">Dr. {item.doctor.name}</p>
                                                    <p className="text-muted-foreground text-xs">{item.reason}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 items-center mt-3">
                                                <Calendar className="text-muted" size={14} />
                                                <p className="text-muted-foreground text-sm">{new Date(item.date).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 items-center mt-1">
                                                <Clock className="text-muted" size={14} />
                                                <p className="text-muted-foreground text-sm">{item.time}</p>
                                            </div>
                                        </div>
                                    ))
                                )
                            }


                        </div>


                    </div>
                </>
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
                                    days.map((item) => {
                                        const isSelected = selectedDate === item.label
                                        return (
                                            <div onClick={() => {
                                                // const newDate = selectedDate === `${item.iso}` ? null : item.iso
                                                if (isSelected) {
                                                    setSelectedDate(null)
                                                    setSelectedDateIso(null)
                                                    setSelectedTime(null)
                                                } else {
                                                    setSelectedDate(item.label)
                                                    setSelectedDateIso(item.iso)
                                                }
                                                // setSelectedDate(isSelected ? null : item.label)
                                                // setSelectedDateIso(isSelected ? null : item.iso)
                                            }} key={item.iso} className={`w-full sm:w-[48%] border rounded-md py-3 cursor-pointer ${isSelected ? "bg-primary border-primary" : "border-muted/15 bg-muted-foreground/10"}`}>
                                                <p className={`text-center ${isSelected ? "text-black" : "text-muted"}`}>
                                                    {item.label}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <p className="text-muted text-lg mt-4">Available Times</p>

                            <div className="flex flex-wrap gap-3">
                                {
                                    times.map((item) => {
                                        const isBooked = isSlotBooked(item)
                                        if (
                                            selectedTime &&
                                            bookedSlots?.bookedSlots?.some(
                                                (slot: any) => slot.time?.slice(0, 5) === selectedTime
                                            )
                                        ) {
                                            setSelectedTime(null)
                                        }
                                        return (
                                            <div onClick={() => {
                                                if (isBooked) {
                                                    toast.error("Slot already booked");
                                                    return
                                                }
                                                if (selectedDate) {
                                                    const newTime = selectedTime === `${item}` ? null : `${item}`
                                                    setSelectedTime(newTime)
                                                } else {
                                                    toast.error("Select date please")
                                                }
                                            }} key={item} className={`w-full sm:w-[48%] md:w-[31%] border rounded-md py-1.5 cursor-pointer  ${selectedTime === `${item}` ? "bg-primary border-primary" : "border-muted/15 bg-muted-foreground/10"} ${isBooked ? "bg-muted-foreground/15 border-muted-foreground/30 cursor-not-allowed" : ""}`}>
                                                <p className={`text-center flex items-center justify-center gap-2 ${isBooked ? "text-muted-foreground/30" : ""} ${selectedTime === `${item}` ? "text-black" : "text-muted"}`}>
                                                    <Clock size={16} className={`${selectedTime === item ? "text-black" : "text-muted"} ${isBooked ? "text-muted-foreground/30" : ""}`} />
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    })
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

                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 my-5">
                        <button onClick={() => { setActiveStep(2) }} className="bg-muted-foreground/10 rounded-sm px-5 py-3 ">
                            <p className="text-muted text-sm">Modify Appointment</p>
                        </button>

                        <button disabled={isPending || !duration} onClick={() => {
                            startPayment({
                                doctorId: selectedDoctor?.id || null,
                                date: selectedDateIso!,
                                time: selectedTime,
                                duration,
                                reason: selectedType,
                                amount: price,
                                userEmail: user?.emailAddresses[0].emailAddress!
                            })
                        }} className={`rounded-sm px-5 py-3 ${isPending ? "bg-muted-foreground cursor-not-allowed" : "bg-primary"}`}>
                            <p className={`text-sm ${isPending ? "text-muted" : "text-black"}`}>{isPending ? "Processing..." : "Confirm Booking"}</p>
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}

export default Appointments

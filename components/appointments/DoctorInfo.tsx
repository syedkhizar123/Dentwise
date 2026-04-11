"use client"
import React, { useEffect, useState } from "react"
import { getDoctors } from "@/hooks/useDoctors"
import { MapPinIcon, Phone } from "lucide-react"

interface selectedDoctor {
    id: string,
    name: string,
    img: string,
    speciality: string
}

export const DoctorInfo = ({ onSelectDoctor }: { onSelectDoctor?: (doctor: selectedDoctor | null) => void }) => {

    const { data, isLoading, isError } = getDoctors()
    const [selectedDoctor, setSelectedDoctor] = useState(null)

    useEffect(() => {
        console.log(selectedDoctor)
    }, [selectedDoctor])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-muted-foreground text-sm">Loading...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-muted-foreground text-sm">Something went wrong.</p>
            </div>
        )
    }

    return (
        <>
            <p className="w-[95%] sm:w-[80%] mx-auto text-center sm:text-start text-2xl font-bold text-muted/80 my-5">Choose Your Dentist</p>
            <div className="w-[95%] sm:w-[80%] flex flex-wrap mx-auto gap-2">
                {
                    data.doctors.map((doctor: any, index: any) => {
                        return (
                            <React.Fragment key={doctor.id}>
                                <div onClick={() => {
                                    const newValue = selectedDoctor === doctor.id ? null : doctor.id
                                    setSelectedDoctor(newValue)
                                    onSelectDoctor?.( newValue ? {id: doctor.id , name: doctor.name, img: doctor.imageUrl, speciality: doctor.speciality} : null)
                                }} className={`border rounded-lg px-5 py-8 flex flex-col gap-5 max-w-100 mx-auto sm:mx-0 w-full sm:w-[48%] lg:w-[31%] cursor-pointer ${selectedDoctor === doctor.id ? "border-primary" : "border-muted/20"}`}>
                                    <div className="flex gap-3">
                                        <img
                                            src={doctor.imageUrl}
                                            alt="Doctor Image"
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="text-muted text-lg font-bold">Dr. {doctor.name}</p>
                                            <p className="text-sm text-primary font-semibold">{doctor.speciality}</p>
                                            <p className="text-muted-foreground text-sm">({doctor.appointments.length}) appointments</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <MapPinIcon className="text-muted-foreground" size={20} />
                                        <p className="text-muted-foreground text-sm">Dental Centre</p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <Phone className="text-muted-foreground" size={20} />
                                        <p className="text-muted-foreground text-sm">{doctor.phone}</p>
                                    </div>

                                    <p className="text-muted-foreground text-sm">{doctor.bio}</p>

                                    <div className="rounded-full px-4 py-1 bg-blue-300/40 w-max">
                                        <p className="text-sm text-black">Licensed Professional</p>
                                    </div>


                                </div>

                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}


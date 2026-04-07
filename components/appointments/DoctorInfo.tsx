"use client"
import React from "react"
import { getDoctors } from "@/hooks/useDoctors"
import {  MapPinIcon, Phone } from "lucide-react"

export const DoctorInfo = () => {

    const { data, isLoading, isError } = getDoctors()
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
    console.log(data.doctors[0].imageUrl)
    console.log(data.doctors)

    return (
        <>
            <p className="w-[95%] sm:w-[80%] mx-auto text-center sm:text-start text-2xl font-bold text-muted/80 my-5">Choose Your Dentist</p>
            <div className="w-[95%] sm:w-[80%] flex flex-wrap mx-auto gap-2">
                {
                    data.doctors.map((doctor: any, index: any) => {
                        return (
                            <React.Fragment key={doctor.id}>
                                <div  className="border border-muted/20 rounded-lg p-5 flex flex-col gap-5 max-w-100 mx-auto sm:mx-0 w-full sm:w-[48%] lg:w-[31%]">
                                    <div className="flex gap-3">
                                        <img
                                            src={doctor.imageUrl}
                                            alt="Doctor Image"
                                            referrerPolicy="no-referrer"
                                            crossOrigin="anonymous"
                                            className="w-25 h-25 rounded-full object-cover"
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
                                 <div  className="border border-muted/20 rounded-lg p-5 flex flex-col gap-5 max-w-100 mx-auto sm:mx-0 w-full sm:w-[48%] lg:w-[31%]">
                                    <div className="flex gap-3">
                                        <img
                                            src={doctor.imageUrl}
                                            alt="Doctor Image"
                                            className="w-25 h-25 rounded-full object-cover"
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
                                 <div  className="border border-muted/20 rounded-lg p-5 flex flex-col gap-5 max-w-100 mx-auto sm:mx-0 w-full sm:w-[48%] lg:w-[31%]">
                                    <div className="flex gap-3">
                                        <img
                                            src={doctor.imageUrl}
                                            alt="Doctor Image"
                                            className="w-25 h-25 rounded-full object-cover"
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


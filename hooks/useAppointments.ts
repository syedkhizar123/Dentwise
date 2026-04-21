"use client"

import { useMutation, useQuery } from "@tanstack/react-query"

export const getUserAppointments = () => {
    return useQuery({
        queryKey: ["users-upcoming-appointments"],
        queryFn: async () => {
            const res = await fetch("/api/appointments/get-user")
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.msg || "Failed to fetch")
            }
            return data
        }
    })
}

export const getUserAppointmentsStats = () => {
    return useQuery({
        queryKey: ["users-appointment-stats"],
        queryFn: async () => {
            const res = await fetch("/api/appointments/get-user-stats")
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.msg || "Failed to fetch")
            }
            return data
        }
    })
}

export const getBookedSlots = (doctorId?: string, date?: string) => {
    return useQuery({
        queryKey: ["Booked-Slots", doctorId, date],
        queryFn: async () => {
            const res = await fetch("/api/appointments/booked-slots", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ doctorId, date })
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.msg || "Failed to fetch")
            }
            return data
        },
        enabled: !!doctorId && !!date
    })
}
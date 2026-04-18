"use client"

import { useQuery } from "@tanstack/react-query"

export const getUserAppointments = () => {
    return useQuery({
        queryKey: ["users-upcoming-appointments"],
        queryFn: async () => {
            const res = await fetch("/api/appointments/get-user")
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.msg || "Failed to fetch")
            }
            return data.upcoming
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
"use client"

import { useQuery } from "@tanstack/react-query"

export const getUserAppointments = () => {
    return useQuery({
        queryKey: ["users-appointments-stats"],
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
"use client"

import {  useQuery } from "@tanstack/react-query"

export const getDoctors = () => {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await fetch("/api/doctors/get-all")
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.msg || "Failed to fetch")
            }
            return data
        }
    })
}
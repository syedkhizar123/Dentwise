"use client"

import { useMutation } from "@tanstack/react-query"

export const useSyncUser = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/users/sync", {
                method: "POST"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data?.error || "Failed to sync")
            }

            return data
        },
        onSuccess: (data) => {
            console.log("User synced", data)
        },
        onError: (error) => {
            console.log("API failed", error)
        }
    })

}
"use client"

import { useMutation } from "@tanstack/react-query"

export const useSyncUser = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/users/sync", {
                method: "POST"
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data?.error || "Failed to sync")
            }

            return res.json()
        },
        onSuccess: (data) => {
            console.log("User synced", data)
        },
        onError: (error) => {
            console.log("API failed", error)
        }
    })

}
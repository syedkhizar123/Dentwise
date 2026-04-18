"use client"

import { useMutation } from "@tanstack/react-query"

export const usePayment = () => {
    return useMutation({
        mutationFn: async ({
            doctorId,
            date,
            time,
            duration,
            amount
        }: {
            doctorId: string | null
            date: string
            time: string
            duration: string | null
            amount: number | null
        }) => {

            const res = await fetch("/api/payment/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorId,
                    date,
                    time,
                    duration,
                    amount
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data?.msg || "Payment failed")
            }

            return data
        },

        onSuccess: (data) => {
            if (data?.url) {
                window.location.href = data.url 
            }
        },

        onError: (error) => {
            console.log("Payment error:", error)
        }
    })
}
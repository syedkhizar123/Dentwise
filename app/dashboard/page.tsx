"use client"

import { useSyncUser } from "@/hooks/useSyncUser"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Dashboard = () => {

    const { mutate } = useSyncUser()
    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])

    useEffect(() => {
        if (user && isLoaded) {
            mutate()
        }
    }, [user, isLoaded])
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard

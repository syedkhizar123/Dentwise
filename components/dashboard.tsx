"use client"
import { useSyncUser } from "@/hooks/useSyncUser"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

const DashboardComp = () => {

    const { mutate } = useSyncUser()
    const { user, isLoaded } = useUser()

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

export default DashboardComp

"use client"

import { Actions } from "@/components/dashboard/Actions"
import { Activity } from "@/components/dashboard/Activity"
import { Header } from "@/components/dashboard/Header"
import { Welcome } from "@/components/dashboard/Welcome"
import { getUserAppointments } from "@/hooks/useAppointments"
import { useSyncUser } from "@/hooks/useSyncUser"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Dashboard = () => {

    const { data , isLoading , isError , error} = getUserAppointments() 
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

    if (isLoading || !isLoaded) {
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
    return (
       <>
        <Header name={user?.fullName || ""} email={user?.emailAddresses[0].emailAddress} />
        <Welcome name={user?.firstName || ""} />
        <Actions />
        <Activity total={data?.total} completed={data?.completed} month={user?.createdAt?.toString().split(" ")[1]} year={user?.createdAt?.toString().split(" ")[3]} />
       </>
    )
}

export default Dashboard

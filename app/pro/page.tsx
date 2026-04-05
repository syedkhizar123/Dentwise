"use client"

import { Actions } from "@/components/dashboard/Actions"
import { Activity } from "@/components/dashboard/Activity"
import { Header } from "@/components/dashboard/Header"
import { Welcome } from "@/components/dashboard/Welcome"
import { Hero } from "@/components/pro/Hero"
import { Pricing } from "@/components/pro/Pricing"
import { useSyncUser } from "@/hooks/useSyncUser"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Pro = () => {

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
       <>
        <Header name={user?.fullName || ""} email={user?.emailAddresses[0].emailAddress} />
        <Hero />
        <Pricing />
       </>
    )
}

export default Pro

"use client"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Bookings = () => {
    const { isSignedIn , isLoaded } = useUser()
    const router = useRouter()
    
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])

    return (
        <div>
            <h1>This is Bookings Page</h1>
        </div>
    )
}

export default Bookings

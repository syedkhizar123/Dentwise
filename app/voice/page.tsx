"use client"
import { Header } from '@/components/dashboard/Header'
import { Call } from '@/components/voice/Call'
import { FeatureCards } from '@/components/voice/FeatureCards'
import { Hero } from '@/components/voice/Hero'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import  { useEffect } from 'react'

const Voice = () => {

    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn])
  return (
    <>
        <Header name={user?.fullName || ""} email={user?.emailAddresses[0].emailAddress} />
        <Hero />
        <FeatureCards />
        <Call name={user?.fullName || "User"} image={user?.imageUrl || ""} />
    </>
  )
}

export default Voice

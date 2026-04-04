"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/howItWorks";
import { WhatToAsk } from "@/components/landing/whatToAsk";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/footer";


export default function Home() {

  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard")
    }
  }, [isLoaded, isSignedIn])
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <Pricing />
      <CTA />
      <Footer />
    </>

  );
}

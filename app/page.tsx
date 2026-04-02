"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";


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
    </>

  );
}

"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard")
    }
  }, [isLoaded, isSignedIn])
  return (
 
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc font-sans dark:bg-black ">
      <h1 className="text-7xl text-white ">Welcome to Dentwise</h1>
    </div>
  );
}

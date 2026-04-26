"use client"

import Image from "next/image"
import Vapi from "@vapi-ai/web"
import { useEffect, useRef, useState } from "react"
import { useGetUser } from "@/hooks/useSyncUser"
import toast from "react-hot-toast"

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!)

interface CallProps {
    image: string,
    name: string
}

export const Call = ({ image, name }: CallProps) => {

    const [isLoadingCall, setIsLoadingCall] = useState(false)
    const [isCallActive, setIsCallActive] = useState(false)
    const [aiStatus, setAiStatus] = useState("Waiting...")
    const [userStatus, setUserStatus] = useState("Ready")
    const [callData, setCallData] = useState<any[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { data , isLoading , isError} = useGetUser()

    useEffect(() => {
        console.log(data)
    } , [data])

    const startCall = async () => {
        try {
            if(data?.plan === "FREE" || null){
                toast.error("Upgrade to use the feature")
                return
            }
            setIsLoadingCall(true)
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
        } catch (error) {
            console.log("Failed to start call", error)
        }
    }

    const endCall = async () => {
        vapi.stop()
        setIsCallActive(false)
    }

    useEffect(() => {
        vapi.on("call-start", () => {
            setIsCallActive(true)
            setIsLoadingCall(false)
            setAiStatus("Ready...")
            setUserStatus("Ready...")
            setCallData([])
        })

        vapi.on("message", (msg: any) => {

            if (msg.type === "speech-update") {
                if (msg.role === "assistant") {
                    setAiStatus("Speaking...")
                    setUserStatus("Listening...")
                } else if (msg.role === "user") {
                    setUserStatus("Speaking...")
                    setAiStatus("Listening...")
                }
            }

            if (msg.type === "transcript") {
                setCallData((prev) => {
                    const last = prev[prev.length - 1]
                    const newText = msg.transcript.trim()

                    if (!newText) return prev

                    if (last && last.role === msg.role) {
                        const oldText = last.text.trim()

                        if (newText.length >= oldText.length) {
                            const updated = [...prev]
                            updated[updated.length - 1] = {
                                ...last,
                                text: newText
                            }
                            return updated
                        }

                        return prev
                    }

                    return [
                        ...prev,
                        {
                            role: msg.role,
                            text: newText
                        }
                    ]
                })
            }

        })

        vapi.on("call-end", () => {
            setIsCallActive(false)
            setIsLoadingCall(false)
            setAiStatus("Waiting...")
            setUserStatus("Ready")
        })


        return () => {
            vapi.removeAllListeners()
        }
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [callData])

   if(isLoading){
    return (
        <div className="flex items-center justify-center">
            <p className="text-muted">Loading...</p>
        </div>
    )
   }

   if(isError){
    return (
        <div className="flex items-center justify-center">
            <p className="text-muted">Something went wrong.</p>
        </div>
    )
   }

    return (
        <div className="w-[95%] sm:w-[80%] mx-auto py-10 flex flex-col gap-3">
            <p className="text-muted text-3xl font-semibold mx-auto text-center">Talk to Your<span className="text-primary text-3xl font-bold"> AI DENTAL ASSISTANT</span></p>
            <p className="text-muted-foreground mx-auto text-center">Have a voice conversation with our AI assistant for dental advice and guidance</p>

            <div className="flex flex-col md:flex-row justify-center gap-3 items-center mt-5">

                <div className="flex flex-col justify-center items-center gap-2 border border-muted-foreground/20 rounded-lg py-20 w-full md:w-[48%]">
                    <div className="flex justify-center items-center p-3 rounded-full bg-primary/10">
                        <Image src="logo.png" alt="AI Dental Assistant" width={100} height={100} />
                    </div>
                    <p className="text-muted text-xl font-bold">Dentwise AI</p>
                    <p className="text-lg text-muted-foreground">Dental Assistant</p>
                    <div className={`flex justify-center items-center gap-2 px-3 py-1 rounded-full border mt-2 ${aiStatus === "Speaking..." ? "border-primary" : aiStatus === "Listening..." ? "border-muted" : "border-muted-foreground"}`}>
                        <div className={`size-1.5 bg-muted-foreground rounded-full ${aiStatus === "Speaking..." ? "bg-primary" : aiStatus === "Listening..." ? "bg-muted" : "bg-muted-foreground"}`}></div>
                        <p className={`text-xs ${aiStatus === "Speaking..." ? "text-primary" : aiStatus === "Listening..." ? "text-muted" : "text-muted-foreground"}`}>{aiStatus}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2 border border-muted-foreground/20 rounded-lg py-20 w-full md:w-[48%]">
                    <div className="flex justify-center items-center p-0 rounded-full bg-primary/10">
                        <Image src={image || "/default-avatar.png"} alt="User" className="rounded-full " width={124} height={124} />
                    </div>
                    <p className="text-muted text-xl font-bold">You</p>
                    <p className="text-lg text-muted-foreground">{name}</p>
                    <div className={`flex justify-center items-center gap-2 px-3 py-1 rounded-full border mt-2 ${userStatus === "Speaking..." ? "border-primary" : userStatus === "Listening..." ? "border-muted" : "border-muted-foreground"}`}>
                        <div className={`size-1.5 rounded-full ${userStatus === "Speaking..." ? "bg-primary" : userStatus === "Listening..." ? "bg-muted" : "bg-muted-foreground"}`}></div>
                        <p className={`text-xs ${userStatus === "Speaking..." ? "text-primary" : userStatus === "Listening..." ? "text-muted" : "text-muted-foreground"}`}>{userStatus}</p>
                    </div>
                </div>

            </div>

            <button
                disabled={isLoadingCall}
                onClick={() => { isCallActive ? endCall() : startCall() }}
                className={`rounded-full py-2 px-5 w-max mx-auto my-5 text-sm text-muted
                ${isCallActive ? "bg-muted-foreground" : "bg-primary"} 
                ${isLoadingCall ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {isCallActive ? "End Call" : isLoadingCall ? "Connecting..." : "Start Call"}
            </button>

            <div ref={containerRef} className="w-full max-w-2xl mx-auto mt-5 border border-muted-foreground/20 rounded-lg p-6 h-60 overflow-y-auto">
                {callData.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center">
                        Conversation will appear here...
                    </p>
                ) : (
                    callData.map((msg, index) => (
                        <div key={index} className="mb-3">
                            <p className="text-xs text-muted-foreground">
                                {msg.role === "assistant" ? "Dentwise AI" : "You"}
                            </p>
                            <p className="text-sm text-muted/80">
                                {msg.text}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
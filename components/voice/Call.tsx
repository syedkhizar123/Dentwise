"use client"

import Image from "next/image"
import Vapi from "@vapi-ai/web"

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!)

interface CallProps {
    image: string,
    name: string
}

export const Call = ({ image, name }: CallProps) => {

    const startCall = async () => {
        try {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
        } catch (error) {
            console.log("Failed to start call", error)
        }
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
                    <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-full border border-muted-foreground mt-2">
                        <div className="size-1.5 bg-muted-foreground rounded-full"></div>
                        <p className="text-muted-foreground text-xs">Waiting...</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2 border border-muted-foreground/20 rounded-lg py-20 w-full md:w-[48%]">
                    <div className="flex justify-center items-center p-0 rounded-full bg-primary/10">
                        <Image src={image || "/default-avatar.png"} alt="User" className="rounded-full " width={124} height={124} />
                    </div>
                    <p className="text-muted text-xl font-bold">You</p>
                    <p className="text-lg text-muted-foreground">{name}</p>
                    <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-full border border-muted-foreground mt-2">
                        <div className="size-1.5 bg-muted-foreground rounded-full"></div>
                        <p className="text-muted-foreground text-xs">Ready</p>
                    </div>
                </div>

            </div>

            <button onClick={() => { startCall() }} className="bg-primary rounded-full py-2 px-5 w-max mx-auto my-5">
                <p className="text-muted text-sm">Start Call</p>
            </button>
        </div>
    )
}
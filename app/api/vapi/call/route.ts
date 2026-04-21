import { NextResponse } from "next/server";

export async function POST () {
    try {
        const res = await fetch("https://api.vapi.ai/call" , {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assistantId: process.env.VAPI_ASSISTANT_ID,
                // type: "outboundPhoneCall"
            })
        })

        const data = await res.json()
        return NextResponse.json(data)
        
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
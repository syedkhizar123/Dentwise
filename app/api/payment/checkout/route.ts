import { requireAuth } from "@/lib/middleware/auth";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const { doctorId, date, time, duration, notes, reason, amount , userEmail} = body
        console.log("CHECKOUT BODY:", body)
        console.log("METADATA SENT:", {
            doctorId,
            date,
            time,
            duration,
        })

        const authUser = await requireAuth()
        const userId = authUser.user.clerkId

        if (!userId ) {
            throw new Error("Missing required checkout fields")
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Doctor Appointment",
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId: String(userId),
                doctorId: String(doctorId),
                date: String(date),
                time: String(time),
                duration: String(duration),
                notes: String(notes ?? ""),
                reason: String(reason ?? ""),
                userEmail: String(userEmail)
            }
        })

        return NextResponse.json({ url: (await session).url })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { msg: "Internal Server Error" },
            { status: 500 }
        )
    }
}
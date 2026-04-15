import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const { doctorId, date, time, amount } = body

        const session = stripe.checkout.sessions.create({
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
                doctorId,
                date,
                time
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
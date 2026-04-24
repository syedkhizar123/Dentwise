import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
    try {

        const { userId, priceId, email } = await req.json()
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        let customerId = user?.stripeCustomerId

        if (!customerId) {
            const customer = await stripe.customers.create({
                email,
            })

            customerId = customer.id

            await prisma.user.update({
                where: { id: userId },
                data: { stripeCustomerId: customerId }
            })
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customerId,
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pro`
        })

        return NextResponse.json({ url: session.url }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
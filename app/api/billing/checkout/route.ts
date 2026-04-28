import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {


    try {

        const { userId, plan, email } = await req.json()
        let priceId = ""

        if (plan === "STANDARD") {
            priceId = process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID!
        } else if (plan === "PRO") {
            priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!
        } else {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        console.log("stripeSubscriptionId:", user?.stripeSubscriptionId)
        console.log("stripeCustomerId:", user?.stripeCustomerId)

        // if (user?.stripeSubscriptionId) {
        //     const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)

        //     await stripe.subscriptions.update(user.stripeSubscriptionId, {
        //         items: [
        //             {
        //                 id: subscription.items.data[0].id,
        //                 price: priceId
        //             }
        //         ],
        //         proration_behavior: "none", 
        //     })

        // }
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
        console.log("Price IDs from env:", {
            standard: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID,
            pro: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
            selectedPriceId: priceId
        })

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

            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pro`
        })

        return NextResponse.json({ url: session.url }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


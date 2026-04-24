import { Plan } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { TextQuote } from "lucide-react";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {

    const body = await req.text()
    const headersList = await headers()
    const sig = headersList.get("stripe-signature")

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return new Response("Webhook error", { status: 400 })
    }

    switch (event.type) {

        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session

            const customerId = session.customer as string
            const subscriptionId = session.subscription as string

            const subscription = await stripe.subscriptions.retrieve(subscriptionId)

            const priceId = subscription.items.data[0].price.id

            let plan: Plan = Plan.FREE

            if (priceId === process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID) {
                plan = Plan.STANDARD
            } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) {
                plan = Plan.PRO
            }

            await prisma.user.update({
                where: { stripeCustomerId: customerId },
                data: {
                    plan,
                    stripeSubscriptionId: subscriptionId
                }
            })

            break
        }

        case "customer.subscription.deleted": {

            const subscription = event.data.object as Stripe.Subscription

            await prisma.user.update({
                where: { stripeSubscriptionId: subscription.id },
                data: {
                    plan: Plan.FREE,
                    stripeSubscriptionId: null
                }
            })

            break
        }

        case "invoice.payment_succeeded": {
            console.log("Payment succeeded")
            break
        }

        case "invoice.payment_failed": {
            console.log("Payment failed")
            break
        }
    }

    return new Response("ok", { status: 200 })
    
}
import { Plan } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
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

            if (!subscriptionId) {
                console.log("No subscription found in session")
                break
            }

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
                    stripeSubscriptionId: subscriptionId,
                    subscriptionEnds: new Date(subscription.items.data[0].current_period_end * 1000)
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
                    stripeSubscriptionId: null,
                    subscriptionEnds: null
                }
            })

            break
        }

        case "invoice.payment_succeeded": {
            const invoice = event.data.object as Stripe.Invoice
            const subscriptionId = (invoice as any).subscription as string | null
            const customerId = invoice.customer as string

            if (!subscriptionId) {
                console.log("No subscription ID found")
                break
            }

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
                    stripeSubscriptionId: subscriptionId,
                    subscriptionEnds: new Date(subscription.items.data[0].current_period_end * 1000)
                }
            })
            console.log("Payment Invoice succeeded")

            break
        }

        case "invoice.payment_failed": {
            console.log("Payment failed")
            break
        }
    }

    return new Response("ok", { status: 200 })

}
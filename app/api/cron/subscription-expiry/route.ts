import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET() {

    try {
        const now = new Date()

        const expiredUsers = await prisma.user.findMany({
            where: {
                subscriptionEnds: {
                    lte: now
                },
                plan: {
                    not: "FREE"
                },
                stripeSubscriptionId: {
                    not: null
                }
            }
        })

        for (const user of expiredUsers) {
            try {
                await stripe.subscriptions.cancel(user.stripeSubscriptionId!)
            } catch (error) {
                console.log("Stripe cancellation error", error)
            }

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    plan: "FREE",
                    subscriptionEnds: null,
                    stripeSubscriptionId: null
                }
            })
        }

        return Response.json({
            success: true,
            processed: expiredUsers.length
        })

    } catch (error) {
        return Response.json({ error: "Cron job failed" }, { status: 500 })
    }
} 
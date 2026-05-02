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


        let activeSubscription: Stripe.Subscription | null = null;

        // if (user?.stripeSubscriptionId) {
        //     try {
        //         const sub = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

        //         if (sub.status === "active" || sub.status === "trialing") {
        //             activeSubscription = sub;
        //         } else {
        //             await prisma.user.update({
        //                 where: { id: userId },
        //                 data: {
        //                     stripeSubscriptionId: null,
        //                     plan: "FREE"
        //                 }
        //             });
        //         }
        //     } catch (err) {
        //         await prisma.user.update({
        //             where: { id: userId },
        //             data: {
        //                 stripeSubscriptionId: null,
        //                 plan: "FREE"
        //             }
        //         });
        //     }
        // }

        if (user?.stripeCustomerId) {
            const subs = await stripe.subscriptions.list({
                customer: user.stripeCustomerId,
                status: "active",
                limit: 1,
            });

            activeSubscription = subs.data[0] || null;
        }

        console.log("==== DEBUG PLAN CHECK ====");
        console.log("DB plan:", user?.plan);
        console.log("currentPriceId:", activeSubscription ? activeSubscription.items.data[0].price.id : "No active subscription");
        console.log("requested priceId:", priceId);
        console.log("STANDARD_PRICE:", process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID);
        console.log("PRO_PRICE:", process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID);
        console.log("==========================");
        if (activeSubscription) {

            const currentPriceId = activeSubscription.items.data[0].price.id

            const STANDARD_PRICE = process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID!
            const PRO_PRICE = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!

            // ✅ Already on same plan
            if (currentPriceId === priceId) {
                return NextResponse.json({ error: "You are already on this plan." }, { status: 400 })
            }

            // ❌ Block downgrade
            if (currentPriceId === PRO_PRICE && priceId === STANDARD_PRICE) {
                return NextResponse.json({
                    downgradeBlocked: true,
                    message: "Downgrade is not possible."
                })
            }
        }

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
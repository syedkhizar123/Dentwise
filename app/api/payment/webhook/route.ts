import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
    const headersList = await headers()
    const body = await req.text()
    const sig = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.log("Webhook signature failed", err)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // 🔥 MAIN EVENT
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        const metadata = session.metadata
        if (!metadata) return NextResponse.json({})

        const {
            userId,
            doctorId,
            date,
            time,
            duration,
            notes,
            reason
        } = metadata

        try {
            // 🔥 Convert clerkId → DB userId (IMPORTANT)
            const dbUser = await prisma.user.findUnique({
                where: { clerkId: userId }
            })

            if (!dbUser) return NextResponse.json({ error: "User not found" })

            // prevent duplicates
            const existing = await prisma.appointment.findFirst({
                where: {
                    doctorId,
                    userId: dbUser.id,
                    date: new Date(date)
                }
            })

            if (!existing) {
                await prisma.appointment.create({
                    data: {
                        doctorId,
                        userId: dbUser.id,
                        date: new Date(date),
                        time,
                        duration: Number(duration),
                        notes: notes || "",
                        reason: reason || "",
                    }
                })

                // Send confirmation email to user
                const email = session.customer_email || metadata.userEmail
                if(!email){
                    console.log("Empty email")
                    return
                }
                const {data , error } = await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: email!,
                    subject: "Appointment Confirmed",
                    html: `<p>Your booking is confirmed</p>`,
                })

                console.log("Email sent:", { data, error })
            }

        } catch (error) {
            console.log("DB Error:", error)
        }
    }

    return NextResponse.json({ received: true })
}
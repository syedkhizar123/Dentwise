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
            const dbUser = await prisma.user.findUnique({
                where: { clerkId: userId }
            })

            if (!dbUser) return NextResponse.json({ error: "User not found" })

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

                const doctor = await prisma.doctor.findUnique({
                    where: {
                        id: doctorId
                    }
                })

                // Send confirmation email to user
                const email = session.customer_email || metadata.userEmail
                if (!email) {
                    console.log("Empty email")
                    return
                }
                const { data, error } = await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: email!,
                    subject: "Appointment Confirmed - Dentwise",
                    html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden;">
                
                <div style="background-color: #f59e0b; padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0;">Appointment Confirmed</h1>
                </div>

                <div style="padding: 30px;">
                    <p style="color: #333; font-size: 16px;">Hi ${dbUser.firstName || "there"},</p>
                    <p style="color: #555;">Your appointment has been successfully booked. Here are your details:</p>

                    <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; width: 40%;">Doctor</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">Dr. ${doctor?.name || "N/A"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Speciality</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">${doctor?.speciality || "N/A"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Date</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">${new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Time</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">${time}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Duration</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">${duration} minutes</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Reason</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">${reason || "N/A"}</td>
                            </tr>
                            ${notes ? `
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Notes</td>
                                <td style="padding: 8px 0; color: #333; font-weight: bold;">${notes}</td>
                            </tr>` : ""}
                        </table>
                    </div>

                    <p style="color: #555;">If you need to reschedule or cancel, please contact us as soon as possible.</p>
                    <p style="color: #555;">See you soon! 😊</p>
                </div>

                <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                    <p style="color: #999; font-size: 12px; margin: 0;">© 2025 DentalCare. All rights reserved.</p>
                </div>

            </div>
        </body>
        </html>
    `
                    ,
                })

                console.log("Email sent:", { data, error })
            }

        } catch (error) {
            console.log("DB Error:", error)
        }
    }

    return NextResponse.json({ received: true })
}
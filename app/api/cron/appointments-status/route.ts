import { prisma } from "@/lib/prisma"

export async function GET() {
    try {

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // const pendingAppointments = await prisma.appointment.findMany({
        //     where: {
        //         status: "CONFIRMED",
        //         date: {
        //             lte: now
        //         }
        //     }
        // })

        // for (const appt of pendingAppointments) {
        //     await prisma.appointment.update({
        //         where: { id: appt.id },
        //         data: { status: "COMPLETED" }
        //     })
        // }

        const pendingAppointments = await prisma.appointment.updateMany({
            where: {
                status: "CONFIRMED",
                date: {
                    lt: today
                },
            },
            data: {
                status: "COMPLETED"
            }
        })

        return Response.json({
            success: true,
            updated: pendingAppointments.count,
        });
    } catch (error) {
        return Response.json({ error: "Cron job failed" }, { status: 500 })
    }
}
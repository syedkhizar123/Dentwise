"use server"

import { requireAuth } from "../middleware/auth"
import { prisma } from "../prisma"

export const createAppointment = async (req: Request) => {
    try {
        // const user = await requireAuth()

        const body = await req.json()

        const { date, time, duration, notes, reason, userId, doctorId } = body

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId }
        })

        if (!dbUser) {
            return { status: 404, msg: "User not found" }
        }

        if (!date || !time || !duration || !userId || !doctorId) {
            return {
                status: 400,
                msg: "All fields are required"
            }
        }
        const isoDate = new Date(date);
        const newAppointment = await prisma.appointment.create({
            data: {
                date: isoDate,
                time,
                duration,
                notes: notes || "",
                reason: reason || "",
                userId: dbUser.id,
                doctorId
            }
        })

        return {
            status: 201,
            msg: "Appointment created successfully",
            newAppointment
        }
    } catch (error) {

        console.log("Internal Server Error", error)
        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }

}


export const getAllAppointments = async () => {
    try {

        // const user = await requireAuth()

        const appointments = await prisma.appointment.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            status: 200,
            msg: "Appointments fetched successfully",
            appointments
        }
    } catch (error) {

        console.log("Internal Server Error", error)
        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }
}


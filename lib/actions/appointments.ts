"use server"

import { requireAuth } from "../middleware/auth"
import { prisma } from "../prisma"

export const createAppointment = async (req: Request) => {
    try {
        const user = await requireAuth()

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
    } catch (error: any) {
        console.log("Internal Server Error", error)
        if (error.message === "Unauthorized") {
            return {
                status: 401,
                msg: "Unauthorized"
            }
        }
        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }

}


export const getAllAppointments = async () => {
    try {

        const user = await requireAuth()

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
    } catch (error: any) {
        console.log("Internal Server Error", error)
        if (error.message === "Unauthorized") {
            return {
                status: 401,
                msg: "Unauthorized"
            }
        }
        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }
}

export const getUserAppointments = async () => {
    try {
        const user = await requireAuth()

        // user = {
        //     user : {
        //         id: "..."
        //     }
        // }

        const id = user.user.id
        const userAppointments = await prisma.appointment.findMany({
            where: { userId: id }
        })

        return {
            status: 200,
            msg: "Appointments fetched successfully",
            userAppointments
        }
    } catch (error: any) {
        console.log(error)
        if (error.message === "Unauthorized") {
            return {
                status: 401,
                msg: "Unauthorized"
            }
        }
        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }
}

export const getBookedSlots = async (req: Request) => {
    try {
        const user = await requireAuth()
        const body = await req.json()
        const { doctorId, date } = body

        if (!doctorId || !date) return { status: 400, msg: "Doctor ID and date is required" }
        const start = new Date(`${date}T00:00:00.000Z`)
        const end = new Date(`${date}T23:59:59.999Z`)
        const bookedSlots = await prisma.appointment.findMany({
            where: {
                doctorId,
                date : {
                    gte: start,
                    lte: end
                }
            }
        })

        return {
            status: 200,
            msg: "Booked Slots fetched successfully",
            bookedSlots
        }

    } catch (error: any) {
        console.log(error)
        if (error.message === "Unauthorized") {
            return {
                status: 401,
                msg: "Unauthorized"
            }
        }
        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }
}
// Get Appointment Stats
// Update Appointment


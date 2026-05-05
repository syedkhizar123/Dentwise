"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"
import { requireAuth } from "../middleware/auth"
import { redis } from "../redis"

export const createDoctor = async (req: Request) => {

    try {
        const user = await requireAuth()

        const body = await req.json()

        const { name, email, phone, speciality, gender, isActive, bio } = body
        if (!name || !email || !phone || !speciality || !gender || isActive === undefined) {
            return {
                status: 400,
                msg: "All fields are required"
            }
        }
        let imageUrl;
        if (gender === "MALE") {
            imageUrl = "https://xerothermic-black-tj79xcyebz.edgeone.app/download.jpg"
        } else {
            imageUrl = "https://filthy-teal-skikp8ejez.edgeone.app/download.jpg"
        }

        const newDoctor = await prisma.doctor.create({
            data: {
                name,
                email,
                phone,
                speciality,
                bio: bio || null,
                gender,
                isActive,
                imageUrl
            }
        })

        await redis.del("all_doctors")

        return {
            status: 201,
            msg: "Doctor created successfully",
            doctor: newDoctor
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

export const updateDoctor = async (req: Request) => {
    try {
        const user = await requireAuth()

        const body = await req.json()
        const {
            id,
            name,
            email,
            bio,
            speciality,
            phone,
            gender,
            isActive
        } = body

        if (!id) {
            return {
                status: 400,
                msg: "Doctor ID is required"
            }
        }

        const updatedData: any = {}

        if (name !== undefined) updatedData.name = name
        if (email !== undefined) updatedData.email = email
        if (bio !== undefined) updatedData.bio = bio
        if (speciality !== undefined) updatedData.speciality = speciality
        if (phone !== undefined) updatedData.phone = phone
        if (gender !== undefined) updatedData.gender = gender
        if (isActive !== undefined) updatedData.isActive = isActive

        if (gender === "MALE") {
            updatedData.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsrCyLyQ8U6WyTBm3KvE9AtbY8SPxtL2M_Q&s"
        } else if (gender === "FEMALE") {
            updatedData.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6O28cLfZm4fQ9X3SrLvYc8xAYfH70Lfx8Q&s"
        }

        const updatedDoctor = await prisma.doctor.update({
            where: { id },
            data: updatedData
        })

        await redis.del("all_doctors")

        return {
            status: 200,
            msg: "Doctor updated successfully",
            doctor: updatedDoctor
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


export const getAllDoctors = async () => {
    try {
        const user = await requireAuth()

        // await redis.del("all_doctors")
        const cacheKey = "all_doctors"
        const cached = await redis.get(cacheKey)

        if (cached) {
            try {
                return {
                    status: 200,
                    msg: "Doctors fetched successfully (from cache)",
                    doctors: JSON.parse(cached as string)
                }
            } catch {
                await redis.del(cacheKey) 
            }
        }

        const doctors = await prisma.doctor.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                appointments: true
            }
        })

        await redis.set(cacheKey, JSON.stringify(doctors), { ex: 300 })

        return {
            status: 200,
            msg: "Doctors fetched successfully",
            doctors
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

export const getAvailableDoctors = async () => {
    try {
        const user = await requireAuth()

        const doctors = await prisma.doctor.findMany({
            orderBy: {
                createdAt: "asc"
            },
            where: {
                isActive: true
            },
            include: {
                _count: {
                    select: { appointments: true }
                }
            }
        })


        return {
            status: 200,
            msg: "Doctors fetched successfully",
            doctors
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



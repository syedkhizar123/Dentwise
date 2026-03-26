"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"
import { requireAuth } from "../middleware/auth"

export const createDoctor = async (req: Request) => {

    try {

        const user = await requireAuth()
   

        const body = await req.json()
        console.log("BODY:", body)

        const { name, email, phone, speciality, gender, isActive , bio} = body
        if (!name || !email || !phone || !speciality || !gender || isActive === undefined ) {
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

        return {
            status: 201,
            msg: "Doctor created successfully",
            doctor: newDoctor
        }
    } catch (error) {
        console.log("Internal Server Error", error)

        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }
}


export const getAllDoctors = async () => {
    try {
        const doctors = await prisma.doctor.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            status: 200,
            msg: "Doctors fetched successfully",
            doctors
        }
    } catch (error) {
        console.log("Internal Server Error", error)

        return {
            status: 500,
            msg: "Internal Server Error"
        }
    }
}
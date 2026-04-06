"use server"

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export const syncUser = async () => {

    try {
        const clerkUser = await currentUser()

        if (!clerkUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const existingUser = await prisma.user.findUnique({
            where: { clerkId: clerkUser.id }
        })

        if (existingUser) return NextResponse.json({ msg: "User already in DB", user: existingUser }, { status: 200 })

        const newUser = await prisma.user.create({
            data: {
                clerkId: clerkUser.id,
                email: clerkUser.emailAddresses[0].emailAddress,
                firstName: clerkUser.firstName || null,
                lastName: clerkUser.lastName || null,
            },
        })

        return NextResponse.json({ msg: "User created in DB", user: newUser }, { status: 201 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({ msg: "Internal Server error", error }, { status: 500 })
    }

}
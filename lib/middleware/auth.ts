import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"

export const requireAuth = async () => {
    const { userId: clerkId } = await auth()
    if(!clerkId) throw new Error("Unauthorized")

    const user = await prisma.user.findUnique({
        where: { clerkId }
    })

    if(!user) throw new Error("User not in DB")

    return { user }
}
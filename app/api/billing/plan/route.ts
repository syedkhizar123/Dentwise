import { requireAuth } from "@/lib/middleware/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const user = await requireAuth()

    return Response.json({
        plan: user.user.plan || "FREE"
    })
}
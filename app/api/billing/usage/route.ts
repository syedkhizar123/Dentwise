import { requireAuth } from "@/lib/middleware/auth";
import { redis } from "../../../../lib/redis";


export async function GET (req: Request) {
    const user = await requireAuth()

    const userId = user.user.id

    const key = `voice:${userId}:${new Date().getMonth()}`
    const used = await redis.get(key) || 0

    let limit = 0

    if ( user.user.plan === "STANDARD") limit = 10
    if ( user.user.plan === "PRO") limit = Infinity

    return Response.json({
        plan: user.user.plan,
        used,
        limit
    })
}
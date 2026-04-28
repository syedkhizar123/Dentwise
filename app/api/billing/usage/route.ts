import { requireAuth } from "@/lib/middleware/auth";
import { redis } from "../../../../lib/redis";


export async function POST(req: Request) {
    const user = await requireAuth()

    const userId = user.user.id

    const now = new Date()
    const key = `voice:${userId}:${now.getFullYear()}-${now.getMonth()}`

    const used = Number(await redis.get(key)) || 0

    let limit = 0
    let plan = null

    if (user.user.plan === "FREE") limit = 0 , plan = "FREE"
    if (user.user.plan === "STANDARD") limit = 10 , plan = "STANDARD"
    if (user.user.plan === "PRO") limit = Infinity , plan = "PRO"

    if (used >= limit) {
        return Response.json({
            success: false,
            msg: "Limit reached",
            plan
        }, { status: 403 })
    }

    await redis.incr(key)

    await redis.expire(key, 60 * 60 * 24 * 30) 

    return Response.json({
        success: true,
        used: used + 1,
        limit,
        plan
    })
}
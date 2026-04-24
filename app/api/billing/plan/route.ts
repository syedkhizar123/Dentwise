import { requireAuth } from "@/lib/middleware/auth";

export async function GET(req: Request) {
    const user = await requireAuth()

    return Response.json({
        plan: user.user.plan || "FREE"
    })
}
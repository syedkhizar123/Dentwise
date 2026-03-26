import { syncUser } from "@/lib/actions/users";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const user = await syncUser()
        return NextResponse.json({ msg: "User synced", user }, { status: 200 })
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.error(error)
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
    }
}
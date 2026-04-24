import { getUser } from "@/lib/actions/users";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getUser()
        return NextResponse.json({ user }, { status: 200 })
    } catch (error: any) {

        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        } else if (error.message === "User not found") {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        } else {
            // return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 })
            return NextResponse.json(
                { error: error.message || error },
                { status: 500 }
            )
        }
    }

}
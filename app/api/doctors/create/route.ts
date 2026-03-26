import { NextResponse } from "next/server";
import { createDoctor } from "@/lib/actions/doctors";

export async function POST(req: Request) {
    try {
        const res = await createDoctor(req)
        return NextResponse.json(
            {
                msg: res.msg,
                doctor: res.doctor ?? null,
            },
            { status: res.status }
        );

    } catch (error) {
        console.log("Internal Server Error" , error)
        return NextResponse.json(
            { msg: "Internal Server Error" },
            { status: 500 }
        );
    }
}
import { updateDoctor } from "@/lib/actions/doctors";
import { NextResponse } from "next/server";


export async function PATCH (req: Request) {
    const result = await updateDoctor(req)
    return NextResponse.json( result , { status: result.status})
}
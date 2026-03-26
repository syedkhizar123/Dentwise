import { createAppointment } from "@/lib/actions/appointments";
import { NextResponse } from "next/server";


export async function POST (req : Request) {

    const result = await createAppointment(req)
    return NextResponse.json( result , { status : result.status })
}
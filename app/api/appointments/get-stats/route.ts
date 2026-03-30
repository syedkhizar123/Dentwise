import { getAppointmentStats } from "@/lib/actions/appointments";
import { NextResponse } from "next/server";

export async function GET () {
    const result = await getAppointmentStats()
    return NextResponse.json( result , { status: result.status })
}
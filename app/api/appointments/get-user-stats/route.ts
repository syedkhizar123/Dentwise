import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { NextResponse } from "next/server";

export async function GET () {
    const result = await getUserAppointmentStats()
    return NextResponse.json( result , { status : result.status} )
}
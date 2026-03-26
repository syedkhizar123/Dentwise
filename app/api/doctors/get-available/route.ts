import { getAvailableDoctors } from "@/lib/actions/doctors";
import { NextResponse } from "next/server";


export async function GET () {
    const result = await getAvailableDoctors()
    return NextResponse.json( result , { status : result.status})
}
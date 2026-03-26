import { getAllDoctors } from "@/lib/actions/doctors";
import { NextResponse } from "next/server";


export async function GET () {
    const result = await getAllDoctors()
    return NextResponse.json( result , { status: result.status})
}
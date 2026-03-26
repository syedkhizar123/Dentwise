import { updateDoctor } from "@/lib/actions/doctors";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await updateDoctor(req, id)
    return NextResponse.json(result, { status: result.status })
}
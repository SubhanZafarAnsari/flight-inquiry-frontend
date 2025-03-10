import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const inquiries = await prisma.flightInquiry.findMany({
      orderBy: { createdAt: "desc" }, // Latest inquiries first
    });

    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching inquiries", error: (error as Error).message },
      { status: 500 }
    );
  }
}

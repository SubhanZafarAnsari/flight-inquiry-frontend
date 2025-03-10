import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { departure, destination, departureDate, returnDate, fullName, email, phone } = body;

    const inquiry = await prisma.flightInquiry.create({
      data: {
        departure,
        destination,
        departureDate: new Date(departureDate),
        returnDate: returnDate ? new Date(returnDate) : null,
        fullName: fullName || "Unknown", // ✅ Prevent empty string issues
        email: email || "Unknown",
        phone: phone || "Unknown",
      },
    });

    return NextResponse.json({ message: "Inquiry submitted successfully!", inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: (error as Error).message }, { status: 500 });
  }
}


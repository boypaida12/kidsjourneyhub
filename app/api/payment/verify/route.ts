import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ error: "No reference provided" }, { status: 400 });
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json({ success: false });
    }

    // Update order in database
    const order = await prisma.order.update({
      where: { id: reference },
      data: {
        paymentStatus: "PAID",
        paymentReference: paystackData.data.reference,
        paidAt: new Date(),
        status: "PROCESSING",
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
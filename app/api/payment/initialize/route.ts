import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, email, amount } = body;

    // Convert amount to kobo (Paystack uses kobo, not cedis)
    const amountInKobo = Math.round(amount * 100);

    // Initialize Paystack transaction
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          currency: "GHS",
          reference: orderId,
          callback_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
          metadata: {
            orderId,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      throw new Error("Paystack initialization failed");
    }

    return NextResponse.json(paystackData.data);
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
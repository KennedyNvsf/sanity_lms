import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


import { stripe } from "@/lib/stripe";
import sanityClient from "@/lib/sanityClient";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {

    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

   const newPurchase = await sanityClient.create({
        _type: 'purchase',
        userId: userId,
        course: {
            _ref: courseId
        },
        createdAt: new Date().toISOString()
    })

     await sanityClient.patch(courseId).set({
        purchases: [{
          _key: uuidv4(),
          _type: 'reference',
          _ref: newPurchase._id,
        }]
    }).commit();

    return NextResponse.json(newPurchase);

  } else {
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  }

  return new NextResponse(null, { status: 200 });
}
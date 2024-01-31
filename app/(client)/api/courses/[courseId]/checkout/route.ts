import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";
import { stripe } from "@/lib/stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {

  try {
    const user = await currentUser();
    const {courseId} = params;

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch course details
    const courseQuery = `*[_type == "course" && isPublished == true && _id == "${courseId}"][0] {
        _id,
        price,
        title,
        description
    }`;
    const course = await sanityClient.fetch(courseQuery);

    // Fetch purchase details
    const purchaseQuery = `*[_type == "purchase" && userId == "${user.id}" && course._ref == "${courseId}"][0]`;
    const purchase = await sanityClient.fetch(purchaseQuery);

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100) || 0,
        }
      }
    ];

    let stripeCustomer = await sanityClient.fetch(`*[_type == 'stripeCostomer' && userId == "${user.id}"][0] {
        stripeCustomerId
    }`, { userId: user.id });



    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await sanityClient.create({
       _type: 'stripeCostumer',
       userId: user.id,
       stripeCustomerId: customer.id,
       createdAt: new Date().toISOString()
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?canceled=1`,
      metadata: {
        courseId: course._id,
        userId: user.id,
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
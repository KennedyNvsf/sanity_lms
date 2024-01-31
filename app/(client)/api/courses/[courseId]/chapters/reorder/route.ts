import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import sanityClient from "@/lib/sanityClient";
import { getUserCourse } from "@/lib/apis";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; } }
) {
  try {
    const { userId } = auth();
    const {courseId} = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const courseOwner = await getUserCourse(courseId, userId);

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    // Use Sanity client to update chapter positions
    for (let item of list) {
        await sanityClient
        .patch(item.id)
        .set({ 
          position: item.position,
          updatedAt: new Date().toISOString() 
        })
        .commit();
    }
  

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}
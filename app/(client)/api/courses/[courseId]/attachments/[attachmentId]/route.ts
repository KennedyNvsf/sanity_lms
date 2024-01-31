import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import sanityClient from "@/lib/sanityClient";
import { deleteCourseAttachment, getUserCourse } from "@/lib/apis";
import { Course } from "@/models/typings";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    const { userId } = auth();
    const {courseId, attachmentId} = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await getUserCourse(courseId, userId);

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  

    // Step 4: Course Document Update
    const deletedCourse = await deleteCourseAttachment(courseId, attachmentId);

    // Step 5: Respond with the updated course document
    return NextResponse.json(deletedCourse);

  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


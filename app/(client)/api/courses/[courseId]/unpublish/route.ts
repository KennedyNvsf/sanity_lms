import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";
import { getUserCourse } from "@/lib/apis";


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const {courseId} = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await getUserCourse(courseId, userId)

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedCourse = await sanityClient.patch(courseId).set({
        isPublished: false,
        updatedAt: new Date().toISOString()
    }).commit();

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}
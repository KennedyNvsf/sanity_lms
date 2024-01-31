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

    const course  = await getUserCourse(courseId, userId)

    if (!course) {
    return new NextResponse("Unauthorized", { status: 401 });
    }

    const hasPublishedChapter = course?.chapters?.some((chapter) => chapter._ref);

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await sanityClient.patch(courseId).set({
        isPublished: true,
        updatedAt: new Date().toISOString()
    }).commit();

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}
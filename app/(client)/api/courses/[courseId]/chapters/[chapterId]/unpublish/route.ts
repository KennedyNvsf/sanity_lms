import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";

import { getPubCourseChapt, getUserCourse } from "@/lib/apis";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const {courseId, chapterId} = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner  = await getUserCourse(courseId, userId)

    if (!courseOwner) {
    return new NextResponse("Unauthorized", { status: 401 });
    }


    const unpublishedChapter = await sanityClient.patch(chapterId).set({
        isPublished: false,
        updatedAt: new Date().toISOString()
    }).commit();
    

    const publishedChaptersInCourse = await getPubCourseChapt(courseId);

    if (!publishedChaptersInCourse) {
      await sanityClient.patch(courseId).set({
        isPublished: false,
        updatedAt: new Date().toISOString()
    }).commit();
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}
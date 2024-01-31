import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";
import { getChapter, getMuxChapter, getUserCourse } from "@/lib/apis";

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

    const chapter = await getChapter(courseId, chapterId);

    const muxData = await getMuxChapter(chapterId)

    if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await sanityClient.patch(chapterId).set({
        isPublished: true,
        updatedAt: new Date().toISOString()
    }).commit();
    

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}
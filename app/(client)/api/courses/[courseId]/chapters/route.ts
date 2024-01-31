import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import sanityClient from "@/lib/sanityClient";
import { getCourseChapt, getUserCourse, updateCourseChapter } from "@/lib/apis";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    const {courseId} = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await getUserCourse(courseId, userId);

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    // Use Sanity client to fetch the last chapter
    const lastChapter = await getCourseChapt(courseId)

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    // Use Sanity client to create a new chapter
    const chapter = await sanityClient.create({
        _type: 'chapter',
        title,
        courseId: courseId,
        position: newPosition,
        course: {
          _ref: courseId
        },
        createdAt: new Date().toISOString(),
    });

    // Step 4: Course Document Update
    const updatedChapter = await updateCourseChapter(courseId, chapter._id);

    // Step 5: Respond with the updated course document
    return NextResponse.json(updatedChapter);
    
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
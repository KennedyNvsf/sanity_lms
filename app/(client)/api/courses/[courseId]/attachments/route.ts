import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import sanityClient from "@/lib/sanityClient";
import { getUserCourse, updateCourseAttachment } from "@/lib/apis";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    const {courseId} = params;
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner  = await getUserCourse(courseId, userId)

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    
    const attachment = await sanityClient.create({
        _type: 'attachment', 
        url,
        name: url.split("/").pop(),
        courseId: {
          _type: 'reference',
          _ref: courseId,
        },
        createdAt: new Date().toISOString()
      })
      
     // Step 4: Course Document Update
     const updatedCourse = await updateCourseAttachment(courseId, attachment._id);

     // Step 5: Respond with the updated course document
     return NextResponse.json(updatedCourse);

  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



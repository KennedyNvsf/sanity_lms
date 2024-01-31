import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


import sanityClient from "@/lib/sanityClient";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();
    const {courseId, chapterId} = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    // Define the document structure for user progress in Sanity
    const userProgress = {
        _type: 'userProgress',
        _id: uuidv4(),
        userId: userId,
        chapterId: chapterId,
        isCompleted: isCompleted,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
  
    // Upsert the user progress document in Sanity
    const result = await sanityClient.createOrReplace(userProgress);

    return NextResponse.json(result);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
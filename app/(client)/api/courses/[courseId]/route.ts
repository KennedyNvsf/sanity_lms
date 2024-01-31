import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";


export async function PATCH (
    req: Request,
    { params }: {params: {courseId: string}}
) {

    try {

        const { userId } = auth();
        const {courseId} = params;
        const values = await req.json();

        if(!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }


        const course = await sanityClient.patch(courseId)
        .set({
            userId, 
            updatedAt: new Date().toISOString(),
            ...values
        })
        .commit()


        return NextResponse.json(course);

    } catch (error) {
        console.log('[COURSEID]', error);
        return new NextResponse('Internal Error', {status: 500});
    }
}


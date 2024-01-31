import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";
import { isTeacher } from "@/lib/teacher";

export async function POST (req: Request) {

    try {

        const { userId } = auth();
        const { title } = await req.json();

        if(!userId || !isTeacher(userId)) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const course = await sanityClient.create({
            _type: 'course',
            userId,
            title,
            createdAt: new Date().toISOString()
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log('[COURSES]', error);
        return new NextResponse('Internal Error', {status: 500});
    }
}
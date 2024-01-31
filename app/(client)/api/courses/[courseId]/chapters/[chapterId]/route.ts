import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import sanityClient from "@/lib/sanityClient";
import Mux from '@mux/mux-node'
import { deleteCourseChapter, getChapter, getMuxChapter, getPubCourseChapt, getUserCourse } from "@/lib/apis";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);

export async function PATCH (
    req: Request,
    { params }: {params: {courseId: string; chapterId: string}}
) {

    try {

        const { userId } = auth();
        const {courseId, chapterId} = params;
        const{ isPublished, ...values} = await req.json();

        if(!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const courseOwner  = await getUserCourse(courseId, userId)

        if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
        }

        if (values.videoUrl) {
            const existingMuxData = await getMuxChapter(chapterId);
        
            if (existingMuxData) {
                await Video.Assets.del(existingMuxData.assetId);
                await sanityClient.delete(existingMuxData._id);
            }
        
            const asset = await Video.Assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false,
            });
        
            const muxDataDocument = {
                _type: 'muxData',
                _id: asset.id,
                assetId: asset.id,
                playbackId: asset.playback_ids?.[0]?.id,
                chapter: {
                    _ref: chapterId,
                },
            };
        
            await sanityClient.createOrReplace(muxDataDocument);

            await sanityClient.patch(chapterId)
            .set({
                courseId: courseId, 
                muxData: {
                    _ref: muxDataDocument._id
                },
                updatedAt: new Date().toISOString(),
                ...values
            })
            .commit();

        }
        

        const chapter = await sanityClient.patch(chapterId)
        .set({
            courseId: courseId, 
            updatedAt: new Date().toISOString(),
            ...values
        })
        .commit();

       

        return NextResponse.json(chapter);

    } catch (error) {
        console.log('[COURSEID]', error);
        return new NextResponse('Internal Error', {status: 500});
    }
}

export async function DELETE(
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
  
      if (!chapter) {
        return new NextResponse("Not Found", { status: 404 });
      }
  
      if (chapter.videoUrl) {

        const existingMuxData = await getMuxChapter(chapterId);
  
        if (existingMuxData) {
          await Video.Assets.del(existingMuxData.assetId);
          await sanityClient.delete(existingMuxData._id);
        }
      }
  
      const deletedChapter = await deleteCourseChapter(courseId, chapterId);
  
      const publishedChaptersInCourse = await getPubCourseChapt(courseId);

  
      if (!publishedChaptersInCourse) {
        await sanityClient.patch(courseId).set({
          isPublished: false,
          updatedAt: new Date().toISOString()
      }).commit();
      }
  
      return NextResponse.json(deletedChapter);
    } catch (error) {
      console.log("[CHAPTER_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
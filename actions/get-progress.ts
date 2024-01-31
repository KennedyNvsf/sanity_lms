import { getCompletedChapterProgress, getPublishedChapters } from "@/lib/apis";



export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    const publishedChapters = await getPublishedChapters(courseId);

    const publishedChapterIds = publishedChapters.map((chapter: { _id: any; }) => chapter._id);

    const validCompletedChapters: any = await getCompletedChapterProgress(userId, publishedChapterIds);

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}
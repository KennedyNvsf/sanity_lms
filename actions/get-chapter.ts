import sanityClient from "@/lib/sanityClient";
import { Attachment, Chapter } from "@/models/typings";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
};


export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // Fetch purchase details
    const purchaseQuery = `*[_type == "purchase" && userId == "${userId}" && course._ref == "${courseId}"][0]`;
    const purchase = await sanityClient.fetch(purchaseQuery);

    // Fetch course details
    const courseQuery = `*[_type == "course" && isPublished == true && _id == "${courseId}"][0] {
      price
    }`;
    const course = await sanityClient.fetch(courseQuery);

    // Fetch chapter details
    const chapterQuery = `*[_type == "chapter" && _id == "${chapterId}" && isPublished == true][0]`;
    const chapter = await sanityClient.fetch(chapterQuery);

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments = [];
    let nextChapter = null;

    if (purchase) {
      const attachmentsQuery = `*[_type == "attachment" && courseId._ref == "${courseId}"]`;
      attachments = await sanityClient.fetch(attachmentsQuery);
    }

    if (chapter.isFree || purchase) {
      const muxDataQuery = `*[_type == "muxData" && chapter._ref == "${chapterId}"][0]`;
      muxData = await sanityClient.fetch(muxDataQuery);

      const nextChapterQuery = `*[_type == "chapter" && courseId == "${courseId}" && isPublished == true && position > ${chapter.position}] | order(position asc) [0]`;
      nextChapter = await sanityClient.fetch(nextChapterQuery);
    }

    const userProgressQuery = `*[_type == "userProgress" && userId == "${userId}" && chapterId == "${chapterId}"][0]`;
    const userProgress = await sanityClient.fetch(userProgressQuery);

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.error("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

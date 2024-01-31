import sanityClient from "./sanityClient";
import { v4 as uuidv4 } from 'uuid';
import * as queries from './sanityQueries';
import { Course, Category, Attachment, Chapter, MuxData, UserProgress, purchase } from "@/models/typings";





export async function getCourse(courseId: string) {
    const result = await sanityClient.fetch<Course>(
      queries.getCourse,
      { courseId },
      { cache: 'no-cache' }
    );
  
  return result;
}

export async function getUserCourse(courseId: string, userId: string) {
  const result = await sanityClient.fetch<Course>(
    queries.getUserCourse,
    {courseId, userId},
    { cache: 'no-cache'}
  )

  return result;
}

export async function getEnrolledCourse(courseId: string, userId: string) {
  const result = await sanityClient.fetch<Course>(
    queries.enrolledUserCourse,
    {courseId, userId},
    { cache: 'no-cache'}
  )

  return result;
}

export async function getStudentCourses( userId: string) {
  const result = await sanityClient.fetch<Course[]>(
    queries.getStudentCourse,
    {userId},
    { cache: 'no-cache'}
  )

  return result;
}

export async function getSearchCourses( userId: string) {
  const result = await sanityClient.fetch<Course>(
    queries.getStudentCourse,
    {userId},
    { cache: 'no-cache'}
  )

  return result;
}


export async function getPubStudentCourses( userId: string) {
  const result = await sanityClient.fetch<Course>(
    queries.pubStudentCourse,
    {userId},
    { cache: 'no-cache'}
  )

  return result;
}

export async function getPublishedCourses(categoryId: string, userId: string, title: string) {
  const result = await sanityClient.fetch<Course>(
    queries.publishedCoursesQuery,
    {title, categoryId, userId},
    {cache: 'no-cache'}
  )

  return result;
}

export async function getPubStudentCourse(userId: string, categoryId: string, title: string) {
  const result = await sanityClient.fetch<Course>(
    queries.PubStudentCourse_q,
    {userId},
    {cache: 'no-cache'}
  )
  return result;
}

export async function getPublishedChapters(courseId: string) {
  const result = await sanityClient.fetch<Chapter>(
    queries.publishedChaptersQuery,
    {courseId},
    {cache: 'no-cache'}
  )

  return result;
}

export async function getCompletedChapterProgress(userId: string, publishedChapterIds: string) {
  const result = await sanityClient.fetch<UserProgress>(
    queries.completedChaptProgQuery,
    {userId, publishedChapterIds},
    {cache: 'no-cache'}
  );

  return result
}

export async function getCourseCategories() {
  const result = await sanityClient.fetch<Category>(
    queries.getCourseCategories,
    {},
    { cache: 'no-cache' }
  );

  return result;
} 

export async function getCourseAttachments(courseId: string) {
  const result = await sanityClient.fetch<Attachment>(
    queries.AllCourseAttachments,
    {courseId},
    {cache: 'no-cache'}
  )

  return result;
}

export async function getCourseChapters(courseId: string) {
  const result = await sanityClient.fetch<Chapter>(
    queries.AllCourseChapters,
    {courseId},
    {cache: 'no-cache'}
  )

  return result;
}

export async function getCourseAttachment (url: string) {
  const result = await sanityClient.fetch<Attachment>(
    queries.getCourseAttachment,
    {url},
    {cache: 'no-cache'}
  )

  return result;
}


export async function updateCourseAttachment(courseId: string, attachmentId: string) {
  try {
    // Fetch the current course document
    const currentCourse = await sanityClient.getDocument<Course>(courseId);

    // Update the attachments field by adding the new attachment
    const updatedAttachments = [...(currentCourse?.attachments || []), {
      _type: 'reference',
      _key: uuidv4(),
      _ref: attachmentId,
    }];

    //Update the course document in Sanity
    const updatedCourse = await sanityClient.createOrReplace<Course>({
      ...currentCourse,
      attachments: updatedAttachments,
      updatedAt: new Date().toISOString(),
    });

    return updatedCourse;

  } catch (error) {
    console.error("COURSE_UPDATE_ERROR", error);
    throw new Error("Failed to update the course document");
  }
}


export async function deleteCourseAttachment(courseId: string, attachmentIdToDelete: string) {
  try {
    // Fetch the current course document
    const currentCourse = await sanityClient.getDocument<Course>(courseId);

    // Check if the course exists
    if (!currentCourse) {
      throw new Error("Course not found");
    }

    // Filter out the attachment to be deleted
    const updatedAttachments = (currentCourse.attachments || []).filter(
      attachment => attachment._ref !== attachmentIdToDelete
    );

    // Update the course document in Sanity
    const updatedCourse = await sanityClient.createOrReplace<Course>({
      ...currentCourse,
      attachments: updatedAttachments,
      updatedAt: new Date().toISOString(),
    });

    await sanityClient.delete(attachmentIdToDelete);

    return updatedCourse;

  } catch (error) {
    console.error("COURSE_DELETE_ATTACHMENT_ERROR", error);
    throw new Error("Failed to delete attachment from the course document");
  }
}

export async function getCourseChapt (courseId: string) {
  const result = await sanityClient.fetch<Chapter>(
    queries.getCourseChapt,
    {courseId},
    {cache: 'no-cache'}
  )

  return result;
}

export async function getPubCourseChapt (courseId: string) {
  const result = await sanityClient.fetch<Chapter>(
    queries.pubCourseChapt,
    {courseId},
    {cache: 'no-cache'}
  )

  return result;
}

export async function updateCourseChapter(courseId: string, chapterId: string) {
  try {
    // Fetch the current course document
    const currentCourse = await sanityClient.getDocument<Course>(courseId);

    // Update the attachments field by adding the new attachment
    const updatedAttachments = [...(currentCourse?.chapters || []), {
      _type: 'reference',
      _key: uuidv4(),
      _ref: chapterId,
    }];

    //Update the course document in Sanity
    const updatedCourse = await sanityClient.createOrReplace<Course>({
      ...currentCourse,
      chapters: updatedAttachments,
      updatedAt: new Date().toISOString(),
    });

    return updatedCourse;

  } catch (error) {
    console.error("COURSE_UPDATE_ERROR", error);
    throw new Error("Failed to update the course document");
  }
}

export async function getChapter (courseId: string, chapterId: string) {
  const result = await sanityClient.fetch<Chapter>(
    queries.getChapter,
    { courseId, chapterId },
    { cache: 'no-cache' }
  );

return result;
}

export async function getMuxChapter (chapterId: string) {
  const result = await sanityClient.fetch<MuxData>(
    queries.getMuxChap,
    {chapterId},
    {cache: 'no-cache'}
  )

  return result;
}


export async function deleteCourseChapter(courseId: string, chapterIdToDelete: string) {
  try {
    // Fetch the current course document
    const currentCourse = await sanityClient.getDocument<Course>(courseId);

    // Check if the course exists
    if (!currentCourse) {
      throw new Error("Course not found");
    }

    // Filter out the attachment to be deleted
    const updatedChapters = (currentCourse.chapters || []).filter(
      chapter => chapter._ref !== chapterIdToDelete
    );

    // Update the course document in Sanity
    const updatedCourse = await sanityClient.createOrReplace<Course>({
      ...currentCourse,
      chapters: updatedChapters,
      updatedAt: new Date().toISOString(),
    });

    await sanityClient.delete(chapterIdToDelete);

    return updatedCourse;

  } catch (error) {
    console.error("COURSE_DELETE_ATTACHMENT_ERROR", error);
    throw new Error("Failed to delete attachment from the course document");
  }
}


export async function getPurchase (courseId: string, userId: string) {
  const result = await sanityClient.fetch<purchase>(
    queries.purchaseQry,
    {courseId, userId},
    {cache: 'no-cache'}
  )

  return result;
}
import { Course, Category, Chapter } from "@/models/typings";

import sanityClient from "@/lib/sanityClient";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {

    const purchaseQuery = `*[_type == "purchase" && userId == "${userId}" ]{
        _id,
        course-> {
            _id,
            title,
            price,
            description,
            imageUrl,
            category->,
            chapters[]{
                ...,
            }
        }
    }`;
    const purchasedCourses = await sanityClient.fetch(purchaseQuery);

    // Initialize arrays for completed and in-progress courses
    const completedCourses: CourseWithProgressWithCategory[] = [];
    const coursesInProgress: CourseWithProgressWithCategory[] = [];

    // Iterate through purchased courses and retrieve progress for each
    for (const purchase of purchasedCourses) {
        const { _id, course } = purchase;
        const progress = await getProgress(userId, course._id);
        const courseWithProgress: CourseWithProgressWithCategory = {
          ...course,
          progress: progress
        };
        
        if (progress === 100) {
          completedCourses.push(courseWithProgress);
        } else {
          coursesInProgress.push(courseWithProgress);
        }
      }
  
    

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";

import { getSearchCourses } from "@/lib/apis";
import { Category, Course } from "@/models/typings";
import { getProgress } from "@/actions/get-progress";
import sanityClient from "@/lib/sanityClient";

import { CourseWithProgressWithCategory } from "@/models/typings";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {

  const { userId } = auth();
  const {title, categoryId} = searchParams;

  if (!userId) {
    return redirect("/");
  }

 
  // const categories = await getCourseCategories();

  const courses = await getSearchCourses(userId);


  const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      
    courses.map(async (course: any) => {
      // Fetch progress for the course
      const progressPercentage = await getProgress(userId, course._id);

      const purchaseQuery = `*[_type == "purchase" && userId == "${userId}" && course._ref == "${course._id}"][0]`;
      const purchase = await sanityClient.fetch(purchaseQuery);

      // Return the course with progress
      return {
        ...course,
        progress: progressPercentage,
        purchase: purchase
      };
    })
  );

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        {/* <Categories
          items={categories}
        /> */}
        <CoursesList items={coursesWithProgress} />
      </div>
    </>
   );
}
 
export default SearchPage;
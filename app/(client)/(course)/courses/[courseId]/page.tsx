import sanityClient from "@/lib/sanityClient";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }

}) => {
 
  
    const chapterQuery = `*[_type == "chapter" && courseId == "${params.courseId}" && isPublished == true][0]`;
    const chapter = await sanityClient.fetch(chapterQuery);

  return redirect(`/courses/${params.courseId}/chapters/${chapter._id}`);
}
 
export default CourseIdPage;
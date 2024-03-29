import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@/models/typings";
import { redirect } from "next/navigation";

import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { getCourseChapters, getPurchase } from "@/lib/apis";

interface CourseSidebarProps {
  course: Course;
  progressCount: number;
};

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await getPurchase(course._id, userId)

  const chapters = await getCourseChapters(course._id);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {chapters.sort((a: any, b: any) => a.position - b.position).map((chapter: any) => (
          <CourseSidebarItem
            key={chapter._id}
            id={chapter._id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course._id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}
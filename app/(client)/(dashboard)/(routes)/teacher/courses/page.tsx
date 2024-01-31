import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { getStudentCourses } from "@/lib/apis";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await getStudentCourses(userId)

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
   );
}
 
export default CoursesPage;
import sanityClient from "@/lib/sanityClient";
import { Course, purchase } from "@/models/typings";

type PurchaseWithCourse = purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
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
    const purchases = await sanityClient.fetch(purchaseQuery);

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}
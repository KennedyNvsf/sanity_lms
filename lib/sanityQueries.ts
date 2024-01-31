import { groq } from 'next-sanity';

export const getCourse = groq`*[_type == "course" && _id == $courseId][0] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters[]->,
    attachments,
    purchases,
    
}`;

export const getUserCourse = groq`*[_type == "course" && _id == $courseId && userId == $userId][0] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;

export const getStudentCourse = groq`*[_type == "course" && userId == $userId] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;

export const getSearchCourse = groq`*[
    _type == "course" 
    && isPublished == true 
    ] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;

export const enrolledUserCourse = groq`*[
    _type == "course" 
    && _id == $courseId
     && userId == $userId
    ][0] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;

export const pubStudentCourse = groq`*[_type == "course" && userId == $userId && isPublished == true] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;

export const getProfileCourse = groq`*[_type == "course" && userId == $userId && isPublished == true] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;

export const PubStudentCourse_q = groq`*[
    _type == "course" 
    && userId == $userId 
    && isPublished == true 
    &&  $categoryId match categoryId._ref
    &&  title match $title
    ] {
    _id,
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    categoryId,
    chapters,
    attachments[]->,
    purchases,
    
}`;


export const publishedCoursesQuery = groq`*[_type == 'course' && isPublished == true && title match $title && categoryId == $categoryId] | order(createdAt desc) {
    _id,
    title,
    category->,
    chapters[] {
      _ref
    },
    purchases[]
}`;

export const publishedChaptersQuery = groq`*[_type == 'chapter' && courseId == $courseId && isPublished == true] {
    _id,
}`;


export const completedChaptProgQuery = groq`count(*[_type == 'userProgress' && userId == $userId && chapterId in $publishedChapterIds && isCompleted == true])`;



export const getCourseCategories = groq`*[_type == "category"] | order(name asc){
    _id,
    name,
    courses[]->
}`

export const getCourseAttachment = groq`*[_type == "attachment" && name == $attachmentUrl][0] {
    _id,
    name,
    url
}`

export const AllCourseAttachments = groq`*[_type == "attachment" && courseId._ref == $courseId]{
    _id,
    name,
}`

export const AllCourseChapters = groq`*[_type == "chapter" && courseId == $courseId]{
    _id,
    title,
    description,
    videoUrl,
    position,
    isPublished,
    isFree,
    muxData[]->,
    courseId

}`

export const getCourseChapt = groq`*[_type == "chapter" && courseId == $courseId] | order(position desc)[0] {
    _id,
    courseId,
    title,
    position
}`

export const pubCourseChapt = groq`*[_type == 'chapter' && courseId == $courseId && isPublished == true]{
    _id,
    title,
    description,
    videoUrl,
    price,
    position,
    isPublished,
    isFree,
    muxData->,
    muxVideo,
    courseId,
    course[]->,
    userProgress[]->,
    createdAt,
    updatedAt
}`

export const getChapter = groq`*[_type == "chapter" && courseId == $courseId && _id == $chapterId][0] {
    _id,
    title,
    description,
    videoUrl,
    price,
    position,
    isPublished,
    isFree,
    muxData->,
    muxVideo,
    courseId,
    course[]->,
    userProgress[]->,
    createdAt,
    updatedAt
    
}`;

export const getMuxChap = groq`*[_type == "muxData" && chapter._ref == $chapterId][0] {
    assetId,
    playbackId,
    chapter[]->
}`


export const purchaseQry = groq`*[_type == "purchase" && userId == $userId && course._ref == $courseId][0]`
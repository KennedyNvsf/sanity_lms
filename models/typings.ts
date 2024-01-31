


export type Image = {
    _key: string;
    url: string;
};

type Slug = {
    _type: string;
    current: string;
};

type DateTime = {
    _type: string;
    current: string;
}

export type Category = {
    map(arg0: (category: { name: any; _id: any; }) => { label: any; value: any; }): { label: string; value: string; }[];
    _id: string;
    _ref?:string
    name: string;
    courses: Course[];
}

export type MuxData = {
    _id: string;
    _ref: string;
    assetId: string;
    playbackId: string;
    chapter: Chapter[];
}

export type UserProgress = {
    length: any;
    _id: string;
    _ref: string;
    userId: string;
    chapterId: string;
    chapter: Chapter;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type Chapter = {
    [x: string]: any;
    _id: string;
    _ref: string;
    title: string;
    description?: string;
    videoUrl?: string;
    position: number;
    isPublished: boolean;
    isFree: Boolean;
    muxData: MuxData;
    courseId: string;
    course: Course;
    userProgress: UserProgress[];
    createdAt: Date;
    updatedAt: Date;
}

export type Attachment = {
    _ref: string;
    map(arg0: (attachment: { _key: import("react").Key | null | undefined; name: string | number | boolean | import("react").ReactPortal | import("react").PromiseLikeOfReactNode | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined; _id: string | null; }) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
    _id: string;
    _key: string;
    name: string;
    url: string;
    courseId: Course;
    createdAt: Date;
    updatedAt: Date;
}

export type purchase = {
    _id: string;
    userId: string;
    course: Course;
    createdAt: Date;
    updatedAt: Date;
}

export type Course = {
    map: any;
    _id: string;
    userId?: string;
    title: string;
    slug?: Slug;
    description?: string;
    imageUrl?: string;
    price?: number;
    isPublished?: boolean;
    categoryId?: Category;
    chapters?: Chapter[];
    attachments?: Attachment[];
    purchases?: purchase[];
    createdAt?: string;
    updatedAt?: string;
}
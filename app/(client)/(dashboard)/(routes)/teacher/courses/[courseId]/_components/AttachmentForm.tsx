"use client";

import useSWR from 'swr';
import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course} from "@/models/typings";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { getCourseAttachments } from "@/lib/apis";


interface AttachmentFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();


  const fetchAllCourseAttachments = async () => getCourseAttachments(courseId) || [];
  const { data: allFiles, error, isLoading } = useSWR('/api/course-attachments', fetchAllCourseAttachments);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated | Reload to apply changes ");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }

  };
  

  const onDelete = async (id: string | null) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
      
        </Button>
      </div>
      {!isEditing && (
        <>
          {!allFiles && !isLoading && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {allFiles && (
            <div className="space-y-2">
              {allFiles.map((file) => (
                <div
                  key={file._id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">
                    {file.name}
                  </p>
                  {deletingId === file._id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== file._id && (
                    <button
                      onClick={() => onDelete(file._id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
           {isLoading && (
            <div className="space-y-2">
                <div
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <Loader2 className="h-4 w-4 mr-2 flex-shrink animate-spin" />
                  <p className="text-sm line-clamp-1">
                    Loading resources
                  </p>
                </div>
            
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}
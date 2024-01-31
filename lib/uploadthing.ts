import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "@/app/(client)/api/uploadthing/core";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
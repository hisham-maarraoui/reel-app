import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  videoUploader: f({ video: { maxFileSize: "64MB" } })
    .middleware(({ req }) => ({ userId: "test" }))
    .onUploadComplete((data) => {
      console.log("upload completed", data);
    }),
};

export type OurFileRouter = typeof uploadRouter; 
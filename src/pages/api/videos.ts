import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from 'next';

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "64MB" } })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Save video metadata to database
    })
} satisfies FileRouter;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, url } = req.body;

    // Here you would save to your database
    // For now, we'll just return success
    res.status(200).json({ 
      message: 'Video uploaded successfully',
      video: { title, description, url, userId }
    });
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({ message: 'Error saving video' });
  }
} 
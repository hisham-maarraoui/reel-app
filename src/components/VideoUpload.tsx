import { useCallback, useState } from "react";
import { useUploadThing } from "../utils/uploadthing";
import styles from "./VideoUpload.module.css";

const VideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("videoUploader");

  const handleUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      const uploadResponse = await startUpload([file]);
      
      if (uploadResponse) {
        console.log('Upload successful:', uploadResponse[0].url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  }, [startUpload]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload a New Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={isUploading}
      />
      {isUploading && <div>Uploading...</div>}
    </div>
  );
};

export default VideoUpload; 
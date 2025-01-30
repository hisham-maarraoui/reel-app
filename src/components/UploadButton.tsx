import React from 'react';
import { UploadButton } from "../utils/uploadthing";
import type { FileWithPath } from "@uploadthing/react";

const MyUploadButton: React.FC = () => {
  return (
    <UploadButton
      endpoint="videoUploader"
      onClientUploadComplete={(res: { url: string }[] | undefined) => {
        if (res) {
          console.log("Files: ", res);
          alert("Upload Completed");
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default MyUploadButton;

import { UploadThingProvider as UTProvider } from "@uploadthing/react";

export function UploadThingProvider({ children }: { children: React.ReactNode }) {
  return <UTProvider>{children}</UTProvider>;
} 
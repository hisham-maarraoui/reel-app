import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { UploadThingProvider } from "@uploadthing/react";
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { UploadButton } from '@/components/UploadButton';
import "@uploadthing/react/styles.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <Component {...pageProps} />

      {/* <UploadThingProvider>
        
      </UploadThingProvider> */}
    </ClerkProvider>
  );
}

export default MyApp; 
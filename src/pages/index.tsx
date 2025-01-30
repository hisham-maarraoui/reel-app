import React from 'react';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import VideoReels from '@/components/VideoReels';
import VideoUpload from '@/components/VideoUpload';
import TestUpload from '../components/TestUpload';
import MyUploadButton from '@/components/UploadButton';

const HomePage = () => {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <SignedIn>
        <TestUpload />
        <VideoUpload />
        <VideoReels />
        <MyUploadButton />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
};

export default HomePage; 
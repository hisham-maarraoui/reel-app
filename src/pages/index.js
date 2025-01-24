import React from 'react';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import VideoReels from '../components/VideoReels';

function HomePage() {
    return (
        <div className="App" style={{ height: '100vh' }}>
            <SignedIn>
                <VideoReels />
            </SignedIn>
            <SignedOut>
                <SignIn />
            </SignedOut>
        </div>
    );
}

export default HomePage; 
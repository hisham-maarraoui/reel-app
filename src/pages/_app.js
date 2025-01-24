import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

// Remove the globals.css import for now to eliminate potential issues

function MyApp({ Component, pageProps }) {
    return (
        <ClerkProvider>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}

// Make sure we're exporting the component properly
MyApp.displayName = 'MyApp';
export default MyApp; 
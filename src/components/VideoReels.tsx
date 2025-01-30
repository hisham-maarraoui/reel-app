import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './VideoReels.module.css';
import { mockReels } from '../mockData/reels';
import { UploadButton } from '../utils/uploadthing';

interface Reel {
  id: string;
  url: string;
  title: string;
  description: string;
}

const VideoReels: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    console.log('Component mounted');
    console.log('Mock reels:', mockReels);
    setReels(mockReels);
    setIsLoading(false);
    
    // Comment out the API call for now
    // fetchReels();

    // Hide hint after 3 seconds
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Add this debug information
  console.log('Current state:', {
    reelsLength: reels.length,
    currentIndex: currentReelIndex,
    isLoading,
    error
  });

  const fetchReels = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/reels');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched reels:', data); // Debug log
      setReels(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching reels:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePreviousReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextReel(),
    onSwipedRight: () => handlePreviousReel(),
    onSwipedUp: () => handleNextReel(),
    onSwipedDown: () => handlePreviousReel(),
    onSwiping: (event) => {
      setIsSwiping(true);
      const direction = event.dir;
    },
    trackMouse: true,
    delta: 10,
    swipeDuration: 500,
  });

  const containerClassName = `${styles['reels-container']} 
    ${isSwiping ? styles.swiping : ''} 
    ${showHint ? styles['show-hint'] : ''}`;

  if (isLoading) {
    return <div className={styles['loading']}>Loading reels...</div>;
  }

  if (error) {
    return <div className={styles['error']}>Error: {error}</div>;
  }

  if (reels.length === 0) {
    return <div className={styles['no-reels']}>No reels available</div>;
  }

  return (
    <div {...handlers} className={containerClassName}>
      <div className={styles['swipe-hint']}>
        Swipe left or right to navigate
      </div>
      
      <button 
        className={styles['nav-button']}
        onClick={handlePreviousReel}
      >
        ←
      </button>

      <div className={styles['reel-viewer']}>
        <video
          key={reels[currentReelIndex].id}
          className={styles['reel-video']}
          src={reels[currentReelIndex].url}
          controls
          autoPlay
          loop
        />
        <div className={styles['reel-info']}>
          <h3>{reels[currentReelIndex].title}</h3>
          <p>{reels[currentReelIndex].description}</p>
        </div>
      </div>

      <button 
        className={styles['nav-button']}
        onClick={handleNextReel}
      >
        →
      </button>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};



export default VideoReels; 
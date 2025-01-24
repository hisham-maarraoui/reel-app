import React, { useState, useEffect } from 'react';
import './VideoReels.css';
import { mockReels } from '../mockData/reels';

const VideoReels = () => {
  const [reels, setReels] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
    console.log('Mock reels:', mockReels);
    setReels(mockReels);
    setIsLoading(false);
    
    // Comment out the API call for now
    // fetchReels();
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
    } catch (error) {
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

  if (isLoading) {
    return <div className="loading">Loading reels...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (reels.length === 0) {
    return <div className="no-reels">No reels available</div>;
  }

  return (
    <div className="reels-container">
      <button 
        className="nav-button prev-button" 
        onClick={handlePreviousReel}
      >
        ←
      </button>

      <div className="reel-viewer">
        <video
          key={reels[currentReelIndex].id}
          className="reel-video"
          src={reels[currentReelIndex].url}
          controls
          autoPlay
          loop
        />
        <div className="reel-info">
          <h3>{reels[currentReelIndex].title}</h3>
          <p>{reels[currentReelIndex].description}</p>
        </div>
      </div>

      <button 
        className="nav-button next-button" 
        onClick={handleNextReel}
      >
        →
      </button>
    </div>
  );
};

export default VideoReels; 
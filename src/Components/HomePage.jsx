import React from 'react';
import './HomePage.css';
import NavBars from './NavBars';
import videoFile from './vedio.mp4'; // Import the video file for the background

function HomePage() {
  return (
    <>
      <NavBars />
      
      <div className="background-container">
        <video className="background-video" autoPlay loop muted>
          <source src={videoFile} type="vedio/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="content">
          <div className="overlay-text">
            {/* Your content goes here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

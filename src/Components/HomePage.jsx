import React from 'react';
import NavBars from './NavBars';

function HomePage() {
  return (
    <>
      <NavBars />
      
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden', // Prevents scrolling
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <video
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '-1', // Ensure video stays behind content
          }}
          autoPlay
          loop
          muted
        >
          <source src="/vedio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </>
  );
}

export default HomePage;

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
        <video
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
        </video>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            paddingTop: '60px', // Adjust if necessary based on navbar height
          }}
        >
          {/* Overlay content */}
          <div
            style={{
              color: '#ffffff',
              fontSize: '20px',
              textAlign: 'center',
              padding: '20px',
              zIndex: '1',
            }}
          >
            <h1
              style={{
                fontSize: '30px',
                margin: '0',
              }}
            >
              Welcome to the HomePage
            </h1>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                maxWidth: '800px',
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: 'rgba(64, 63, 63, 0.5)',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '30px',
              }}
            >
              Explore the content and enjoy the experience.
            </p>
          </div>
          
          {/* Content overlay */}
          <div
            style={{
              position: 'absolute',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px 15px',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '500px',
              zIndex: 2,
              marginBottom: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2
              style={{
                fontSize: '30px',
                color: '#ffffff',
              }}
            >
              Main Heading
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#ffffff',
              }}
            >
              This is the description text that goes along with the main heading.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

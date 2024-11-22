import React from 'react';
import './HomePage.css';
import NavBars from './NavBars';

function HomePage() {
  return (
    <>
      <NavBars />
      { <div className="background-image">
        <div className="content-overlay">
          <h2 className='h2-homepage'>Welcome to the Future of Inventory Modeling</h2>
        </div>
      </div> }
    </>
  );
}

export default HomePage;

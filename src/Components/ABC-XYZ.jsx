import React, { useState } from 'react';
import { Pie, Bar, Scatter } from 'react-chartjs-2';
import { useSpring, animated } from '@react-spring/web';
import NavBars from './NavBars';
import './ABC-XYZ.css';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  } from 'chart.js';
 
ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );
const ABCXYZscreen = () => {
  const [showClassificationSettings, setShowClassificationSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [criteria, setCriteria] = useState({
    abc: '',
    unitPrice: '',
    quantitySold: '',
    demand: ''
  });
  const [isClassified, setIsClassified] = useState(false);
 
  const resultAnimation = useSpring({
    opacity: showResults ? 1 : 0,
    transform: showResults ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 200, friction: 12 }
  });
 
  const toggleClassificationSettings = () => {
    if (isClassified){
        setIsClassified(false);
        setShowResults(false);
        setCriteria({
            abc: '',
            unitPrice: '',
            quantitySold: '',
            demand: ''
        })
    }
    setShowClassificationSettings(!showClassificationSettings);
  };
 
  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value
    }));
  };
 
  const runClassification = () => {
    setIsClassified(true);
    setShowClassificationSettings(false);
    setTimeout(() => {
      setShowResults(true);
    }, 1000);
  };
 
  const pieData = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [{ data: [10, 20, 30], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
  };
  const barData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{ label: 'Sales', data: [65, 59, 80], backgroundColor: '#36A2EB' }]
  };
  const scatterData = {
    datasets: [{ label: 'Demand', data: [{ x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }], backgroundColor: '#FF6384' }]
  };
  // const pieOptions = {
  //   plugins: {
  //       legend: {
  //           position: 'left', // Change legend position to left
  //           align: 'start',
  //       },
  //   },
  // };
 
  return (
    <>
    <NavBars/>
    <div className="screen-container">
      <h1 className='h1-abc-xyz'>ABC / XYZ CLASSIFICATION</h1>
     
      <div className="button-container">
        <button onClick={toggleClassificationSettings} className="main-button">
          Classification Settings
        </button>
       
        <button onClick={runClassification} className="main-button">
          Run Classification
        </button>
      </div>
 
      {showClassificationSettings && (
        <div className="settings-panel">
          <h3>Classification Settings</h3>
 
          <label>
            Classification Type:
            <select name="abc" value={criteria.abc} onChange={handleCriteriaChange} className="select-input">
              <option value="">Select</option>
              <option value="ABC">ABC</option>
              <option value="XYZ">XYZ</option>
              <option value="ABC & XYZ">ABC & XYZ</option>
            </select>
          </label>
 
          <label>
            Unit Price:
            <input
              type="number"
              name="unitPrice"
              value={criteria.unitPrice}
              onChange={handleCriteriaChange}
              className="text-input"
            />
          </label>
 
          <label>
            Quantity Sold:
            <input
              type="number"
              name="quantitySold"
              value={criteria.quantitySold}
              onChange={handleCriteriaChange}
              className="text-input"
            />
          </label>
 
          <label>
            Demand:
            <input
              type="number"
              name="demand"
              value={criteria.demand}
              onChange={handleCriteriaChange}
              className="text-input"
            />
          </label>
        </div>
      )}
 
      {isClassified && showResults &&(
        <div className="result-container">
          <animated.div style={resultAnimation} className="popup-message">
            <h2 className='h2-abc-xyz'>Results are Out!</h2>
          </animated.div>
 
          <div className="chart-container">
            <div className="chart"><Pie data={pieData} /></div>
            <div className="chart"><Bar data={barData} /></div>
            <div className="chart"><Scatter data={scatterData} /></div>
          </div>
        </div>
      )}
    </div>
    
    </>
   
  );
};
 
export default ABCXYZscreen;
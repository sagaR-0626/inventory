import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import './EOQ.css';
import NavBars from './NavBars';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 
const EOQ = () => {
  const [demandRate, setDemandRate] = useState('');
  const [orderingCost, setOrderingCost] = useState('');
  const [holdingCost, setHoldingCost] = useState('');
  const [eoq, setEoq] = useState(null);
  const [totalCostData, setTotalCostData] = useState(null);
 
  // Calculate EOQ
  const calculateEOQ = () => {
    const D = parseFloat(demandRate);
    const S = parseFloat(orderingCost);
    const H = parseFloat(holdingCost);
 
    if (isNaN(D) || isNaN(S) || isNaN(H) || D <= 0 || S <= 0 || H <= 0) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }
 
    const eoqValue = Math.sqrt((2 * D * S) / H);
    setEoq(eoqValue.toFixed(2));
 
    // Generate data for the total cost curve
    const orderQuantities = Array.from({ length: 50 }, (_, i) => i + 1);
    const totalCosts = orderQuantities.map((q) => (D / q) * S + (q / 2) * H);
 
    const chartData = {
      labels: orderQuantities,
      datasets: [
        {
          label: "Total Cost",
          data: totalCosts,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
    setTotalCostData(chartData);
  };
 
  return (
    <>

    <NavBars/>
    <div className='body-eoq'>
    <div className="app-eoq">
      <h1 className='h1-eoq'>EOQ Analysis</h1>
      <div className="input-container-eoq">
        <label>Demand Rate (D):</label>
        <input
          type="number"
          value={demandRate}
          onChange={(e) => setDemandRate(e.target.value)}
        />
 
        <label>Ordering Cost per Order (S):</label>
        <input
          type="number"
          value={orderingCost}
          onChange={(e) => setOrderingCost(e.target.value)}
        />
 
        <label>Holding Cost per Unit per Year (H):</label>
        <input
          type="number"
          value={holdingCost}
          onChange={(e) => setHoldingCost(e.target.value)}
        />
 
        <button className="small-button-eoq" onClick={calculateEOQ}>Calculate EOQ</button>
      </div>
 
      {eoq && (
        <div className="result-eoq">
          <h2>Economic Order Quantity (EOQ): {eoq} units</h2>
        </div>
      )}
 
      {totalCostData && (
        <div className="chart-container-eoq">
          <Line
            data={totalCostData}
            options={{
              scales: {
                x: { beginAtZero: true, title: { display: true, text: "Order Quantity" } },
                y: { beginAtZero: true, title: { display: true, text: "Total Cost" } },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Total Cost Curve for EOQ Analysis',
                },
              },
            }}
          />
        </div>
      )}
    </div>
    </div>
    
    </>
    
  );
};
 
export default EOQ;
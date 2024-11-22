import React, { useState } from 'react';
import axios from 'axios';
import './DemandFluctuation.css'; // Import the CSS file
import NavBars from './NavBars';

const DemandFluctuation = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [percentageChange, setPercentageChange] = useState('');
    const [holdingCost, setHoldingCost] = useState('');
    const [stockoutCost, setStockoutCost] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Get the first selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to send the file and other data
        const formData = new FormData();
        formData.append('file', file); // Append the file
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('percentageChange', parseFloat(percentageChange));
        formData.append('holdingCost', parseFloat(holdingCost));
        formData.append('stockoutCost', parseFloat(stockoutCost));

        const response = await axios('/api/analyze', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setMessage(data.message);
        // Handle displaying graphs or further processing if needed
    };

    return (
        <>
        <NavBars/>
        <div className="demand-analysis-container">
            <h1 className='h1-d'>Demand Fluctuation</h1>
            <form onSubmit={handleSubmit} className="demand-analysis-form">
                <input type="file" onChange={handleFileChange} required />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                <input type="number" value={percentageChange} onChange={(e) => setPercentageChange(e.target.value)} placeholder="Percentage Change" required />
                <input type="number" value={holdingCost} onChange={(e) => setHoldingCost(e.target.value)} placeholder="Holding Cost" required />
                <input type="number" value={stockoutCost} onChange={(e) => setStockoutCost(e.target.value)} placeholder="Stockout Cost" required />
                <button type="submit">Analyze</button>
            </form>
            {message && <p className="message">{message}</p>}
            {/* Add code to display graphs here if needed */}
        </div>
        </>
        
    );
};

export default DemandFluctuation;

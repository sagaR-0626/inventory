import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import './MLR.css'; // Import the CSS file
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import NavBars from './NavBars';
 
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
 
const MLR = () => {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [chartData, setChartData] = useState(null);
 
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = jsonData[0];
      const rows = jsonData.slice(1).map((row) =>
        row.reduce((acc, value, index) => {
          acc[headers[index]] = value;
          return acc;
        }, {})
      );
      setData(rows);
      setColumns(headers);
    };
    reader.readAsBinaryString(file);
  };
 
  // Handle analysis
  const handleAnalyze = () => {
    if (data && xColumn && yColumn) {
      const chartData = {
        labels: data.map((row) => row[xColumn]),
        datasets: [
          {
            label: `${yColumn} vs ${xColumn}`,
            data: data.map((row) => ({ x: row[xColumn], y: row[yColumn] })),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      };
      setChartData(chartData);
    }
  };
 
  return (
    
    <>
    <NavBars/>
    <div className="app">
      {/* Moved the heading outside any conditionally rendered elements */}
      <h2>Multi-Linear Regression Analysis</h2>
     
      {/* Custom file upload button */}
      <label className="custom-file-upload">
        Choose File
        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
      </label>
 
      {columns.length > 0 && (
        <div className="selectors">
          <label>Select X-axis column:</label>
          <select value={xColumn} onChange={(e) => setXColumn(e.target.value)}>
            <option value="">Select X Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
 
          <label>Select Y-axis column:</label>
          <select value={yColumn} onChange={(e) => setYColumn(e.target.value)}>
            <option value="">Select Y Column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
 
          {/* Applied "analyze-button" class to style the Analyze button */}
          <button className="analyze-button" onClick={handleAnalyze}>Analyze</button>
        </div>
      )}
 
      {chartData && (
        <div className="chart-container">
          <Scatter
            key={JSON.stringify(chartData)} // Force re-render when chartData changes
            data={chartData}
            options={{
              scales: {
                x: { beginAtZero: true, title: { display: true, text: xColumn } },
                y: { beginAtZero: true, title: { display: true, text: yColumn } },
              },
            }}
          />
        </div>
      )}
    </div>
    
    </>
    
  );
 
};
 
export default MLR;
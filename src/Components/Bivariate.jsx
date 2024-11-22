import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Bivariate.css';
import NavBars from './NavBars';
 
function Bivariate() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };
 
  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const columnNames = jsonData[0];
        setColumns(columnNames);
      };
      reader.readAsArrayBuffer(file);
    }
  };
 
  const handleXColumnChange = (e) => {
    setXColumn(e.target.value);
    if (e.target.value && yColumn) setShowAnalyzeButton(true);
  };
 
  const handleYColumnChange = (e) => {
    setYColumn(e.target.value);
    if (xColumn && e.target.value) setShowAnalyzeButton(true);
  };
 
  return (

    <>
    <NavBars/>

    <div className='bodybi'>
      <div className="container-bi">
        <h1 className='h1bi'>Bivariate Analysis Tool</h1>
 
        {/* File Upload Section */}
        <div className="file-upload-section">
          <label htmlFor="file-upload" className="upload-button">
            Choose File
            <input
              id="file-upload"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
 
          {/* Display File Name */}
          <span className="file-name">
            {fileName || "No file chosen"}
          </span>
 
          {/* Upload Button */}
          <button className='upload-button' onClick={handleUpload}>Upload</button>
        </div>
 
        {/* Columns Selection Section */}
        {columns.length > 0 && (
          <div>
            <h2 className='h2bi'>Select Columns for Bivariate Analysis:</h2>
 
            <label className='labelbi'>
              Independent Variable (X):
              <select className='selectbi' value={xColumn} onChange={handleXColumnChange}>
                <option value="" disabled>Select a column</option>
                {columns.map((column, index) => (
                  <option key={index} value={column}>{column}</option>
                ))}
              </select>
            </label>
 
            <label className='labelbi'>
              Dependent Variable (Y):
              <select className='selectbi' value={yColumn} onChange={handleYColumnChange}>
                <option value="" disabled>Select a column</option>
                {columns.map((column, index) => (
                  <option key={index} value={column}>{column}</option>
                ))}
              </select>
            </label>
 
            {/* Analyze Button */}
            {showAnalyzeButton && (
              <button className='analyze-button'>Analyze</button>
            )}
          </div>
        )}
      </div>
    </div>
    
    </>
    
  );
}
 
export default Bivariate;
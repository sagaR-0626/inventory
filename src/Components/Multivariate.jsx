import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Multivariate.css';
import { NavLink } from 'react-router-dom';
import NavBars from './NavBars';
 
function Multivariate() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [selectedXColumns, setSelectedXColumns] = useState([]);
  const [selectedYColumn, setSelectedYColumn] = useState('');
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
 
  const handleXChange = (column) => {
    setSelectedXColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };
 
  const handleYChange = (e) => {
    setSelectedYColumn(e.target.value);
  };
 
  return (
       
    <>
    <NavBars/>

    <div className='body-mul'>
 
     <div className='container-mul'>
      <h1 className='h1mul'>Multivariate Analysis Tool</h1>
     
      <div className="file-upload-wrapper">
        <label htmlFor="file-input" className="file-label">Choose File</label>
        <input
          type="file"
          accept=".xlsx"
          id="file-input"
          onChange={handleFileChange}
          className="file-input"
        />
        <span className="file-name">{file ? file.name : 'No file chosen'}</span>
        <button onClick={handleUpload} className="upload-button-mul">Upload</button>
      </div>
 
      {columns.length > 0 && (
        <div>
          <h2 className='h2mul'>Select Columns for Multivariate Analysis:</h2>
          <div className="flex-container">
            <div className="x-variables">
              <h3>Independent Variables (X):</h3>
              <div className="x-checkbox-container">
                {columns.map((column, index) => (
                  <label className='labelmul' key={index}>
                    <input
                      type="checkbox"
                      checked={selectedXColumns.includes(column)}
                      onChange={() => handleXChange(column)}
                    />
                    {column}
                  </label>
                ))}
              </div>
            </div>
 
            <div className="y-variables">
              <h3>Dependent Variable (Y):</h3>
              <select value={selectedYColumn} onChange={handleYChange} className="select-box-mul">
                <option value="" disabled>Select a column</option>
                {columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="analyze-button-mul">Analyze</button>
        </div>
      )}
     </div>
 
     </div>

    </>
 
     
   
  );
}
 
export default Multivariate;
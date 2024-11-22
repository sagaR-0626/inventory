import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Univariate.css';
import NavBars from './NavBars';
 
function Univariate() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
 
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
 
  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };
 
  const analyzeData = async () => {
    if (!file || !selectedColumn) return;
 
    const formData = new FormData();
    formData.append('file', file);
    formData.append('column', selectedColumn);
 
    try {
      const response = await fetch('http://localhost:5000/api/univariate-analysis', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        setAnalysisResult(result);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error analyzing data:", error);
    }
  };
 
  return (


    <>
    <NavBars/>
    <div className='body-uni'>

     <div className='container-uni'>
      <h1 className='h1-div-uni'>Univariate Analysis Tool</h1>
     
      <div className="file-upload-wrapper-uni">
        <label htmlFor="file-input" className="file-label">Choose File</label>
        <input
          type="file"
          accept=".xlsx"
          id="file-input"
          onChange={handleFileChange}
          className="file-input"
        />
        <span className="file-name-uni">{file ? file.name : 'No file chosen'}</span>
        <button className='button-uni' onClick={handleUpload}>Upload</button>
      </div>
 
      {columns.length > 0 && (
        <div className='column-select-wrapper-uni'>
          <h2 className='h2-div-uni'>Select a column:</h2>
          <select className='select-uni' value={selectedColumn} onChange={handleColumnChange}>
            <option value="" disabled>Select a column</option>
            {columns.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))}
          </select>
          <button className="analyze-button-uni" onClick={analyzeData}>Analyze</button>
        </div>
      )}
 
      {analysisResult && (
        <div className="result-container-uni">
          <h2>Analysis Results</h2>
          <p>Mean: {analysisResult.stats.mean}</p>
          <p>Median: {analysisResult.stats.median}</p>
          <p>Mode: {analysisResult.stats.mode}</p>
          <p>Std Dev: {analysisResult.stats.std_dev}</p>
          <p>Variance: {analysisResult.stats.variance}</p>
 
          <div>
            <h3>Histogram</h3>
            <img src={`data:image/png;base64,${analysisResult.images.histogram}`} alt="Histogram" />
          </div>
 
          <div>
            <h3>Boxplot</h3>
            <img src={`data:image/png;base64,${analysisResult.images.boxplot}`} alt="Boxplot" />
          </div>
        </div>
      )}
     </div>

    </div>
    
    </>
    
    
  );
}
 
export default Univariate;
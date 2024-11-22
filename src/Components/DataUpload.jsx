import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import './DataUpload.css';
import NavBars from './NavBars';
import Papa from 'papaparse';
 
const DataUpload = () => {
  const [fileData, setFileData] = useState([]);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
 
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setFileName(file.name);
 
      // Check for file type
      const isCSV = file.type === 'text/csv';
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
 
      if (!isCSV && !isXLSX) {
        setError('Unsupported file format. Please upload a CSV or XLSX file.');
        return;
      }
 
      // Process CSV files with PapaParse
      if (isCSV) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setFileData(result.data);
            setError('');
          },
          error: (err) => setError(`Error parsing CSV file: ${err.message}`)
        });
      }
 
      // Process XLSX files with xlsx library
      if (isXLSX) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
 
          // Convert sheet data to JSON
          const headers = sheetData[0];
          const rows = sheetData.slice(1);
          const jsonData = rows.map((row) =>
            headers.reduce((acc, header, i) => {
              acc[header] = row[i];
              return acc;
            }, {})
          );
          setFileData(jsonData);
          setError('');
        };
        reader.readAsArrayBuffer(file);
      }
    }
 
    if (rejectedFiles.length) {
      setError('Unsupported file format. Please upload a CSV or XLSX file.');
    }
  };
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['.csv', '.xlsx'],
  });
 
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onDrop([file], []);
  };
 
  const handleSubmit = () => {
    alert('Data submitted successfully!');
    // Submit fileData or other actions here
  };
 
  return (
<>
<NavBars />
<div className="page-wrapper">
<div className="upload-container">
<h2>Data Upload</h2>
 
          <div {...getRootProps()} className="dropzone">
<input {...getInputProps()} />
<button onClick={(e) => e.preventDefault()} className="dropzone-button">
<FaFileUpload className="icon" />
              {fileName ? fileName : "Select File or Drag and Drop Here"}
</button>
</div>
 
          {error && <p className="error-text">{error}</p>}
 
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="file-upload"
          />
 
          <button className="submit-button" onClick={handleSubmit}>
            Submit Data
</button>
</div>
 
        <div className="data-preview">
          {fileData.length > 0 && (
<div>
<h3>Data Preview (First 5 Rows)</h3>
<table className="data-table">
<thead>
<tr>
                    {Object.keys(fileData[0]).map((col, idx) => (
<th key={idx}>{col}</th>
                    ))}
</tr>
</thead>
<tbody>
                  {fileData.slice(0, 5).map((row, rowIndex) => (
<tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
<td key={cellIndex}>{cell}</td>
                      ))}
</tr>
                  ))}
</tbody>
</table>
</div>
          )}
</div>
</div>
</>
  );
};
 
export default DataUpload;
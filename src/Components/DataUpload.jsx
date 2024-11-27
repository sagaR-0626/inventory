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
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility after submit

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

  // Toggle modal visibility after submit
  const handleSubmit = () => {
    if (fileData.length > 0) {
      setShowModal(true); // Show modal after submit
    } else {
      setError('No data to display. Please upload a file first.');
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBars />
      <div
        className="page-wrapper"
        style={{
          backgroundImage: `url('/assets/im data2.jpg')`, // Correct path to the image in the public folder
        }}
      >
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

        {/* Modal to show grid after submit */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-modal" onClick={closeModal}>&times;</span>
              <h3>Data Preview</h3>
              <div className="grid-container">
                {Object.keys(fileData[0]).map((col, idx) => (
                  <div key={idx} className="grid-header">{col}</div>
                ))}
                {fileData.slice(0, 5).map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <div key={cellIndex} className="grid-item">{cell}</div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataUpload;

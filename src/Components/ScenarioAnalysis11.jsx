import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import NavBars from './NavBars';
import { useNavigate } from 'react-router-dom';

const ScenarioAnalysis11 = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileUploaded(true);
      setFileName(file.name);
      // Additional file processing logic can be added here
    }
  };

  const handleClick1 = () => {
    navigate('/demandfluctuation');
  };

  return (
    <>
    <NavBars/>
    
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 80px)" 
        textAlign="center"
        mt={2} // Add margin-top to avoid overlap with navbar
      >
        <Typography variant="h4" gutterBottom>
          Scenario Analysis
        </Typography>
        
        <Box mt={2}>
          {/* Styled File Upload */}
          <input
            type="file"
            id="file-input"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span" color="primary">
              Upload File
            </Button>
          </label>
          {fileName && (
            <Typography variant="body1" mt={2}>
              File Uploaded: {fileName}
            </Typography>
          )}
        </Box>

        {fileUploaded && (
          <Box mt={4}>
            {/* Show buttons only after file is uploaded */}
            <Button variant="contained" color="primary" sx={{ mx: 1 }} onClick={handleClick1} >
              Demand Fluctuation
            </Button>
            <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
              Base Case Scenario
            </Button>
          </Box>
        )}
      </Box>
    
    
    </>
    
  );
};

export default ScenarioAnalysis11;

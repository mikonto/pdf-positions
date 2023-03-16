import React, { useState } from "react";
import "./App.css";
import PdfViewer from "./PdfViewer";
import { Container, Grid, TextField, Button } from "@mui/material";
import logo from "./logo.png";

function App() {
  const [positionNumber, setPositionNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const handleNumberChange = (event) => {
    setPositionNumber(event.target.value);
  };

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setAnnotations([]); // Clear annotations when a new file is uploaded
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="logo-placeholder">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="upload-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="pdf-file-input"
            />
  
            <TextField
              // label="Position Number"
              type="number"
              variant="outlined"
              size="small"
              margin="dense"
              value={positionNumber}
              onChange={handleNumberChange}
              className="position-number-field"
              style={{ width: "20%", margin: "0" }} // Set the width of the container element and add left margin
              InputProps={{
                style: {
                  height: 37, // Adjust the height to match the Upload PDF button
                  padding: "0",
                },
              }}
            />
            <label htmlFor="pdf-file-input">
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{
                  backgroundColor: "white",
                  color: "rgba(0, 122, 255)",
                  marginLeft: '20px',
                }}
              >
                Upload PDF
              </Button>
            </label>
          </div>
        </div>
      </div>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PdfViewer
              positionNumber={positionNumber}
              pdfFile={pdfFile}
              annotations={annotations}
              setAnnotations={setAnnotations}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
  
  
}

export default App;

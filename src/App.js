import React, { useState } from "react";
import "./App.css";
import PdfViewer from "./PdfViewer";
import DataTable from "./DataTable";
import { Grid, TextField, Button } from "@mui/material";
import logo from "./logo.png";
import { Box } from '@mui/material';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [annotations, setAnnotations] = useState([
    {
      id: 1,
      pageIndex: 0,
      x: 119,
      y: 578,
      scale: { width: 792, height: 612 },
      number: 1,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);

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
      <Box m={1}> {/* Add a Box component with margin */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '1rem' }}>
              <div style={{ flexGrow: 1, flexBasis: '40%', minWidth: '40%', maxWidth: '40%' }}>
                <DataTable
                  annotations={annotations}
                  setAnnotations={setAnnotations}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                />
              </div>
              <div style={{ flexGrow: 2, flexBasis: '59%', minWidth: '59%', maxWidth: '59%' }}>
                <div className="pdf-viewer-container">
                  <PdfViewer
                    pdfFile={pdfFile}
                    annotations={annotations}
                    setAnnotations={setAnnotations}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;

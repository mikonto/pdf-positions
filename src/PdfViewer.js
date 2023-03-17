import React, { useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './PdfViewer.css';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const PdfViewer = ({ pdfFile, annotations, setAnnotations, selectedRow, setSelectedRow }) => {
  const [numPages, setNumPages] = React.useState(null);
  const matches = useMediaQuery('(min-width:600px)');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleClick = useCallback(
    (event, pageIndex) => {
      const { offsetX, offsetY, target } = event.nativeEvent;
      const { width, height } = target.getBoundingClientRect();
      const margin = 10;

      if (
        offsetX >= margin &&
        offsetX <= width - margin &&
        offsetY >= margin &&
        offsetY <= height - margin
      ) {
        const clickedAnnotationIndex = annotations.findIndex(
          (annotation) =>
            annotation.pageIndex === pageIndex &&
            Math.abs(annotation.x - offsetX) <= 10 &&
            Math.abs(annotation.y - offsetY) <= 10
        );

        if (clickedAnnotationIndex !== -1) {
          setAnnotations((prevAnnotations) =>
            prevAnnotations.filter((_, index) => index !== clickedAnnotationIndex)
          );
        } else if (selectedRow) {
          setAnnotations((prevAnnotations) => [
            ...prevAnnotations,
            {
              pageIndex,
              x: offsetX,
              y: offsetY,
              scale: {
                width: width,
                height: height,
              },
              number: selectedRow.position,
            },
          ]);
          setSelectedRow(null);
        }
      }
    },
    [annotations, setAnnotations, selectedRow, setSelectedRow]
  );

  return (
    <Box className="pdf-viewer">
      {pdfFile && (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <div key={`page_${index + 1}`} className="pdf-page-container">
              <Page
                className="pdf-page"
                onClick={(event) => handleClick(event, index)}
                pageIndex={index}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                style={{ width: "100%" }}
              />

              <div className="pdf-annotations">
                {annotations.map(
                  (annotation) =>
                    annotation.pageIndex === index && (
                      <div
                        key={`${annotation.x}_${annotation.y}`}
                        className="pdf-annotation"
                        style={{ left: annotation.x, top: annotation.y }}
                      >
                        {annotation.number}
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </Document>
      )}
    </Box>
  );
};

export default PdfViewer;

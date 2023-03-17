import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DataTable = ({ annotations, setAnnotations, selectedRow, setSelectedRow }) => {
  const [rows, setRows] = useState([
    { id: 1, number: 1, parentMaterials: 'Material', position: 1 },
  ]);

  const columns = [
    { field: 'number', headerName: 'Number', width: 100, editable: true },
    {
      field: 'parentMaterials',
      headerName: 'Parent Materials',
      width: 250,
      editable: true,
    },
    { field: 'position', headerName: 'Position', width: 100, editable: true },
    {
      field: 'addPosition',
      headerName: 'Add Position',
      width: 130,
      renderCell: (params) => {
        return selectedRow && selectedRow.id === params.row.id ? (
          <span>Choose location</span>
        ) : (
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              setSelectedRow(params.row);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        );
      },
    },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 100,
      renderCell: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => handleRemoveRow(params.row.id)}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleAddRow = () => {
    const maxNumber = rows.reduce((max, row) => Math.max(max, row.number), 0);
  
    const newRow = {
      id: Date.now(),
      number: maxNumber + 1,
      parentMaterials: 'Material',
      position: '',
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };
  

  const handleRemoveRow = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          style={{ backgroundColor: 'white', color: 'rgba(0, 122, 255)' }}
        >
          Add
        </Button>
      </Grid>
      <Grid item>
        <div style={{ height: 400, width: '100%', maxWidth: '800px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            hideFooterPagination
            hideFooterRowCount
            hideFooterSelectedRowCount
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default DataTable;

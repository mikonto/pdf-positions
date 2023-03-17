import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';

const DataTable = () => {
    const [rows, setRows] = useState([
        { id: 1, number: 1, parentMaterials: 'Material A', position: '1' },
      ]);
      

  const columns = [
    { field: 'number', headerName: 'Number', width: 200, editable: true },
    {
      field: 'parentMaterials',
      headerName: 'Parent Materials',
      width: 250,
      editable: true,
    },
    { field: 'position', headerName: 'Position', width: 200, editable: true },
  ];

const handleAddRow = () => {
  const newRow = {
    id: Date.now(),
    number: '',
    parentMaterials: '',
    position: '',
  };
  setRows((prevRows) => [...prevRows, newRow]);
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
        <div style={{ height: 400, width: '100%' }}>
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

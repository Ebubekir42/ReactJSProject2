import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { DataGridPro } from '@mui/x-data-grid-pro';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {field: 'status', headerName: 'Status', type: 'singleSelect',width:120, valueOptions:["A","P"], },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },
  { id: 1, lastName: 'Snow',status:'A', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',status:'A', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',status:'A', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',status:'A', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',status:'A', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',status:'A', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',status:'A', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',status:'A', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',status:'A', firstName: 'Harvey', age: 65 },

];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
        {/* <DataGridPro rows={rows} columns={columns} pagination={true} /> */}
      <DataGrid
        rows={rows}
        columns={columns}
        
        disableColumnMenu
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

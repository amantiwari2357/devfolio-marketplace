import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowParams,
} from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  onRowClick?: (params: GridRowParams) => void;
  pageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  loading = false,
  onRowClick,
  pageSize = 10,
}) => {
  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          onRowClick={onRowClick}
          getRowId={(row) => row._id || row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>
    </Paper>
  );
};

export default DataTable;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  project: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchEnquiries = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      params.append('page', currentPage.toString());
      params.append('limit', '10');

      const response = await api.get(`/enquiries?${params}`);
      setEnquiries(response.data.data.enquiries);
      setTotalPages(response.data.data.totalPages);
    } catch (error: any) {
      console.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh enquiries every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEnquiries();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchEnquiries();
  }, [currentPage, statusFilter]);

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await api.put(`/enquiries/${enquiryId}/status`, { status: newStatus });
      console.log('Enquiry status updated successfully');
      fetchEnquiries();
    } catch (error: any) {
      console.error('Failed to update enquiry status');
    }
  };

  const handleDelete = async (enquiryId: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await api.delete(`/enquiries/${enquiryId}`);
      console.log('Enquiry deleted successfully');
      fetchEnquiries();
    } catch (error: any) {
      console.error('Failed to delete enquiry');
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'project',
      headerName: 'Project',
      width: 200,
      valueGetter: (params) => params.row.project?.title || 'N/A'
    },
    {
      field: 'message',
      headerName: 'Message',
      width: 300,
      renderCell: (params) => (
        <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={params.value}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <select
          value={params.value}
          onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
          style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="pending">Pending</option>
          <option value="responded">Responded</option>
          <option value="closed">Closed</option>
        </select>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.row._id)}
          color="error"
          size="small"
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = enquiries.map((enquiry) => ({
    ...enquiry,
    id: enquiry._id,
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Enquiries Management</Typography>
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="responded">Responded</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </TextField>
      </Box>

      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
      />
    </Box>
  );
};

export default Enquiries;

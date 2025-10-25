import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import api from '../services/api';
import { toast } from 'sonner';

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
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [currentPage, statusFilter]);

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await api.put(`/enquiries/${enquiryId}/status`, { status: newStatus });
      toast.success('Enquiry status updated successfully');
      fetchEnquiries();
    } catch (error: any) {
      toast.error('Failed to update enquiry status');
    }
  };

  const handleDelete = async (enquiryId: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await api.delete(`/enquiries/${enquiryId}`);
      toast.success('Enquiry deleted successfully');
      fetchEnquiries();
    } catch (error: any) {
      toast.error('Failed to delete enquiry');
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (enquiry: Enquiry) => enquiry.name,
    },
    {
      key: 'email',
      header: 'Email',
      render: (enquiry: Enquiry) => enquiry.email,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (enquiry: Enquiry) => enquiry.phone,
    },
    {
      key: 'project',
      header: 'Project',
      render: (enquiry: Enquiry) => enquiry.project.title,
    },
    {
      key: 'message',
      header: 'Message',
      render: (enquiry: Enquiry) => (
        <div className="max-w-xs truncate" title={enquiry.message}>
          {enquiry.message}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (enquiry: Enquiry) => (
        <select
          value={enquiry.status}
          onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
          className="px-2 py-1 border rounded text-sm"
        >
          <option value="pending">Pending</option>
          <option value="responded">Responded</option>
          <option value="closed">Closed</option>
        </select>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (enquiry: Enquiry) => new Date(enquiry.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (enquiry: Enquiry) => (
        <button
          onClick={() => handleDelete(enquiry._id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Enquiries</h1>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <DataTable
        data={enquiries}
        columns={columns}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Enquiries;

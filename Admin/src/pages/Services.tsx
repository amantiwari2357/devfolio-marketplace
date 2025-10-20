import React from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface ServiceForm {
  title: string;
  description: string;
  category: string;
  price: {
    amount: number;
    currency: string;
    billingCycle: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'project';
  };
  features: string[];
  deliverables: string[];
  timeline: string;
  requirements: string[];
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailableDate?: string;
  };
  status: 'active' | 'inactive' | 'archived';
}

const Services = () => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceForm>();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueGetter: (params) =>
        `${params.value.amount} ${params.value.currency}/${params.value.billingCycle}`,
    },
    {
      field: 'availability',
      headerName: 'Availability',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value.status}
          color={
            params.value.status === 'available'
              ? 'success'
              : params.value.status === 'busy'
              ? 'warning'
              : 'error'
          }
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'active'
              ? 'success'
              : params.value === 'inactive'
              ? 'warning'
              : 'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      valueFormatter: (params) =>
        params.value ? params.value.toFixed(1) : 'N/A',
    },
    {
      field: 'provider',
      headerName: 'Provider',
      width: 200,
      valueGetter: (params) =>
        params.value
          ? `${params.value.firstName} ${params.value.lastName}`
          : 'N/A',
    },
  ];

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const handleOpen = (service?: any) => {
    if (service) {
      setSelectedService(service);
      reset({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        features: service.features,
        deliverables: service.deliverables,
        timeline: service.timeline,
        requirements: service.requirements,
        availability: service.availability,
        status: service.status,
      });
    } else {
      setSelectedService(null);
      reset({
        title: '',
        description: '',
        category: '',
        price: {
          amount: 0,
          currency: 'USD',
          billingCycle: 'hourly',
        },
        features: [],
        deliverables: [],
        timeline: '',
        requirements: [],
        availability: {
          status: 'available',
        },
        status: 'active',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
    reset();
  };

  const onSubmit = async (data: ServiceForm) => {
    try {
      if (selectedService) {
        await api.put(`/services/${selectedService.id}`, data);
      } else {
        await api.post('/services', data);
      }
      fetchServices();
      handleClose();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Services Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Service
        </Button>
      </Box>

      <DataTable
        rows={services}
        columns={columns}
        loading={loading}
        onRowClick={(params) => handleOpen(params.row)}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedService ? 'Edit Service' : 'Add New Service'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price Amount"
                  {...register('price.amount', {
                    required: 'Price amount is required',
                    min: {
                      value: 0,
                      message: 'Price must be positive',
                    },
                  })}
                  error={!!errors.price?.amount}
                  helperText={errors.price?.amount?.message}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  label="Currency"
                  {...register('price.currency')}
                  defaultValue="USD"
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  select
                  label="Billing Cycle"
                  {...register('price.billingCycle')}
                >
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="project">Project</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Features"
                  placeholder="Enter features separated by new lines"
                  {...register('features')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Deliverables"
                  placeholder="Enter deliverables separated by new lines"
                  {...register('deliverables')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Timeline"
                  {...register('timeline', {
                    required: 'Timeline is required',
                  })}
                  error={!!errors.timeline}
                  helperText={errors.timeline?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Requirements"
                  placeholder="Enter requirements separated by new lines"
                  {...register('requirements')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Availability Status"
                  {...register('availability.status')}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Next Available Date"
                  InputLabelProps={{ shrink: true }}
                  {...register('availability.nextAvailableDate')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  {...register('status')}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedService ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Services;

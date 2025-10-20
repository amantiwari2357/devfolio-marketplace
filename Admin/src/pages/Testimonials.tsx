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
  Rating,
  Avatar,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface TestimonialForm {
  content: string;
  rating: number;
  type: 'project' | 'course' | 'service';
  relatedItem: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialForm>();

  const columns: GridColDef[] = [
    {
      field: 'author',
      headerName: 'Author',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={params.value.profileImage}>
            {params.value.firstName[0]}
          </Avatar>
          <Typography>
            {params.value.firstName} {params.value.lastName}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 150,
      renderCell: (params) => (
        <Rating value={params.value} readOnly size="small" />
      ),
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 300,
      renderCell: (params) => (
        <Typography noWrap>{params.value}</Typography>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="primary"
          variant="outlined"
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
            params.value === 'approved'
              ? 'success'
              : params.value === 'pending'
              ? 'warning'
              : 'error'
          }
          size="small"
        />
      ),
    },
    {
      field: 'featured',
      headerName: 'Featured',
      width: 120,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFeatured(params.row.id);
          }}
        >
          {params.value ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
  ];

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials');
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleFeatured = async (id: string) => {
    try {
      await api.patch(`/testimonials/${id}/featured`);
      fetchTestimonials();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const handleOpen = (testimonial?: any) => {
    if (testimonial) {
      setSelectedTestimonial(testimonial);
      reset({
        content: testimonial.content,
        rating: testimonial.rating,
        type: testimonial.type,
        relatedItem: testimonial.relatedItem,
        status: testimonial.status,
        featured: testimonial.featured,
      });
    } else {
      setSelectedTestimonial(null);
      reset({
        content: '',
        rating: 5,
        type: 'project',
        relatedItem: '',
        status: 'pending',
        featured: false,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTestimonial(null);
    reset();
  };

  const onSubmit = async (data: TestimonialForm) => {
    try {
      if (selectedTestimonial) {
        await api.put(`/testimonials/${selectedTestimonial.id}`, data);
      } else {
        await api.post('/testimonials', data);
      }
      fetchTestimonials();
      handleClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
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
        <Typography variant="h4">Testimonials Management</Typography>
      </Box>

      <DataTable
        rows={testimonials}
        columns={columns}
        loading={loading}
        onRowClick={(params) => handleOpen(params.row)}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Content"
                  {...register('content', {
                    required: 'Content is required',
                    minLength: {
                      value: 10,
                      message: 'Content must be at least 10 characters',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Content must not exceed 1000 characters',
                    },
                  })}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    value={watch('rating')}
                    onChange={(_, value) => setValue('rating', value || 0)}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  {...register('type', {
                    required: 'Type is required',
                  })}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  <MenuItem value="project">Project</MenuItem>
                  <MenuItem value="course">Course</MenuItem>
                  <MenuItem value="service">Service</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Related Item ID"
                  {...register('relatedItem', {
                    required: 'Related item is required',
                  })}
                  error={!!errors.relatedItem}
                  helperText={errors.relatedItem?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  {...register('status', {
                    required: 'Status is required',
                  })}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedTestimonial ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Testimonials;

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
  Avatar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface ExpertForm {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  skills: string[];
  profileImage?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailableDate?: string;
  };
}

const Experts = () => {
  const [experts, setExperts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedExpert, setSelectedExpert] = React.useState<any>(null);
  const [stats, setStats] = React.useState<any>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpertForm>();

  const columns: GridColDef[] = [
    {
      field: 'profileImage',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.firstName}>
          {params.row.firstName[0]}
        </Avatar>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName} ${params.row.lastName}`,
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'skills',
      headerName: 'Skills',
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {params.value.slice(0, 3).map((skill: string) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
          {params.value.length > 3 && (
            <Chip label={`+${params.value.length - 3}`} size="small" />
          )}
        </Box>
      ),
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
      field: 'stats',
      headerName: 'Statistics',
      width: 200,
      valueGetter: (params) => {
        const expertStats = stats[params.row.id] || {};
        return `${expertStats.projects || 0} Projects, ${
          expertStats.courses || 0
        } Courses`;
      },
    },
  ];

  const fetchExperts = async () => {
    try {
      const [expertsResponse, statsResponse] = await Promise.all([
        api.get('/users?role=expert'),
        api.get('/experts/stats'),
      ]);
      setExperts(expertsResponse.data.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchExperts();
  }, []);

  const handleOpen = (expert?: any) => {
    if (expert) {
      setSelectedExpert(expert);
      reset({
        firstName: expert.firstName,
        lastName: expert.lastName,
        email: expert.email,
        bio: expert.bio,
        skills: expert.skills,
        profileImage: expert.profileImage,
        socialLinks: expert.socialLinks,
        availability: expert.availability,
      });
    } else {
      setSelectedExpert(null);
      reset({
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        skills: [],
        socialLinks: {},
        availability: {
          status: 'available',
        },
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExpert(null);
    reset();
  };

  const onSubmit = async (data: ExpertForm) => {
    try {
      if (selectedExpert) {
        await api.put(`/users/${selectedExpert.id}`, {
          ...data,
          role: 'expert',
        });
      } else {
        await api.post('/users', {
          ...data,
          role: 'expert',
        });
      }
      fetchExperts();
      handleClose();
    } catch (error) {
      console.error('Error saving expert:', error);
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
        <Typography variant="h4">Experts Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Expert
        </Button>
      </Box>

      <DataTable
        rows={experts}
        columns={columns}
        loading={loading}
        onRowClick={(params) => handleOpen(params.row)}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedExpert ? 'Edit Expert' : 'Add New Expert'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  {...register('bio', {
                    required: 'Bio is required',
                    maxLength: {
                      value: 500,
                      message: 'Bio must not exceed 500 characters',
                    },
                  })}
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills"
                  placeholder="Enter skills separated by commas"
                  {...register('skills')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profile Image URL"
                  {...register('profileImage')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  {...register('socialLinks.linkedin')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="GitHub URL"
                  {...register('socialLinks.github')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Twitter URL"
                  {...register('socialLinks.twitter')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Website URL"
                  {...register('socialLinks.website')}
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedExpert ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Experts;

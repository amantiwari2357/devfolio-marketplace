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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface ProjectForm {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  technologies: string;
  features: string;
  status: 'draft' | 'published' | 'archived';
}

const Projects = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectForm>();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      valueFormatter: (params) => `$${params.value}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'published'
              ? 'success'
              : params.value === 'draft'
              ? 'warning'
              : 'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'downloads',
      headerName: 'Downloads',
      width: 120,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      valueFormatter: (params) =>
        params.value ? params.value.toFixed(1) : 'N/A',
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 200,
      valueGetter: (params) =>
        params.value
          ? `${params.value.firstName} ${params.value.lastName}`
          : 'N/A',
    },
  ];

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data.map((p: any) => ({ ...p, id: p._id })));
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = React.useMemo(() => {
    if (!searchTerm) return projects;
    return projects.filter((project: any) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const handleOpen = (project?: any) => {
    if (project) {
      setSelectedProject(project);
      reset({
        title: project.title,
        description: project.description,
        thumbnail: project.thumbnail,
        category: project.category,
        price: project.price,
        technologies: project.technologies?.join(', ') || '',
        features: project.features?.join('\n') || '',
        status: project.status,
      });
    } else {
      setSelectedProject(null);
      reset({
        title: '',
        description: '',
        thumbnail: '',
        category: '',
        price: 0,
        technologies: '',
        features: '',
        status: 'draft',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
    reset();
  };

  const onSubmit = async (data: ProjectForm) => {
    try {
      if (selectedProject) {
        await api.put(`/projects/${selectedProject.id}`, data);
      } else {
        await api.post('/projects', data);
      }
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error);
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
        <Typography variant="h4">Projects Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Project
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search projects by title or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
      </Box>

      <DataTable
        rows={filteredProjects}
        columns={columns}
        loading={loading}
        onRowClick={(params) => handleOpen(params.row)}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProject ? 'Edit Project' : 'Add New Project'}
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
                  label="Thumbnail URL"
                  placeholder="https://example.com/image.jpg"
                  {...register('thumbnail', {
                    required: 'Thumbnail is required',
                  })}
                  error={!!errors.thumbnail}
                  helperText={errors.thumbnail?.message}
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

              <Grid item xs={6}>
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

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  {...register('price', {
                    required: 'Price is required',
                    min: {
                      value: 0,
                      message: 'Price must be positive',
                    },
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Technologies"
                  placeholder="Enter technologies separated by commas"
                  {...register('technologies')}
                />
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
                  select
                  label="Status"
                  {...register('status', {
                    required: 'Status is required',
                  })}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedProject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Projects;

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
import { useForm, useFieldArray } from 'react-hook-form';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface CourseForm {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  chapters: Array<{
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
  }>;
  status: 'draft' | 'published' | 'archived';
}

const Courses = () => {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<any>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  });

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
      field: 'level',
      headerName: 'Level',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'beginner'
              ? 'success'
              : params.value === 'intermediate'
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
      field: 'enrollments',
      headerName: 'Enrollments',
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
      field: 'instructor',
      headerName: 'Instructor',
      width: 200,
      valueGetter: (params) =>
        params.value
          ? `${params.value.firstName} ${params.value.lastName}`
          : 'N/A',
    },
  ];

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpen = (course?: any) => {
    if (course) {
      setSelectedCourse(course);
      reset({
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        price: course.price,
        duration: course.duration,
        level: course.level,
        category: course.category,
        tags: course.tags,
        chapters: course.chapters,
        status: course.status,
      });
    } else {
      setSelectedCourse(null);
      reset({
        title: '',
        description: '',
        thumbnail: '',
        price: 0,
        duration: '',
        level: 'beginner',
        category: '',
        tags: [],
        chapters: [],
        status: 'draft',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
    reset();
  };

  const onSubmit = async (data: CourseForm) => {
    try {
      if (selectedCourse) {
        await api.put(`/courses/${selectedCourse.id}`, data);
      } else {
        await api.post('/courses', data);
      }
      fetchCourses();
      handleClose();
    } catch (error) {
      console.error('Error saving course:', error);
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
        <Typography variant="h4">Courses Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Course
        </Button>
      </Box>

      <DataTable
        rows={courses}
        columns={columns}
        loading={loading}
        onRowClick={(params) => handleOpen(params.row)}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCourse ? 'Edit Course' : 'Add New Course'}
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
                  label="Thumbnail URL"
                  {...register('thumbnail', {
                    required: 'Thumbnail URL is required',
                  })}
                  error={!!errors.thumbnail}
                  helperText={errors.thumbnail?.message}
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

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  {...register('duration', {
                    required: 'Duration is required',
                  })}
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Level"
                  {...register('level', {
                    required: 'Level is required',
                  })}
                  error={!!errors.level}
                  helperText={errors.level?.message}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </TextField>
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags"
                  placeholder="Enter tags separated by commas"
                  {...register('tags')}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6">Chapters</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() =>
                      append({
                        title: '',
                        description: '',
                        videoUrl: '',
                        duration: 0,
                      })
                    }
                  >
                    Add Chapter
                  </Button>
                </Box>

                <List>
                  {fields.map((field, index) => (
                    <ListItem key={field.id}>
                      <ListItemText
                        primary={
                          <TextField
                            fullWidth
                            label="Chapter Title"
                            {...register(`chapters.${index}.title` as const)}
                          />
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <TextField
                              fullWidth
                              label="Description"
                              {...register(
                                `chapters.${index}.description` as const
                              )}
                              sx={{ mb: 1 }}
                            />
                            <TextField
                              fullWidth
                              label="Video URL"
                              {...register(
                                `chapters.${index}.videoUrl` as const
                              )}
                              sx={{ mb: 1 }}
                            />
                            <TextField
                              type="number"
                              label="Duration (minutes)"
                              {...register(
                                `chapters.${index}.duration` as const
                              )}
                            />
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
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
              {selectedCourse ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Courses;

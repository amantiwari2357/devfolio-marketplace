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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/common/DataTable';
import api from '../services/api';

interface UserForm {
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'expert';
  password?: string;
}

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName} ${params.row.lastName}`,
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'admin'
              ? 'error'
              : params.value === 'expert'
              ? 'warning'
              : 'default'
          }
          size="small"
        />
      ),
    },
    {
      field: 'isVerified',
      headerName: 'Verified',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      valueGetter: (params) =>
        new Date(params.value).toLocaleDateString(),
    },
  ];

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (user?: any) => {
    if (user) {
      setSelectedUser(user);
      reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    } else {
      setSelectedUser(null);
      reset({
        email: '',
        firstName: '',
        lastName: '',
        role: 'user',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    reset();
  };

  const onSubmit = async (data: UserForm) => {
    try {
      if (selectedUser) {
        await api.put(`/users/${selectedUser.id}`, data);
      } else {
        await api.post('/users', data);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
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
        <Typography variant="h4">Users Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
      </Box>

      <DataTable
        rows={users}
        columns={columns}
        loading={loading}
        onRowClick={(params) => handleOpen(params.row)}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
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

            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              {...register('firstName', {
                required: 'First name is required',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              {...register('lastName', {
                required: 'Last name is required',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              fullWidth
              select
              label="Role"
              margin="normal"
              {...register('role', {
                required: 'Role is required',
              })}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="expert">Expert</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            {!selectedUser && (
              <TextField
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedUser ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Users;

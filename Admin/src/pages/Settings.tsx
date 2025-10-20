import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../services/api';

interface SettingsForm {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  defaultUserRole: 'user' | 'expert';
  emailNotifications: boolean;
  currency: string;
  commissionRate: number;
  minWithdrawalAmount: number;
  maxFileSize: number;
  allowedFileTypes: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
}

const Settings = () => {
  const [loading, setLoading] = React.useState(true);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [saveError, setSaveError] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsForm>();

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      reset(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSettings();
  }, []);

  const onSubmit = async (data: SettingsForm) => {
    try {
      await api.put('/settings', data);
      setSaveSuccess(true);
      setSaveError('');
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      setSaveError(error.response?.data?.message || 'Error saving settings');
    }
  };

  if (loading) {
    return <Typography>Loading settings...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      {saveError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {saveError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                {...register('siteName', {
                  required: 'Site name is required',
                })}
                error={!!errors.siteName}
                helperText={errors.siteName?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Description"
                {...register('siteDescription')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                {...register('contactEmail', {
                  required: 'Contact email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Support Email"
                type="email"
                {...register('supportEmail', {
                  required: 'Support email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.supportEmail}
                helperText={errors.supportEmail?.message}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            System Configuration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch {...register('maintenanceMode')} />
                }
                label="Maintenance Mode"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch {...register('registrationEnabled')} />
                }
                label="Enable User Registration"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Default User Role"
                {...register('defaultUserRole')}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch {...register('emailNotifications')} />
                }
                label="Enable Email Notifications"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Currency"
                {...register('currency')}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Commission Rate (%)"
                {...register('commissionRate', {
                  min: {
                    value: 0,
                    message: 'Commission rate must be positive',
                  },
                  max: {
                    value: 100,
                    message: 'Commission rate cannot exceed 100%',
                  },
                })}
                error={!!errors.commissionRate}
                helperText={errors.commissionRate?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Withdrawal Amount"
                {...register('minWithdrawalAmount', {
                  min: {
                    value: 0,
                    message: 'Amount must be positive',
                  },
                })}
                error={!!errors.minWithdrawalAmount}
                helperText={errors.minWithdrawalAmount?.message}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Upload Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Max File Size (MB)"
                {...register('maxFileSize', {
                  min: {
                    value: 1,
                    message: 'File size must be at least 1MB',
                  },
                })}
                error={!!errors.maxFileSize}
                helperText={errors.maxFileSize?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Allowed File Types"
                placeholder="jpg,png,pdf,zip"
                {...register('allowedFileTypes')}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Social Media Links
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook URL"
                {...register('socialLinks.facebook')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter URL"
                {...register('socialLinks.twitter')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                {...register('socialLinks.linkedin')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub URL"
                {...register('socialLinks.github')}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty}
            size="large"
          >
            Save Settings
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Settings;

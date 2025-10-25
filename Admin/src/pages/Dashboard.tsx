import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  Fade,
  Grow,
  Skeleton,
  useTheme,
  List, // Added: For the activity list
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  People,
  Code,
  School,
  BusinessCenter,
  Logout,
  TrendingUp,
  TrendingDown,
  Refresh,
  Dashboard as DashboardIcon,
  Schedule, 
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import api from '../services/api'; // Ensure this path is correct in your project

// Helper to format numbers for better readability (e.g., 10000 -> 10k)
const formatStatValue = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
};

const StatCard = ({ title, value, icon, gradient, trend, trendValue }: any) => (
  <Card
      sx={{
        height: 160,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
        background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 120,
          height: 120,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          opacity: 0.8,
          transition: 'transform 0.5s ease-out',
        },
        '&:hover::before': {
          transform: 'scale(1.2)',
        }
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9, lineHeight: 1.2 }}>
            {title}
          </Typography>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 44, height: 44 }}>
            {icon}
          </Avatar>
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1, letterSpacing: '-1px' }}>
            {formatStatValue(value)}
          </Typography>
          {trend && (
            <Chip
              size="medium"
              icon={trend === 'up' ? <TrendingUp sx={{ fontSize: 18 }} /> : <TrendingDown sx={{ fontSize: 18 }} />}
              label={`${trendValue}% vs last month`}
              sx={{
                bgcolor: trend === 'up' ? 'rgba(76,175,80,0.8)' : 'rgba(244,67,54,0.8)',
                color: 'white',
                fontWeight: 'bold',
                height: 24,
                '& .MuiChip-icon': { color: 'white', ml: 0.5 },
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
);

// New Component: Activity List
const RecentActivityCard = ({ activityData, loading }: any) => (
  <Paper
    sx={{
      p: 4,
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      background: 'white', // Removed the gradient for a cleaner look here
      height: '100%',
    }}
  >
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
      <Schedule sx={{ mr: 1, verticalAlign: 'middle', color: '#667eea' }} />
      Recent Activity Log
    </Typography>
    {loading ? (
      <Box sx={{ p: 1 }}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Skeleton variant="circular" width={10} height={10} sx={{ mr: 2 }} />
            <Skeleton variant="text" width="90%" height={20} />
          </Box>
        ))}
      </Box>
    ) : (
      <List dense sx={{ maxHeight: 250, overflowY: 'auto', pr: 1 }}>
        {activityData.slice(0, 8).map((activity: any, index: number) => ( 
          <ListItem
            key={index}
            disablePadding
            sx={{
              py: 0.5,
              borderBottom: index < activityData.length - 1 ? '1px solid #eee' : 'none',
              transition: 'background-color 0.3s',
              '&:hover': { bgcolor: '#f5f5f5', borderRadius: 1 }
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: activity.color || '#667eea', borderRadius: '50%' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {activity.message}
                </Typography>
              }
              secondary={new Date(activity.timestamp).toLocaleTimeString()}
            />
          </ListItem>
        ))}
        {activityData.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No recent activity recorded.
          </Typography>
        )}
      </List>
    )}
  </Paper>
);

const Dashboard = () => {
  const theme = useTheme();

  const [stats, setStats] = React.useState({
    users: 12450,
    projects: 345,
    courses: 92,
    services: 18,
    recentActivity: [
      { date: 'Mon', value: 15, message: 'New User Registration', timestamp: Date.now() - 43200000, color: '#4caf50' },
      { date: 'Tue', value: 20, message: 'Project "Beta" started', timestamp: Date.now() - 36000000, color: '#2196f3' },
      { date: 'Wed', value: 12, message: 'Course "Testing" launched', timestamp: Date.now() - 28800000, color: '#ff9800' },
      { date: 'Thu', value: 25, message: 'Server patch applied', timestamp: Date.now() - 21600000, color: '#f44336' },
      { date: 'Fri', value: 18, message: 'New API integrated', timestamp: Date.now() - 14400000, color: '#9e9e9e' },
      { date: 'Sat', value: 30, message: 'High User Activity Peak', timestamp: Date.now() - 7200000, color: '#00bcd4' },
      { date: 'Sun', value: 22, message: 'Database optimization done', timestamp: Date.now() - 3600000, color: '#ffc107' },
    ],
    revenue: [
      { month: 'Jan', projects: 4000, courses: 2400, services: 1000 },
      { month: 'Feb', projects: 3000, courses: 1398, services: 2000 },
      { month: 'Mar', projects: 2000, courses: 9800, services: 3500 },
      { month: 'Apr', projects: 2780, courses: 3908, services: 4000 },
      { month: 'May', projects: 1890, courses: 4800, services: 4500 },
      { month: 'Jun', projects: 2390, courses: 3800, services: 5000 },
      { month: 'Jul', projects: 3490, courses: 4300, services: 6000 },
    ],
  });
  const [loading, setLoading] = React.useState(true);
  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchStats();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <People sx={{ fontSize: 28 }} />,
      gradient: ['#667eea', '#764ba2'],
      trend: 'up',
      trendValue: 12.5,
    },
    {
      title: "Active Projects",
      value: stats.projects,
      icon: <Code sx={{ fontSize: 28 }} />,
      gradient: ['#f093fb', '#f5576c'],
      trend: 'up',
      trendValue: 8.2,
    },
    {
      title: "Available Courses",
      value: stats.courses,
      icon: <School sx={{ fontSize: 28 }} />,
      gradient: ['#4facfe', '#00f2fe'],
      trend: 'down',
      trendValue: 3.1,
    },
    {
      title: "Active Services",
      value: stats.services,
      icon: <BusinessCenter sx={{ fontSize: 28 }} />,
      gradient: ['#43e97b', '#38f9d7'],
      trend: 'up',
      trendValue: 15.7,
    },
  ];

  const pieData = [
    { name: 'Projects', value: stats.projects, color: '#f5576c' },
    { name: 'Courses', value: stats.courses, color: '#00f2fe' },
    { name: 'Services', value: stats.services, color: '#38f9d7' },
  ];

  const RADIAN = Math.PI / 180;
  // Custom label for Pie Chart: shows percentage inside the slice
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="14px"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minHeight: '100vh', bgcolor: '#f4f6f9' }}>
        
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'extrabold', mb: 0.5, color: '#333' }}>
              <DashboardIcon sx={{ mr: 2, verticalAlign: 'middle', fontSize: 'inherit', color: theme.palette.primary.main }} />
              Admin Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data last synced: {lastUpdated.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
             <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchStats}
                disabled={loading}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Logout
              </Button>
          </Box>
        </Box>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ mb: 4 }}>
            <LinearProgress sx={{ borderRadius: 1, height: 8 }} color="secondary" />
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Stats Cards */}
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} lg={3} key={card.title}>
              {loading ? (
                <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 3 }} />
              ) : (
                <StatCard {...card} />
              )}
            </Grid>
          ))}

          {/* Revenue Chart */}
          <Grid item xs={12} lg={8}>
            <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'white' // Trailing comma removed here
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                  Monthly Revenue Flow
                </Typography>
                {loading ? (
                  <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={stats.revenue}>
                      <defs>
                         <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f5576c" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f5576c" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38f9d7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#38f9d7" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" tickFormatter={(value) => `$${formatStatValue(value)}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #ddd',
                          borderRadius: 8,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        }}
                        formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Area type="monotone" dataKey="projects" stackId="1" stroke="#f5576c" fillOpacity={1} fill="url(#colorProjects)" />
                      <Area type="monotone" dataKey="courses" stackId="1" stroke="#00f2fe" fillOpacity={1} fill="url(#colorCourses)" />
                      <Area type="monotone" dataKey="services" stackId="1" stroke="#38f9d7" fillOpacity={1} fill="url(#colorServices)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </Paper>
          </Grid>

          {/* Right Column: Distribution & Activity */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={4}>
              
              {/* Distribution Pie Chart */}
              <Grid item xs={12} sm={6} lg={12}>
                <Paper
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      background: 'white',
                      height: '100%'
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Content Distribution
                    </Typography>
                    {loading ? (
                      <Skeleton variant="circular" width={160} height={160} sx={{ m: 'auto', mt: 2 }} />
                    ) : (
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={renderCustomizedLabel}
                            labelLine={false}
                            isAnimationActive={!loading}
                            animationDuration={800} 
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip
                             contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #ddd',
                              borderRadius: 8,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }}
                            formatter={(value: number, name: string) => [value.toLocaleString(), name]}
                          />
                          <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 10 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </Paper>
              </Grid>

              {/* Recent Activity List */}
              <Grid item xs={12} sm={6} lg={12}>
                <RecentActivityCard activityData={stats.recentActivity} loading={loading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default Dashboard;
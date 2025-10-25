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
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import api from '../services/api';

const StatCard = ({ title, value, icon, color, gradient, trend, trendValue }: any) => (
  <Grow in={true} timeout={500}>
    <Card
      sx={{
        height: 160,
        background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        },
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
            {icon}
          </Avatar>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {value}
            </Typography>
            {trend && (
              <Chip
                size="small"
                icon={trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                label={`${trendValue}%`}
                sx={{
                  bgcolor: trend === 'up' ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />
            )}
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.9 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  </Grow>
);

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    users: 0,
    projects: 0,
    courses: 0,
    services: 0,
    recentActivity: [],
    revenue: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  React.useEffect(() => {
    fetchStats();
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
      title: "Total Projects",
      value: stats.projects,
      icon: <Code sx={{ fontSize: 28 }} />,
      gradient: ['#f093fb', '#f5576c'],
      trend: 'up',
      trendValue: 8.2,
    },
    {
      title: "Total Courses",
      value: stats.courses,
      icon: <School sx={{ fontSize: 28 }} />,
      gradient: ['#4facfe', '#00f2fe'],
      trend: 'down',
      trendValue: 3.1,
    },
    {
      title: "Total Services",
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

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              <DashboardIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {lastUpdated.toLocaleString()}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchStats}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Refresh
          </Button>
        </Box>

        {loading && (
          <Box sx={{ mb: 4 }}>
            <LinearProgress sx={{ borderRadius: 1, height: 6 }} />
          </Box>
        )}

        <Grid container spacing={3}>
          {/* Stats Cards */}
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
              {loading ? (
                <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2 }} />
              ) : (
                <StatCard {...card} />
              )}
            </Grid>
          ))}

          {/* Revenue Chart */}
          <Grid item xs={12} lg={8}>
            <Grow in={true} timeout={1000}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                  Revenue Overview
                </Typography>
                {loading ? (
                  <Skeleton variant="rectangular" height={300} />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="projects"
                        stackId="1"
                        stroke="#f5576c"
                        fillOpacity={1}
                        fill="url(#colorProjects)"
                      />
                      <Area
                        type="monotone"
                        dataKey="courses"
                        stackId="1"
                        stroke="#00f2fe"
                        fillOpacity={1}
                        fill="url(#colorCourses)"
                      />
                      <Area
                        type="monotone"
                        dataKey="services"
                        stackId="1"
                        stroke="#38f9d7"
                        fillOpacity={1}
                        fill="url(#colorServices)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </Paper>
            </Grow>
          </Grid>

          {/* Activity Chart & Distribution */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Activity Chart */}
              <Grid item xs={12}>
                <Grow in={true} timeout={1200}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Recent Activity
                    </Typography>
                    {loading ? (
                      <Skeleton variant="rectangular" height={200} />
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={stats.recentActivity}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                          <XAxis dataKey="date" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: 'none',
                              borderRadius: 8,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#667eea"
                            strokeWidth={3}
                            dot={{ fill: '#667eea', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, stroke: '#667eea', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </Paper>
                </Grow>
              </Grid>

              {/* Distribution Pie Chart */}
              <Grid item xs={12}>
                <Grow in={true} timeout={1400}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Content Distribution
                    </Typography>
                    {loading ? (
                      <Skeleton variant="rectangular" height={200} />
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: 'none',
                              borderRadius: 8,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </Paper>
                </Grow>
              </Grid>
            </Grid>
          </Grid>

          {/* Logout Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  minWidth: 200,
                  borderRadius: 3,
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 20px rgba(244,67,54,0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 25px rgba(244,67,54,0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Logout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default Dashboard;

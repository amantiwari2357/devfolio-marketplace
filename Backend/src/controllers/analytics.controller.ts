import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User, Service, Project, Course } from '../models';

export class AnalyticsController {
  // Get user analytics
  getUserAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      const period = req.query.period as string || '7D';

      // Calculate date range
      const now = new Date();
      let startDate: Date;

      switch (period) {
        case '7D':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30D':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '3M':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case '6M':
          startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      // Mock analytics data - in real implementation, this would aggregate from actual data
      const analytics = {
        period,
        profile: {
          views: Math.floor(Math.random() * 100) + 50,
          uniqueVisitors: Math.floor(Math.random() * 50) + 20,
          averageSessionDuration: Math.floor(Math.random() * 300) + 60, // seconds
          bounceRate: Math.floor(Math.random() * 30) + 10 // percentage
        },
        services: {
          totalServices: Math.floor(Math.random() * 10) + 1,
          activeServices: Math.floor(Math.random() * 8) + 1,
          totalBookings: Math.floor(Math.random() * 50) + 10,
          completedBookings: Math.floor(Math.random() * 40) + 5,
          averageRating: (Math.random() * 2 + 3).toFixed(1) // 3.0 - 5.0
        },
        earnings: {
          totalEarnings: Math.floor(Math.random() * 5000) + 1000,
          monthlyEarnings: Math.floor(Math.random() * 1000) + 200,
          pendingPayments: Math.floor(Math.random() * 500) + 50,
          averageBookingValue: Math.floor(Math.random() * 200) + 50
        }
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get profile analytics
  getProfileAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Mock profile analytics
      const analytics = {
        views: Math.floor(Math.random() * 200) + 100,
        uniqueVisitors: Math.floor(Math.random() * 100) + 50,
        topReferrers: [
          { source: 'Direct', count: Math.floor(Math.random() * 50) + 20 },
          { source: 'Google', count: Math.floor(Math.random() * 40) + 15 },
          { source: 'LinkedIn', count: Math.floor(Math.random() * 30) + 10 },
          { source: 'Twitter', count: Math.floor(Math.random() * 20) + 5 }
        ],
        deviceBreakdown: {
          desktop: Math.floor(Math.random() * 40) + 30,
          mobile: Math.floor(Math.random() * 40) + 20,
          tablet: Math.floor(Math.random() * 20) + 10
        }
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get service analytics
  getServiceAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Mock service analytics
      const analytics = {
        totalServices: Math.floor(Math.random() * 10) + 1,
        activeServices: Math.floor(Math.random() * 8) + 1,
        totalBookings: Math.floor(Math.random() * 100) + 20,
        completedBookings: Math.floor(Math.random() * 80) + 15,
        cancelledBookings: Math.floor(Math.random() * 20) + 5,
        averageRating: (Math.random() * 2 + 3).toFixed(1),
        topServices: [
          { name: 'Web Development', bookings: Math.floor(Math.random() * 30) + 10 },
          { name: 'UI/UX Design', bookings: Math.floor(Math.random() * 25) + 8 },
          { name: 'Consultation', bookings: Math.floor(Math.random() * 20) + 5 }
        ]
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get earnings analytics
  getEarningsAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Mock earnings analytics
      const analytics = {
        totalEarnings: Math.floor(Math.random() * 10000) + 2000,
        monthlyEarnings: Math.floor(Math.random() * 2000) + 500,
        pendingPayments: Math.floor(Math.random() * 1000) + 100,
        averageBookingValue: Math.floor(Math.random() * 300) + 100,
        earningsByMonth: [
          { month: 'Jan', amount: Math.floor(Math.random() * 1000) + 200 },
          { month: 'Feb', amount: Math.floor(Math.random() * 1000) + 200 },
          { month: 'Mar', amount: Math.floor(Math.random() * 1000) + 200 },
          { month: 'Apr', amount: Math.floor(Math.random() * 1000) + 200 },
          { month: 'May', amount: Math.floor(Math.random() * 1000) + 200 },
          { month: 'Jun', amount: Math.floor(Math.random() * 1000) + 200 }
        ]
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get overview analytics
  getAdminOverview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const totalUsers = await User.countDocuments();
      const totalProjects = await Project.countDocuments();
      const totalCourses = await Course.countDocuments();
      const totalServices = await Service.countDocuments();

      // Get recent activity (mock for now)
      const recentActivity = [
        { date: 'Mon', value: 15, message: 'New User Registration', timestamp: Date.now() - 43200000, color: '#4caf50' },
        { date: 'Tue', value: 20, message: 'Project "Beta" started', timestamp: Date.now() - 36000000, color: '#2196f3' },
        { date: 'Wed', value: 12, message: 'Course "Testing" launched', timestamp: Date.now() - 28800000, color: '#ff9800' },
        { date: 'Thu', value: 25, message: 'Server patch applied', timestamp: Date.now() - 21600000, color: '#f44336' },
        { date: 'Fri', value: 18, message: 'New API integrated', timestamp: Date.now() - 14400000, color: '#9e9e9e' },
        { date: 'Sat', value: 30, message: 'High User Activity Peak', timestamp: Date.now() - 7200000, color: '#00bcd4' },
        { date: 'Sun', value: 22, message: 'Database optimization done', timestamp: Date.now() - 3600000, color: '#ffc107' },
      ];

      // Mock revenue data
      const revenue = [
        { month: 'Jan', projects: 4000, courses: 2400, services: 1000 },
        { month: 'Feb', projects: 3000, courses: 1398, services: 2000 },
        { month: 'Mar', projects: 2000, courses: 9800, services: 3500 },
        { month: 'Apr', projects: 2780, courses: 3908, services: 4000 },
        { month: 'May', projects: 1890, courses: 4800, services: 4500 },
        { month: 'Jun', projects: 2390, courses: 3800, services: 5000 },
        { month: 'Jul', projects: 3490, courses: 4300, services: 6000 },
        { month: 'Aug', projects: 4500, courses: 5500, services: 7500 },
      ];

      const analytics = {
        users: totalUsers,
        projects: totalProjects,
        courses: totalCourses,
        services: totalServices,
        recentActivity,
        revenue
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get user analytics
  getUserAnalyticsAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const users = await User.find().select('firstName lastName email role createdAt');
      const analytics = {
        totalUsers: users.length,
        userGrowth: users.slice(-10), // Last 10 users
        roleDistribution: {
          admin: users.filter(u => u.role === 'admin').length,
          expert: users.filter(u => u.role === 'expert').length,
          user: users.filter(u => u.role === 'user').length
        }
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get service analytics
  getServiceAnalyticsAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const services = await Service.find().populate('providerId', 'firstName lastName');
      const analytics = {
        totalServices: services.length,
        categoryDistribution: services.reduce((acc: any, service: any) => {
          acc[service.category] = (acc[service.category] || 0) + 1;
          return acc;
        }, {}),
        topProviders: services.slice(0, 5).map((s: any) => ({
          name: `${s.providerId.firstName} ${s.providerId.lastName}`,
          services: services.filter((serv: any) => serv.providerId._id.toString() === s.providerId._id.toString()).length
        }))
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get revenue analytics
  getRevenueAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // Mock revenue analytics for admin
      const analytics = {
        totalRevenue: Math.floor(Math.random() * 100000) + 20000,
        monthlyRevenue: Math.floor(Math.random() * 10000) + 2000,
        platformFees: Math.floor(Math.random() * 5000) + 1000,
        revenueByCategory: [
          { category: 'Development', amount: Math.floor(Math.random() * 20000) + 5000 },
          { category: 'Design', amount: Math.floor(Math.random() * 15000) + 3000 },
          { category: 'Consultation', amount: Math.floor(Math.random() * 10000) + 2000 },
          { category: 'Marketing', amount: Math.floor(Math.random() * 8000) + 1500 }
        ],
        growthRate: Math.floor(Math.random() * 30) + 10 // percentage
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const analyticsController = new AnalyticsController();

// Protected routes - all analytics routes require authentication
router.use(authenticate);

// User analytics routes
router.get('/', analyticsController.getUserAnalytics);
router.get('/profile', analyticsController.getProfileAnalytics);
router.get('/services', analyticsController.getServiceAnalytics);
router.get('/earnings', analyticsController.getEarningsAnalytics);

// Admin routes
router.get('/admin/overview', authorize('admin'), analyticsController.getAdminOverview);
router.get('/admin/users', authorize('admin'), analyticsController.getUserAnalyticsAdmin);
router.get('/admin/services', authorize('admin'), analyticsController.getServiceAnalyticsAdmin);
router.get('/admin/revenue', authorize('admin'), analyticsController.getRevenueAnalytics);
router.get('/dashboard/stats', authorize('admin'), analyticsController.getAdminOverview);

export default router;

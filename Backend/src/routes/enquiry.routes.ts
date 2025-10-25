import { Router } from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiry.controller';

const router = Router();

// Public routes
router.post('/', createEnquiry);

// Admin routes (assuming admin middleware exists)
router.get('/', getAllEnquiries);
router.put('/:id/status', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

export default router;

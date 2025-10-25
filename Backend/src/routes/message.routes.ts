import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { body } from 'express-validator';

const router = Router();
const messageController = new MessageController();

// Validation schemas
const messageValidation = [
  body('content').notEmpty().withMessage('Message content is required'),
  body('recipientId').optional().isString(),
  body('priority').optional().isBoolean(),
];

const conversationValidation = [
  body('participantId').notEmpty().withMessage('Participant ID is required'),
];

// Protected routes - all message routes require authentication
router.use(authenticate);

// Message routes
router.get('/', messageController.getUserMessages);
router.get('/conversations', messageController.getConversations);
router.get('/priority', messageController.getPriorityMessages);
router.post('/', validate(messageValidation), messageController.sendMessage);
router.post('/priority', validate(messageValidation), messageController.sendPriorityMessage);
router.get('/:id', messageController.getMessageById);
router.put('/:id/read', messageController.markAsRead);
router.delete('/:id', messageController.deleteMessage);

// Conversation management
router.post('/conversations', validate(conversationValidation), messageController.createConversation);
router.get('/conversations/:id', messageController.getConversationById);
router.get('/conversations/:id/messages', messageController.getConversationMessages);

// Admin routes
router.get('/admin/all', authorize('admin'), messageController.getAllMessages);
router.get('/admin/stats', authorize('admin'), messageController.getMessageStats);

export default router;

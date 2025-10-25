import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Message, Conversation } from '../models';

export class MessageController {
  // Get user's messages
  getUserMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const messages = await Message.find({
        $or: [
          { senderId: req.user.id },
          { recipientId: req.user.id }
        ]
      })
        .populate('senderId', 'firstName lastName email')
        .populate('recipientId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .limit(50);

      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get conversations
  getConversations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const conversations = await Conversation.find({
        participants: req.user.id
      })
        .populate('participants', 'firstName lastName email')
        .populate('lastMessage')
        .sort({ updatedAt: -1 });

      res.json(conversations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get priority messages
  getPriorityMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const messages = await Message.find({
        recipientId: req.user.id,
        priority: true,
        read: false
      })
        .populate('senderId', 'firstName lastName email')
        .sort({ createdAt: -1 });

      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Send message
  sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { content, recipientId } = req.body;

      const message = await Message.create({
        senderId: req.user.id,
        recipientId,
        content,
        priority: false
      });

      // Update or create conversation
      await Conversation.findOneAndUpdate(
        {
          participants: { $all: [req.user.id, recipientId] }
        },
        {
          participants: [req.user.id, recipientId],
          lastMessage: message._id,
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );

      const populatedMessage = await Message.findById(message._id)
        .populate('senderId', 'firstName lastName email')
        .populate('recipientId', 'firstName lastName email');

      res.status(201).json(populatedMessage);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Send priority message
  sendPriorityMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { content, recipientId } = req.body;

      const message = await Message.create({
        senderId: req.user.id,
        recipientId,
        content,
        priority: true
      });

      // Update or create conversation
      await Conversation.findOneAndUpdate(
        {
          participants: { $all: [req.user.id, recipientId] }
        },
        {
          participants: [req.user.id, recipientId],
          lastMessage: message._id,
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );

      const populatedMessage = await Message.findById(message._id)
        .populate('senderId', 'firstName lastName email')
        .populate('recipientId', 'firstName lastName email');

      res.status(201).json(populatedMessage);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get message by ID
  getMessageById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const message = await Message.findOne({
        _id: req.params.id,
        $or: [
          { senderId: req.user.id },
          { recipientId: req.user.id }
        ]
      })
        .populate('senderId', 'firstName lastName email')
        .populate('recipientId', 'firstName lastName email');

      if (!message) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }

      res.json(message);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Mark message as read
  markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const message = await Message.findOneAndUpdate(
        {
          _id: req.params.id,
          recipientId: req.user.id
        },
        { $set: { read: true } },
        { new: true }
      );

      if (!message) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }

      res.json({ message: 'Message marked as read' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Delete message
  deleteMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const message = await Message.findOneAndDelete({
        _id: req.params.id,
        $or: [
          { senderId: req.user.id },
          { recipientId: req.user.id }
        ]
      });

      if (!message) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }

      res.json({ message: 'Message deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Create conversation
  createConversation = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { participantId } = req.body;

      const conversation = await Conversation.create({
        participants: [req.user.id, participantId]
      });

      const populatedConversation = await Conversation.findById(conversation._id)
        .populate('participants', 'firstName lastName email');

      res.status(201).json(populatedConversation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get conversation by ID
  getConversationById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const conversation = await Conversation.findOne({
        _id: req.params.id,
        participants: req.user.id
      })
        .populate('participants', 'firstName lastName email')
        .populate('lastMessage');

      if (!conversation) {
        res.status(404).json({ message: 'Conversation not found' });
        return;
      }

      res.json(conversation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get conversation messages
  getConversationMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const conversation = await Conversation.findOne({
        _id: req.params.id,
        participants: req.user.id
      });

      if (!conversation) {
        res.status(404).json({ message: 'Conversation not found' });
        return;
      }

      const messages = await Message.find({
        $or: [
          { senderId: conversation.participants[0], recipientId: conversation.participants[1] },
          { senderId: conversation.participants[1], recipientId: conversation.participants[0] }
        ]
      })
        .populate('senderId', 'firstName lastName email')
        .populate('recipientId', 'firstName lastName email')
        .sort({ createdAt: 1 });

      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get all messages
  getAllMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const messages = await Message.find()
        .populate('senderId', 'firstName lastName email')
        .populate('recipientId', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .limit(100);

      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Admin: Get message stats
  getMessageStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const totalMessages = await Message.countDocuments();
      const priorityMessages = await Message.countDocuments({ priority: true });
      const unreadMessages = await Message.countDocuments({ read: false });

      res.json({
        total: totalMessages,
        priority: priorityMessages,
        unread: unreadMessages
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

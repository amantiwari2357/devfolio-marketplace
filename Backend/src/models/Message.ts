import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  recipientId: mongoose.Types.ObjectId;
  content: string;
  priority: boolean;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
messageSchema.index({ senderId: 1, createdAt: -1 });
messageSchema.index({ recipientId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1, recipientId: 1, createdAt: -1 });
messageSchema.index({ priority: 1, read: 1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure participants array has exactly 2 unique users
conversationSchema.pre('save', function(next) {
  if (this.participants.length !== 2) {
    return next(new Error('Conversation must have exactly 2 participants'));
  }

  // Sort participants to ensure consistent ordering
  this.participants.sort();

  next();
});

// Index for efficient conversation lookup
conversationSchema.index({ participants: 1 }, { unique: true });
conversationSchema.index({ updatedAt: -1 });

export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);

import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

export class BaseController<T extends Document> {
  constructor(private model: Model<T>) {}

  // Create a new document
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const doc = await this.model.create(req.body);
      res.status(201).json(doc);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get all documents with pagination
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [docs, total] = await Promise.all([
        this.model.find().skip(skip).limit(limit),
        this.model.countDocuments(),
      ]);

      res.json({
        data: docs,
        pagination: {
          current: page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get a single document by ID
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const doc = await this.model.findById(req.params.id);
      if (!doc) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.json(doc);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update a document
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const doc = await this.model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!doc) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }

      res.json(doc);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a document
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const doc = await this.model.findByIdAndDelete(req.params.id);
      
      if (!doc) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

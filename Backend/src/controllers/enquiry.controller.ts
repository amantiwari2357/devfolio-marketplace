import { Request, Response } from 'express';
import { Enquiry } from '../models';

export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { expert, project, name, email, phone, message } = req.body;

    if ((!expert && !project) || !name || !email || !phone || !message) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const enquiry = await Enquiry.create({
      expert,
      project,
      name,
      email,
      phone,
      message,
    });

    const populatedEnquiry = await Enquiry.findById(enquiry._id)
      .populate('expert', 'firstName lastName')
      .populate('project', 'title');

    res.status(201).json({
      success: true,
      data: populatedEnquiry,
      message: 'Enquiry submitted successfully'
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter)
      .populate('project', 'title category')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Enquiry.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        enquiries,
        totalPages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
        total,
      },
      message: 'Enquiries fetched successfully'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'responded', 'closed'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('project', 'title');

    if (!enquiry) {
      res.status(404).json({ message: 'Enquiry not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: enquiry,
      message: 'Enquiry status updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      res.status(404).json({ message: 'Enquiry not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

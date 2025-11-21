const Joi = require('joi');

// Expert validation schemas
const expertSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 1 character',
      'string.max': 'First name must be less than 50 characters'
    }),

  lastName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 1 character',
      'string.max': 'Last name must be less than 50 characters'
    }),

  role: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Role is required',
      'string.min': 'Role must be at least 1 character',
      'string.max': 'Role must be less than 100 characters'
    }),

  profileImage: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Profile image must be a valid URL'
    }),

  skills: Joi.array()
    .items(Joi.string().trim().min(1).max(50))
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one skill is required',
      'string.min': 'Each skill must be at least 1 character',
      'string.max': 'Each skill must be less than 50 characters'
    }),

  bio: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Bio is required',
      'string.min': 'Bio must be at least 10 characters',
      'string.max': 'Bio must be less than 1000 characters'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),

  rating: Joi.number()
    .min(0)
    .max(5)
    .optional()
    .messages({
      'number.min': 'Rating must be at least 0',
      'number.max': 'Rating must be at most 5'
    }),

  connections: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.min': 'Connections must be at least 0',
      'number.integer': 'Connections must be a whole number'
    }),

  experience: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Experience must be less than 100 characters'
    }),

  location: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Location must be less than 100 characters'
    })
});

// Expert enquiry validation schema
const expertEnquirySchema = Joi.object({
  expertId: Joi.string()
    .required()
    .messages({
      'string.empty': 'Expert ID is required'
    }),

  expertName: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Expert name is required',
      'string.min': 'Expert name must be at least 1 character',
      'string.max': 'Expert name must be less than 100 characters'
    }),

  name: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must be less than 100 characters'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),

  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number'
    }),

  message: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 10 characters',
      'string.max': 'Message must be less than 1000 characters'
    }),

  status: Joi.string()
    .valid('pending', 'contacted', 'closed')
    .optional()
    .messages({
      'any.only': 'Status must be one of: pending, contacted, closed'
    })
});

// Status update validation schema
const statusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'contacted', 'closed')
    .required()
    .messages({
      'any.only': 'Status must be one of: pending, contacted, closed',
      'string.empty': 'Status is required'
    })
});

module.exports = {
  expertSchema,
  expertEnquirySchema,
  statusUpdateSchema
};

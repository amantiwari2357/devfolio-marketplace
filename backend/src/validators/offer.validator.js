const Joi = require('joi');

const offerSchema = Joi.object({
  title: Joi.string().required().trim().min(3).max(100),
  description: Joi.string().required().min(10).max(500),
  category: Joi.string().valid('SEO', 'Maintenance', 'Deployment', 'Development', 'Audit', 'Hosting').required(),
  terms: Joi.string().required().min(10).max(1000),
  validityDays: Joi.number().integer().min(1).max(365).required(),
  isActive: Joi.boolean().default(true)
});

const assignedOfferSchema = Joi.object({
  offerId: Joi.string().required(),
  clientId: Joi.string().required(),
  clientName: Joi.string().required().trim(),
  notes: Joi.string().max(500).optional()
});

const updateOfferStatusSchema = Joi.object({
  status: Joi.string().valid('assigned', 'active', 'used', 'expired', 'converted').required(),
  notes: Joi.string().max(500).optional()
});

module.exports = {
  offerSchema,
  assignedOfferSchema,
  updateOfferStatusSchema
};

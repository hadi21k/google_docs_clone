const Joi = require("joi");

const createDocumentSchema = Joi.object({
  title: Joi.string().required(),
});

const updateDocumentSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
});

module.exports = {
  createDocumentSchema,
  updateDocumentSchema,
};

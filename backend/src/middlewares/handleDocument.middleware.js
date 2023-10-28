const { createDocumentSchema, updateDocumentSchema } = require("../schemas/document.schema");

const validateCreateDocument = async (req, res, next) => {
  try {
    const validateSchema = await createDocumentSchema.validateAsync(req.body);
    if (validateSchema.error) {
      const error = new Error(validateSchema.error);
      error.status = 400;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

const validateUpdateDocument = async (req, res, next) => {
  try {
    const validateSchema = await updateDocumentSchema.validateAsync(req.body);
    if (validateSchema.error) {
      const error = new Error(validateSchema.error);
      error.status = 400;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
    validateCreateDocument,
    validateUpdateDocument,
    };

const { decode } = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

const validateRegister = async (req, res, next) => {
  try {
    const validateSchema = await registerSchema.validateAsync(req.body);
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

const validateLogin = async (req, res, next) => {
  try {
    const validateSchema = await loginSchema.validateAsync(req.body);
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

const authenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const validateToken = await decode(token, process.env.JWT_SECRET);
    if (validateToken) {
      req.user = validateToken.id;
      return next();
    }

    const error = new Error("User not authenticated");
    error.status = 401;
    return next(error);
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  authenticated,
};

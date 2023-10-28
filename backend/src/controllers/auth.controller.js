const logger = require("../config/logger");
const User = require("../models/user.model");
const passport = require("passport");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ username });

    if (userExist) {
      const error = new Error("User already exists");
      error.status = 409;
      throw error;
    }

    const user = await User.create({
      username,
      email,
      password,
      status: "active",
    });

    req.logIn(user, function (err) {
      if (err) {
        logger.error(err);
        return next(err);
      }

      return res.redirect(process.env.CLIENT_URL);
    });
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      const error = new Error(err);
      return next(error);
    }
    if (!user) {
      const error = new Error(info.message);
      error.status = 401;
      return next(error);
    }

    req.logIn(user, function (err) {
      if (err) {
        logger.error(err);
        return next(err);
      }
      return res.redirect(process.env.CLIENT_URL);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      logger.error(err);
      return next(err);
    }
  });

  return res.status(200).json("Logged out successfully");
};

module.exports = {
  register,
  login,
  logout,
};

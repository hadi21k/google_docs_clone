const User = require("../models/user.model");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUser,
};

const User = require("../models/user.model");

const findOneUser = async (query) => {
  return User.findOne(query);
};

module.exports = {
  findOneUser,
};

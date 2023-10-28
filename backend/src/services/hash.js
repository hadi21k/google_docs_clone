const { hash, compare } = require("bcrypt");

const encrypt = async (password) => {
  return await hash(password, 10);
};

const decrypt = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

module.exports = {
  encrypt,
  decrypt,
};

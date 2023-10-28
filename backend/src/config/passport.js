const User = require("../models/user.model");
const { decrypt } = require("../services/hash");

const LocalStrategy = require("passport-local").Strategy;

const createStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: "Incorrect username or password" });
    }

    const isValid = await decrypt(password, user.password);

    if (!isValid) {
      return done(null, false, { message: "Incorrect username or password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const serializeUser = (user, done) => {
  done(null, user.id);
};

const deserializeUser = async (id, done) => {
  try {
    const user = await User.findById(id, "-password -__v");

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
};

module.exports = {
  createStrategy,
  serializeUser,
  deserializeUser,
};

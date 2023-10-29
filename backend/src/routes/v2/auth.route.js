const { Router } = require("express");
const { findOneUser } = require("../../services/user.services");
const { sign } = require("jsonwebtoken");
const User = require("../../models/user.model");
const { decrypt } = require("../../services/hash");

const router = Router();

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userExist = await findOneUser({ $or: [{ username }, { email }] });

    if (userExist) {
      const error = new Error("User already exists");
      error.status = 409;
      throw error;
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await findOneUser({ username });

    if (!user) {
      const error = new Error("Incorrect username or password");
      error.status = 404;
      throw error;
    }

    const isValid = await decrypt(password, user.password);

    if (!isValid) {
      const error = new Error("Incorrect username or password");
      error.status = 401;
      throw error;
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

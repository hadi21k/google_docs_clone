const { Router } = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/auth.middlware");

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);



module.exports = router;

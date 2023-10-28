const { Router } = require("express");
const { authenticated } = require("../middlewares/auth.middlware");
const { getUser } = require("../controllers/user.controller");

const router = Router();

router.get("/user", authenticated, getUser);

module.exports = router;

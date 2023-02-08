const express = require("express");

const { register, login, logout } = require("../controllers/auth");
const { protectedRoute } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protectedRoute, logout);

module.exports = router;

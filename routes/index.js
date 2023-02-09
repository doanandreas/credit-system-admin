const express = require("express");

const authRouter = require("./auth");
const creditRouter = require("./credit");
const { protectedRoute } = require("../middlewares/auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/credit", protectedRoute, creditRouter);

module.exports = router;

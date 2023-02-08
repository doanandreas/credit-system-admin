const express = require("express");

const authRouter = require("./auth");
const creditRouter = require("./credit");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/credit", creditRouter);

module.exports = router;

const express = require("express");

const { deposit } = require("../controllers/credit");
const { protectedRoute } = require("../middlewares/auth");

const router = express.Router();

router.post("/deposit", protectedRoute, deposit);

module.exports = router;

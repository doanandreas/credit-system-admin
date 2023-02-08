const express = require("express");

const { deposit, withdraw } = require("../controllers/credit");
const { protectedRoute } = require("../middlewares/auth");

const router = express.Router();

router.post("/deposit", protectedRoute, deposit);
router.post("/withdraw", protectedRoute, withdraw);

module.exports = router;

const express = require("express");

const { deposit, withdraw, purchase } = require("../controllers/credit");
const { protectedRoute } = require("../middlewares/auth");

const router = express.Router();

router.post("/deposit", protectedRoute, deposit);
router.post("/withdraw", protectedRoute, withdraw);
router.post("/purchase", protectedRoute, purchase);

module.exports = router;

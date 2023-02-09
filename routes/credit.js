const express = require("express");

const {
  deposit,
  withdraw,
  purchase,
  invoice,
} = require("../controllers/credit");

const router = express.Router();

router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/purchase", purchase);
router.post("/invoice", invoice);

module.exports = router;

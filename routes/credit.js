const express = require("express");

const router = express.Router();

router.post("/deposit", (_, res, __) => {
  res.send("Hello there");
});

module.exports = router;

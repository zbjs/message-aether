const express = require("express");
const router = express.Router();


router.get("/email", (req, res) => {
  res.send("Hello email world");
});

module.exports = router;

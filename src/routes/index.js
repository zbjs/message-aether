const express = require("express");
const router = express.Router();

router.get("/email", (req, res) => {
  res.send("Hello email world");
});

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello world",
    data: {
      name: "Send Mailer",
      version: "1.0.0",
    },
    error: {
      code: 0,
    },
    status: 200,
    timestamp: Date.now(),
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  });
});

module.exports = router;

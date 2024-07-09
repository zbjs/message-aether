const nodemailer = require("nodemailer");


exports.mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || '2525'),
  auth: {
      user: process.env.SMTP_USER || "b5b7b5d5c0b4d1",
      pass: process.env.SMTP_PASS || "b5b7b5d5c0b4d1"
  },
});

exports.defaultSender = process.env.DEFAULT_SENDER || "wYUQq@example.com";

exports.QUEUE_URL = process.env.QUEUE_URL || "amqp://localhost:5672";



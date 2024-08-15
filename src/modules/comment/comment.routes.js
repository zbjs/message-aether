// comment.routes.js

const express = require("express");
const commentRouter = express.Router();
const verifyToken = require("../auth/auth.middleware");
const {
  addComment,
  replyToComment,
  getCommentsByBlogId,
} = require("./comment.controller");

// Ensure middleware is applied for token verification
commentRouter.post("/add", addComment);
commentRouter.post("/reply/:commentId", replyToComment);
commentRouter.get("/:blogId", getCommentsByBlogId);

module.exports = commentRouter;

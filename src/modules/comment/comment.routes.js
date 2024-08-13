const commentRouter = require("express").Router();
const verifyToken = require("../auth/auth.middleware");

const {
  addComment,
  replyToComment,
  getCommentsByBlogId,
} = require("./comment.controller");

commentRouter.post("/add", verifyToken, addComment);
commentRouter.post("/reply:commentId", verifyToken, replyToComment);

commentRouter.get("/:blogId", verifyToken, getCommentsByBlogId);

module.exports = commentRouter;

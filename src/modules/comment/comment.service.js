const Comment = require("./comment.model");

exports.generateNextCommentId = async () => {
  const lastComment = await Comment.findOne().sort({ cId: -1 });
  return lastComment ? lastComment.cId + 1 : 1;
};

// Add a new comment service
exports.addComment = async (commentData) => {
  const comment = new Comment(commentData);
  await comment.save();
  return comment;
};

// Reply to a comment
exports.replyToComment = async (commentId, replyData) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  comment.replies.push(replyData);
  return await comment.save();
};

// Get all comments for a blog
exports.getCommentsByBlogId = async (blogId) => {
  return await Comment.find({ blogId })
    .populate("author", "username")
    .populate("replies.author", "username");
};

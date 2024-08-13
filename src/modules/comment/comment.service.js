// comment.service.js

const Comment = require("./comment.model");
const User = require("../user/user.model");

// Generate the next comment ID (if needed for custom ID handling)
exports.generateNextCommentId = async () => {
  const lastComment = await Comment.findOne().sort({ _id: -1 });
  return lastComment ? lastComment._id + 1 : 1; // Adjust based on your ID generation strategy
};

// Add a new comment service
exports.addComment = async (commentData) => {
  // check if comment exists
  const existingComment = await Comment.findOne({
    id: commentData.id,
  });
  if (existingComment) {
    throw new Error("Comment already exists");
  }

  const comment = new Comment(commentData);
  await comment.save();
  return comment;
};

// Reply to a comment service
exports.replyToComment = async (commentId, replyData) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  // Ensure replyData.author is a valid ObjectId
  if (!replyData.author || !replyData.author.toString) {
    throw new Error("Invalid author in replyData");
  }

  // Check if the reply already exists
  const existingReply = comment.replies.find((reply) => {
    if (!reply.author || !reply.author.toString) {
      return false;
    }
    return (
      reply.author.toString() === replyData.author.toString() &&
      reply.comment === replyData.comment
    );
  });

  if (existingReply) {
    throw new Error("Reply already exists");
  }

  // Add the new reply
  comment.replies.push(replyData);
  await comment.save();

  return comment;
};

// Get all comments for a blog service
exports.getCommentsByBlogId = async (blogId) => {
  console.log("Fetching comments for blogId:", blogId);
  return await Comment.find({ blogId })
    .populate("author", "username")
    .populate("replies.author", "username");
};

const {
  createCommentSchema,
  replyToCommentSchema,
} = require("./comment.validation");
const commentService = require("./comment.service");

// Controller to add a new comment
exports.addComment = async (req, res) => {
  try {
    const { blogId } = req.body;
    const authorId = req.user.id;

    if (!blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }

    console.log(blogId, "blog id");

    const commentData = {
      cId: await commentService.generateNextCommentId(),
      authorId,
      blog: blogId,
      comment: req.body.comment,
      code: req.body.code,
      replies: [],
    };

    const comment = await commentService.addComment(commentData);
    res.status(201).json({ success: true, comment });

    console.log(comment, "comment");
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to reply to a comment
exports.replyToComment = async (req, res) => {
  try {
    const validation = replyToCommentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const replyData = {
      author: req.user._id,
      comment: req.body.comment,
      code: req.body.code,
    };
    const comment = await commentService.replyToComment(
      req.params.commentId,
      replyData
    );
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to get all comments for a blog
exports.getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByBlogId(
      req.params.blogId
    );
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

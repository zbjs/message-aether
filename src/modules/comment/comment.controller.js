// comment.controller.js

const {
  createCommentSchema,
  replyToCommentSchema,
} = require("./comment.validation");
const commentService = require("./comment.service");

// Controller to add a new comment
exports.addComment = async (req, res) => {
  console.log("User Info:", req.user);
  try {
    const author = req.user.username;
    const authorId = req.user.id;
    const authorFullname = req.user.fullname;
    const blogId = req.body.blogId;

    if (!author || !authorId || !authorFullname || !blogId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    console.log(authorId);

    const requestBody = {
      ...req.body,
      author: authorId, // Update to use the correct ID
    };

    // Validate the request body
    const validatedData = createCommentSchema.safeParse(requestBody);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ success: false, errors: validatedData.error.errors });
    }

    const comment = await commentService.addComment(validatedData.data);
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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
      author: req.user.id, // Ensure this is an ObjectId
      comment: req.body.comment,
      code: req.body.code,
    };

    console.log("Reply Data:", replyData); // Log the reply data

    const updatedComment = await commentService.replyToComment(
      req.params.commentId,
      replyData
    );

    res.status(201).json({ success: true, comment: updatedComment });
  } catch (error) {
    console.error("Error in replyToComment controller:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller to get all comments for a blog
exports.getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByBlogId(
      req.params.blogId
    );
    console.log("Comments:", comments);
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

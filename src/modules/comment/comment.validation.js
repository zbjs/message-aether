const { z } = require("zod");

exports.createCommentSchema = z.object({
  author: z.string().min(1, "Author is required"),
  blogId: z
    .string()
    .min(1, "Blog ID is required")
    .length(24, "Invalid Blog ID format"), // assuming ObjectId length is 24
  comment: z.string().min(1, "Comment is required"),
  code: z.string().optional(), // code is optional
});

exports.replyToCommentSchema = z.object({
  comment: z.string().min(1, "Reply comment is required"),
  code: z.string().optional(), // code is optional
});

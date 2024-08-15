const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "Users",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Blogs",
    },
    comment: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    replies: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        comment: {
          type: String,
          required: true,
        },
        code: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;

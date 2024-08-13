const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    cId: {
      type: Number,
      default: 0,
      unique: true,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
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
          required: true,
          ref: "Users",
        },
        comment: {
          type: String,
          required: true,
        },
        code: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;

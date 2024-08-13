const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  cId: {
    type: Number,
    default: 0,
    unique: true,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  blogId: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  metadata: {
    type: Object,
  },
});

module.exports = model("Comment", CommentSchema);

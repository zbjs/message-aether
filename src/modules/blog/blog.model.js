const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    bId: {
      type: Number,
      default: 0,
      unique: true,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
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
      tags: [String],
      category: [String],
    },
    permissions: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: true,
      },
      edit: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: true,
      },
    },
    links: {
      view: String,
      edit: String,
      delete: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blogs", BlogSchema);
module.exports = Blog;

const Counter = require("./counter.model");
const Blog = require("./blog.model");

async function getNextBId() {
  // Define the ID name
  const counterId = "blogId";

  // Try to get the maximum bId from existing blogs
  const maxBlog = await Blog.findOne({}, "bId").sort({ bId: -1 }).exec();

  if (maxBlog && maxBlog.bId !== undefined) {
    // If there is at least one blog, return the next bId by incrementing the max bId
    return maxBlog.bId + 1;
  } else {
    // If there are no blogs, start from 1
    return 1;
  }
}

module.exports = { getNextBId };

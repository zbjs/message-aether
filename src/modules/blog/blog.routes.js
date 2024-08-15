const blogRouter = require("express").Router();
const verifyToken = require("../auth/auth.middleware");

const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} = require("./blog.controller");

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/create", verifyToken, createBlog);
blogRouter.put("/update/:id", verifyToken, updateBlog);
blogRouter.delete("/:id", verifyToken, deleteBlog);

module.exports = blogRouter;

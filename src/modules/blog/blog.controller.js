// src/controllers/blog.controller.js
const blogService = require("./blog.services");
const { createBlogSchema } = require("./blog.validation");

class BlogController {
  // Create a new blog controller
  async createBlog(req, res) {
    const author = req.user.username;
    const authorId = req.user.id;
    const authorFullname = req.user.fullname;

    if (!author || !authorId || !authorFullname) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      const requestBody = {
        ...req.body,
        author: {
          id: authorId,
          username: author,
          fullname: authorFullname,
        },
      };

      // Validate the request body
      const validatedData = createBlogSchema.safeParse(requestBody);
      if (!validatedData.success) {
        return res
          .status(400)
          .json({ success: false, message: validatedData.error.message });
      }

      // Check if the blog already exists
      const blog = await blogService.checkIfBlogExists(validatedData.data);
      if (blog) {
        return res
          .status(409)
          .json({ success: false, message: "Blog already exists" });
      }

      // Call the service to create the blog
      const newBlog = await blogService.createBlog(validatedData.data);

      // Generate links dynamically
      const links = {
        view: `/api/blog/${newBlog.bId}`,
        edit: `/api/blog/${newBlog.bId}/edit`,
        delete: `/api/blog/${newBlog.bId}/delete`,
      };
      requestBody.links = links;

      return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        data: requestBody,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // Get all blogs controller with search functionality
  async getAllBlogs(req, res) {
    try {
      let { page = 1, limit = 10, search = "" } = req.query;

      // Validate page and limit
      page = Number(page);
      limit = Number(limit);

      // Ensure that page and limit are positive integers
      if (page < 1) page = 1;
      if (limit < 1) limit = 1;

      // Call the service to get blogs with pagination and search
      const blogsData = await blogService.getAllBlogs(page, limit, search);

      return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        data: blogsData,
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching blogs",
      });
    }
  }

  // Get a blog controller
  async getBlogById(req, res) {
    try {
      const bId = req.params.id; // Assuming the route parameter is `id`
      const blog = await blogService.getBlogById(bId);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }

      return res.status(200).json({ success: true, data: blog });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update a blog controller
  async updateBlog(req, res) {
    try {
      const bId = req.params.id; // Assuming the bId is passed as a URL parameter
      const updateData = req.body;

      // Update the blog using the service
      const updatedBlog = await blogService.updateBlog(bId, updateData);

      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (error) {
      console.error("Update blog error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a blog controller
  async deleteBlog(req, res) {
    try {
      const bId = req.params.id; // Assuming the bId is passed as a URL parameter

      // Delete the blog using the service
      const deletedBlog = await blogService.deleteBlogById(bId);

      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
        data: deletedBlog,
      });
    } catch (error) {
      console.error("Delete blog error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new BlogController();

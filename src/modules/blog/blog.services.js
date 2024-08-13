// src/services/blog.service.js
const Blog = require("./blog.model");
const { getNextBId } = require("./incrementBid");

class BlogService {
  // Create a new blog service
  async createBlog(data) {
    let bId;

    try {
      // Get the next bId
      bId = await getNextBId();
      data.bId = bId;
      const blog = new Blog(data);

      // Save the blog
      return await blog.save();
    } catch (error) {
      console.error("Error creating blog:", error);
      throw new Error("Error creating blog");
    }
  }

  // check if blog exists all fields
  async checkIfBlogExists(data) {
    try {
      const blog = await Blog.findOne({
        $or: [
          { title: data.title },
          { description: data.description },
          { "metadata.tags": data["metadata.tags"] },
          { "metadata.category": data["metadata.category"] },
        ],
      });
      return blog;
    } catch (error) {
      console.error("Error checking if blog exists:", error);
      throw new Error("Error checking if blog exists");
    }
  }

  // Get all blogs service with search functionality
  async getAllBlogs(page = 1, limit = 10, searchQuery = "") {
    try {
      // Validate limit to be a positive integer
      if (limit < 1) limit = 1;
      if (limit > 100) limit = 100; // Cap limit to a maximum value to prevent large queries

      const totalCount = await Blog.countDocuments({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { "metadata.tags": { $regex: searchQuery, $options: "i" } },
          { "metadata.category": { $regex: searchQuery, $options: "i" } },
        ],
      });

      const totalPages = Math.ceil(totalCount / limit);

      const blogs = await Blog.find({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { "metadata.tags": { $regex: searchQuery, $options: "i" } },
          { "metadata.category": { $regex: searchQuery, $options: "i" } },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        totalCount,
        totalPages,
        currentPage: page,
        nextLink:
          page < totalPages
            ? `/api/blog?page=${
                page + 1
              }&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
            : null,
        prevLink:
          page > 1
            ? `/api/blog?page=${
                page - 1
              }&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
            : null,
        blogs,
      };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new Error("Error fetching blogs");
    }
  }

  // Get  blog by id service
  async getBlogById(bId) {
    try {
      return await Blog.findOne({ bId });
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      throw new Error("Error fetching blog by ID");
    }
  }
  // Update a blog by id service
  async updateBlog(bId, updateData) {
    try {
      // Find and update the blog by bId
      const updatedBlog = await Blog.findByIdAndUpdate(
        bId,
        { $set: updateData },
        { new: true, runValidators: true } // Return the updated document and validate
      );

      if (!updatedBlog) {
        throw new Error("Blog not found");
      }

      return updatedBlog;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw new Error("Error updating blog");
    }
  }

  // Delete a blog by id service
  async deleteBlog(bId) {
    try {
      // Find and delete the blog by bId
      const deletedBlog = await Blog.findByIdAndDelete(bId);

      if (!deletedBlog) {
        throw new Error("Blog not found");
      }

      return deletedBlog;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw new Error("Error deleting blog");
    }
  }
}

module.exports = new BlogService();

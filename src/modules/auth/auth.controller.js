const authService = require("./auth.service");
const {
  registerSchema,
  updateUserSchema,
  changePasswordSchema,
} = require("./auth.validation");

// Register a new user
exports.register = async (req, res) => {
  try {
    // validate the request body
    const validatedData = registerSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ success: false, message: validatedData.error.message });
    }

    // Create a new user using the validated data
    const user = await authService.registerUser(validatedData.data);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message, success: "false" });
  }
};

// Login a user controller
exports.login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Update User controller
exports.updateUser = async (req, res) => {
  try {
    // Validate the request body
    const validation = updateUserSchema.safeParse(req);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    // Extract validated data
    const { body: userData } = validation.data;

    // Update the user using the validated data
    const user = await authService.updateUser(req.params.id, userData);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Logout a user controller
exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is passed as "Bearer <token>"

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    // Call the service method to handle logout
    const result = await authService.logoutUser(token);

    // Respond with a success message
    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await authService.deleteUser(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || "";

    // Call the service method to get users with pagination and search
    const { totalCount, totalPages, currentPage, users } =
      await authService.getUsers(page, limit, searchQuery);

    res.status(200).json({
      totalCount,
      totalPages,
      currentPage,
      nextLink:
        currentPage < totalPages
          ? `/api/users?page=${
              currentPage + 1
            }&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
          : null,
      prevLink:
        currentPage > 1
          ? `/api/users?page=${
              currentPage - 1
            }&limit=${limit}&search=${encodeURIComponent(searchQuery)}`
          : null,
      users,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// change password controller
exports.changePassword = async (req, res) => {
  try {
    // Validate the request body
    const validation = changePasswordSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const { oldpassword, newpassword } = validation.data;

    // Validate the old password
    const isMatch = await authService.validatePassword(
      req.user._id,
      oldpassword
    );
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }

    // Update the password
    const result = await authService.updatePassword(req.user._id, newpassword);
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

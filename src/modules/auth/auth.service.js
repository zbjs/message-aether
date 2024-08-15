const User = require("../user/user.model");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (userData) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create and save the user, hash password, etc.
  const user = new User(userData);
  await user.save();
  return user;
};

// Login a user service method
exports.loginUser = async (loginData) => {
  // Find user, validate password, generate JWT token
  const user = await User.findOne({ email: loginData.email });
  if (!user || (await !user.validatePassword(loginData.password))) {
    throw new Error("Invalid credentials");
  }

  // Define the JWT secret and expiration time
  const secret = process.env.JWT_SECRET;
  const expiresIn = "2h"; // Token will expire in 2 hour

  // Generate the JWT token with the user's information
  const token = jwt.sign(
    {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      bio: user.bio,
      location: user.location,
      linkedin_url: user.linkedin_url,
      twitter_url: user.twitter_url,
      website_url: user.website_url,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    secret,
    { expiresIn }
  );
  return token;
};

// Logout a user service method
exports.logoutUser = async (token) => {
  try {
    // For demonstration, simply return a success message
    return { success: true, message: "Logout successful" };
  } catch (error) {
    throw new Error("Error during logout");
  }
};

// Update a user service
exports.updateUser = async (userId, userData) => {
  try {
    // Find user by ID and update with provided data
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete a user
exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

// get all users service
exports.getUsers = async (page = 1, limit = 10, searchQuery = "") => {
  // Ensure limit is a positive integer and cap it to a reasonable value
  if (limit < 1) limit = 1;
  if (limit > 100) limit = 100;

  const query = {
    $or: [
      { fullname: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
      { username: { $regex: searchQuery, $options: "i" } },
    ],
  };

  // Get the total count of documents matching the query
  const totalCount = await User.countDocuments(query);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch users based on the query with pagination
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    totalCount,
    totalPages,
    currentPage: page,
    users,
  };
};

// Validate the password for a specific user
exports.validatePassword = async (userId, password) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.validatePassword(password);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update the password for a specific user
exports.validatePassword = async (userId, oldPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return await user.validatePassword(oldPassword);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updatePassword = async (userId, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

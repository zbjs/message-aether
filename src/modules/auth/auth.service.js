const User = require("../user/user.model");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (userData) => {
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
  const secret = process.env.JWT_SECRET || "your_jwt_secret";
  const expiresIn = "1h"; // Token will expire in 1 hour

  // Generate the JWT token with the user's ID, email, and role
  const token = jwt.sign(
    {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn }
  );
  return token;
};

// Logout a user service method
exports.logoutUser = async () => {
  // Remove the JWT token from the database
  // Implement your logic to remove the JWT token from the database

  // Return a success message
  return "Logout successful";
};

// update a user
exports.updateUser = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(userId, userData, { new: true });
  return user;
};

// delete a user
exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

// get all users
exports.getUsers = async () => {
  const users = await User.find();
  return users;
};

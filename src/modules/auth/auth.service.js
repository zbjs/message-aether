const User = require("../user/user.model");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (userData) => {
  // Create and save the user, hash password, etc.
  const user = new User(userData);
  await user.save();
  return user;
};

// Login a user
exports.loginUser = async (loginData) => {
  // Find user, validate password, generate JWT token
  const user = await User.findOne({ email: loginData.email });
  if (!user || (await !user.validatePassword(loginData.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.email, role: user.role },
    "your_jwt_secret"
  );
  return token;
};

// Logout a user
exports.logoutUser = async () => {
  // Clear the JWT token
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

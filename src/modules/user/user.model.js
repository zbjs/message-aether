const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
      min: [3, "Fullname must be at least 3 characters long"],
      max: [100, "Fullname must be at most 100 characters long"],
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: [3, "Username must be at least 3 characters long"],
      max: [20, "Username must be at most 20 characters long"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      min: [8, "Password must be at least 6 characters long"],
      max: [100, "Password must be at most 100 characters long"],
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password must be at least 6 characters long"],
      max: [100, "Password must be at most 100 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar_url: {
      type: String,
      default: "",
    },
    html_url: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    linkedin_url: {
      type: String,
      default: "",
    },
    twitter_username: {
      type: String,
      default: "",
    },
    website_url: {
      type: String,
      default: "",
    },
    followers_url: {
      type: String,
      default: "",
    },
    following_url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add a method to validate the password
UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);

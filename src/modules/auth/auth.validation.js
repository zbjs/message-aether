const { z } = require("zod");

exports.loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email is too long")
    .email("Email must be a valid email")
    .regex(/^\S+@\S+$/),
  password: z
    .string()
    .min(6, "Password is required")
    .max(100, "Password is too long")
    ._addCheck((value) => {
      return value.length >= 6;
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    ),
});

exports.registerSchema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be at least 3 characters long")
    .max(100, "Fullname must be at most 100 characters long"),
  username: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").max(100, "Email is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password is too long"),
});

exports.resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required").max(100, "Email is too long"),
  }),
});

exports.changePasswordSchema = z.object({
  oldpassword: z.string().min(1, "Old password is required"),
  newpassword: z.string().min(1, "New password is required"),
});

exports.updateUserSchema = z.object({
  body: z.object({
    fullname: z
      .string()
      .min(3, "Fullname must be at least 3 characters long")
      .max(100, "Fullname must be at most 100 characters long"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    role: z.enum(["user", "admin"]).default("user").optional(),
    avatar_url: z.string().optional(),
    html_url: z.string().optional(),
    followers: z.string().optional(),
    following: z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    linkedin_url: z.string().optional(),
    twitter_url: z.string().optional(),
    website_url: z.string().optional(),
    github_url: z.string().optional(),
  }),
});

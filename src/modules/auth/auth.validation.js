const { z } = require("zod");

exports.loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required").max(100, "Email is too long"),
    password: z
      .string()
      .min(1, "Password is required")
      .max(100, "Password is too long"),
  }),
});

exports.registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().min(1, "Email is required").max(100, "Email is too long"),
    password: z
      .string()
      .min(1, "Password is required")
      .max(100, "Password is too long"),
  }),
});

exports.resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required").max(100, "Email is too long"),
  }),
});

exports.changePasswordSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(1, "Password is required")
      .max(100, "Password is too long"),
  }),
});

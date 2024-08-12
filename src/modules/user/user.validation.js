const { z } = require("zod");

const updateUserValidation = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be at least 3 characters long")
    .max(100, "Fullname must be at most 100 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  role: z.enum(["user", "admin"]).default("user").optional(),
  email: z
    .string()
    .min(3, "Email must be at least 3 characters long")
    .max(50, "Email must be at most 50 characters long")
    .email("Email must be a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(60, "Password must be at most 60 characters long"),
});

module.exports = { updateUserValidation };

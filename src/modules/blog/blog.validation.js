const { z } = require("zod");

const createBlogSchema = z.object({
  bId: z.number().optional().default(0),
  author: z.object({
    id: z.string(),
    username: z.string(),
    fullname: z.string(),
  }),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(100, "Subtitle is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(24500, "Description is too long"),
  code: z.string().min(1, "Code is required").max(1000, "Code is too long"),
  image: z.string().optional(),
  url: z.string().optional(),
  metadata: z
    .object({
      tags: z.array(z.string()).optional(),
      category: z.array(z.string()).optional(),
    })
    .optional(),
  permissions: z
    .object({
      read: z.boolean().optional().default(true),
      write: z.boolean().optional().default(true),
      edit: z.boolean().optional().default(true),
      delete: z.boolean().optional().default(true),
    })
    .optional(),
  links: z
    .object({
      view: z.string().optional(),
      edit: z.string().optional(),
      delete: z.string().optional(),
    })
    .optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

module.exports = { createBlogSchema };

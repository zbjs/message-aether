const { z } = require("zod");

const createCommentSchema = z.object({
  cId: z.number().optional().default(0),
  author: z.object({
    id: z.string(),
    username: z.string(),
    fullname: z.string(),
  }),
  blogId: z.number(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(24500, "Description is too long"),
  code: z.string().optional(),
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
      delete: z.boolean().optional().default(true),
      update: z.boolean().optional().default(true),
      create: z.boolean().optional().default(true),
      admin: z.boolean().optional().default(false),
    })
    .optional(),
});

exports.createCommentSchema = createCommentSchema;

exports.createComment = (data) => createCommentSchema.safeParse(data);

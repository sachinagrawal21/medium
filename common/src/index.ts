import z from "zod";

//signup zod
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  name: z.string().optional()
});

export type SignupInput = z.infer<typeof signupInput>;

//signin zod
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20)
})

export type SigninInput = z.infer<typeof signinInput>;

//create blog zod
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>;

//update blog zod
export const updateBlogInput = z.object({
  id: z.number(),
  title: z.string().optional(),
  content: z.string().optional()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
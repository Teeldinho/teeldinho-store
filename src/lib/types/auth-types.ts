import * as z from "zod";

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
  token: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required." }) // Ensure the username field is not empty
    .max(100, { message: "Username must be 100 characters or less." }), // limit the maximum length of the username
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }) // Set minimum length for password
    .max(100, { message: "Password must be 100 characters or less." }), // limit the maximum length of the password
});

export type LoginType = z.infer<typeof LoginSchema>;

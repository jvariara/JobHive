import { z } from "zod";

export const UserValidator = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must be at most 30 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

export type TUserValidator = z.infer<typeof UserValidator>;

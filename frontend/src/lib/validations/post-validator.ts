import * as z from "zod";

export const CommentValidation = z.object({
  post: z.string().min(1).max(150, { message: "Maximum 150 characters" }),
});

import { z } from "zod"

export const contactReplySchema = z.object({
  replyMessage: z
    .string()
    .trim()
    .min(1, "Please enter your reply message before sending")
    .min(5, "Reply message must be at least 5 characters")
    .max(2000, "Reply message cannot exceed 2000 characters"),
})

export type ContactReplyFormValues = z.infer<typeof contactReplySchema>


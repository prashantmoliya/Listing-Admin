import { z } from "zod"

export const citySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "City name is required")
    .min(2, "City name must be at least 2 characters")
    .max(60, "City name must be under 60 characters"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .min(2, "Slug must be at least 2 characters")
    .max(60, "Slug must be under 60 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  stateCode: z
    .string()
    .min(1, "Please select an Indian state or union territory"),
  status: z.enum(["Active", "Inactive"]),
})

export type CityFormValues = z.infer<typeof citySchema>

import { z } from "zod"

export const UserInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  ethnicity: z.string(),
  nationality: z.string(),
  firstLang: z.string(),
  nextOfKinName: z.string(),
  nextOfKinEmail: z.string(),
  nextOfKinPhone: z.string(),
  contactPrefs: z.array(z.string()),
})

export const SignInSchema = z.object({
  email: z.string(),
})

import { z } from "zod"
import legals from "../data/legals.json"
import { Question } from "../types"

export const UserInputSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string(),
  gender: z.string(),
  ethnicity: z.string(),
  nationality: z.string(),
  firstLang: z.string(),
  nextOfKinName: z.string().min(1),
  nextOfKinEmail: z.string().min(1).email(),
  nextOfKinPhone: z
    .string()
    .min(1)
    .regex(
      /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
    ),
  contactPrefs: z.array(z.string()),
})

export const SignInSchema = z.object({
  email: z.string().email(),
})

export const LegalApplicationSchema = z.object({
  legals: z.array(z.string()).min(legals.length),
})

export const generateApplicationSchema = (questions: Question[]) => {
  const schema = {}

  questions.forEach(question => {
    if (question.required) {
      schema[question.name] = z.string().min(1)
    } else {
      schema[question.name] = z.string()
    }
  })

  return z.object(schema)
}

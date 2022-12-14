import { z } from "zod"
import legals from "../data/legals.json"
import { Question } from "../types"

export const UserInputSchema = z.object({
  firstName: z.string().min(1, "We need to know your first name"),
  lastName: z.string().min(1, "We need to know your last name"),
  dateOfBirth: z.string().min(1, "We need to know your date of birth"),
  gender: z.string(),
  ethnicity: z.string(),
  nationality: z.string(),
  firstLang: z.string(),
  nextOfKinName: z.string().min(1, "We need to know their name"),
  nextOfKinEmail: z
    .string()
    .min(1, "We need to know their email")
    .email("That doesn't look like a valid email"),
  nextOfKinPhone: z
    .string()
    .min(1, "We need to know their contact number")
    .regex(
      /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
      "That doesn't look like a valid email"
    ),
  contactPrefs: z.array(z.string()),
})

export const SignInSchema = z.object({
  email: z.string().email("That doesn't look like a valid email"),
})

export const LegalApplicationSchema = z.object({
  legals: z
    .array(z.string())
    .min(legals.length, "You need to accept all the terms before continuing"),
})

export const generateApplicationSchema = (questions: Question[]) => {
  const schema = {}

  questions.forEach(question => {
    if (question.required) {
      schema[question.name] = z
        .string({ invalid_type_error: "This is a required question" })
        .min(1, "This is a required question")
    } else {
      schema[question.name] = z.string()
    }
  })

  return z.object(schema)
}

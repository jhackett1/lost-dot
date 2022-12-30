import { Prisma, User } from "@prisma/client"
import { HTMLProps } from "react"

export enum PaymentType {
  expressionOfInterest = "expressionOfInterest",
  acceptance = "acceptance",
  remainder = "remainder",
}

export interface Race {
  id: string
  title: string
  hashtag: string
  date: string
  deadline: string
  logoUrl: string
  costs: {
    [type in PaymentType]: number
  }
}

export interface UserInput
  extends Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "emailVerified" | "admin" | "dateOfBirth"
  > {
  dateOfBirth: string // for input type=date
}

export interface Question extends HTMLProps<HTMLInputElement> {
  options?: string[]
}

const userWithApplications = Prisma.validator<Prisma.UserArgs>()({
  include: { applications: true },
})

export type UserWithApplications = Prisma.UserGetPayload<
  typeof userWithApplications
>

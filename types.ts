import { PaymentType, User } from "@prisma/client"
import { HTMLProps } from "react"

export interface Race {
  id: string
  title: string
  hashtag: string
  date: string
  logoUrl: string
  costs: {
    [kind in PaymentType]?: number
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

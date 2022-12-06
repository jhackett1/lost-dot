import { User } from "@prisma/client"
import { HTMLProps } from "react"

export interface Race {
  id: string
  brand: string
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

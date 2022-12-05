import { User } from "@prisma/client"
import { HTMLProps } from "react"

export interface Race {
  id: string
  brand: string
}

export type UserInput = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "emailVerified" | "admin"
>

export interface Question extends HTMLProps<HTMLInputElement> {
  options?: string[]
}

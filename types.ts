import { User } from "@prisma/client"

export interface Race {
  id: string
  brand: string
}

export type UserInput = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "emailVerified" | "admin"
>

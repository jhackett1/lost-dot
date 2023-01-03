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

const applicationWithUser = Prisma.validator<Prisma.ApplicationArgs>()({
  include: { user: true },
})

export type ApplicationWithUser = Prisma.ApplicationGetPayload<
  typeof applicationWithUser
>

const userWithApplicationsAndSessions = Prisma.validator<Prisma.UserArgs>()({
  include: { applications: true, sessions: true },
})

export type UserWithApplicationsAndSessions = Prisma.UserGetPayload<
  typeof userWithApplicationsAndSessions
>

export interface ApplicationAdminFilters {
  search: string
  race_id?: string
  type?: string
  [key: string]: any
}

export interface UserAdminFilters {
  search: string
  only_admins?: boolean
  only_with_applications?: boolean
  [key: string]: any
}

export enum ApplicationStatus {
  InProgress,
  Submitted,
  Completed,
}

export interface AdminAPIResponse<T> {
  count: number
  data: T
}

import { User } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    createdAt: string
    user: Pick<
      User,
      | "id"
      | "firstName"
      | "admin"
      | "customerId"
      | "onboardedAt"
      | "preferences"
    > &
      DefaultSession["user"]
  }
}

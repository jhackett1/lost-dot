import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import prisma from "../../../lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // pages: {
  //   signIn: "/auth/sign-in",
  //   // signOut: "/auth/signout",
  //   // error: "/auth/error", // Error code passed in query string as ?error=
  //   // verifyRequest: "/auth/verify-request", // (used for check email message)
  //   // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
}

export default NextAuth(authOptions)

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import prisma from "../../../lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/check-email",
  },
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
      sendVerificationRequest({ url }) {
        if (process.env.NODE_ENV === "development")
          console.log(`Sign in URL: ${url}`)
      },
    }),
  ],
}

export default NextAuth(authOptions)

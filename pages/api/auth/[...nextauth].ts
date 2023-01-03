import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User } from "@prisma/client"
import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { sendMagicLink } from "../../../lib/emails"
import { createCustomer } from "../../../lib/payments"
import prisma from "../../../lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/check-email",
  },
  callbacks: {
    session: async ({ session, user }) => {
      const u: User = user

      console.log(`session hook called`)

      // if the user doesn't have a customer id, give them one
      if (!u.customerId) {
        console.log(`user has no customer id`)

        const customer = await createCustomer()

        console.log(`customer ID IS ${customer.id}`)

        await prisma.user.update({
          where: {
            email: u.email,
          },
          data: {
            customerId: customer.id,
          },
        })

        console.log(`user ${u.email} updated with customer ID ✅`)
      }

      session.user.id = u.id
      session.user.firstName = u.firstName
      session.user.admin = u.admin
      session.user.customerId = u.customerId
      session.user.onboardedAt = u.onboardedAt

      return session
    },

    // signIn: async ({ user, account, profile, email, credentials }) => {
    //   const u: User = user

    //   console.log("firing signIn callback")

    //   return true
    // },
  },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ url, ...args }) => {
        if (process.env.NODE_ENV === "development")
          console.log(`Sign in URL: ${url}`) // for local dev

        await sendMagicLink({ url, ...args })
      },
    }),
  ],
}

export default NextAuth(authOptions)

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { captureException } from '@sentry/nextjs'

const prisma = new PrismaClient()

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(user) {
      if (process.env.MODERATOR_EMAILS.includes(user.email)) {
        return true
      }
      return false
    },
  },
  logger: {
    error(code, metadata) {
      captureException({ code, metadata })
    },
  },
})

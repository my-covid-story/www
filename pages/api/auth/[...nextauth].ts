import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  callbacks: {
    async signIn(user) {
      if (process.env.MODERATOR_EMAILS.includes(user.email)) {
        return true
      }
      return false
    },
  },
})

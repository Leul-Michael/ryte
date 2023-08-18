import NextAuth, {
  AuthOptions,
  getServerSession,
  type DefaultSession,
  DefaultUser,
} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** The user's id. */
      id: string
      username: string
      status: "ACTIVE" | "BLOCKED"
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser {
    id: string
    username: string
    status: "ACTIVE" | "BLOCKED"
  }
}

const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id
        session.user.name = user.name
        session.user.email = user.email
        session.user.image = user.image
        session.user.username = user.username
        session.user.status = user.status
      }

      return session
    },
    // authorized({ auth }) {
    //   return !!auth?.user // this ensures there is a logged in user for -every- request
    // },
    signIn({ user, account, credentials, email, profile }) {
      return true
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions

export const handler = NextAuth(nextAuthOptions)

export async function auth() {
  const session = await getServerSession(nextAuthOptions)
  return session
}

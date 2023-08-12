import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    },
    signIn({ user, account, credentials, email, profile }) {
      return true
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

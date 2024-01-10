import { NextAuthOptions, getServerSession } from 'next-auth'

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
          clientId: process?.env.GOOGLE_ID || "",
          clientSecret: process?.env.GOOGLE_SECRET || "",
        }),
      GithubProvider({
        clientId: process?.env.GITHUB_ID || "",
        clientSecret: process?.env.GITHUB_SECRET || "",
      }),
    ],
  }

  export const getAuthSession = () => getServerSession(authOptions)
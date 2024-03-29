import { User } from '@/lib/user-model';
import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
      strategy: 'jwt',
    },
    providers: [
      GoogleProvider({
          clientId: process?.env.GOOGLE_ID!,
          clientSecret: process?.env.GOOGLE_SECRET!,
        }),
      GithubProvider({
        clientId: process?.env.GITHUB_ID!,
        clientSecret: process?.env.GITHUB_SECRET!,
      }),
    ],
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user = {
            id: token.id || '',
            name: token.name,
            email: token.email,
            image: token.picture,
          } as User;
        }
  
        return session
      },
  
      async jwt({ token, user }) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email || '',
          },
        })
      
        if (user && !dbUser) {
          token.id = user.id || ''
          return token
        }
      
        if (dbUser && !dbUser.name) {
          await db.user.update({
            where: {
              id: dbUser.id,
            },
            data: {
              name: "Sukuna",
            },
          })
        }
      
        return dbUser ? {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        } : token
      },
      redirect() {
        return '/'
      },
    },
  }

  export const getAuthSession = () => getServerSession(authOptions)
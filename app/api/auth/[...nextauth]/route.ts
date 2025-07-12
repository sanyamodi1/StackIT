// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

// Mock user list for development/testing only
const mockUsers = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@stackit.com',
    password: 'stackit123' // plain-text for mock ONLY
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = mockUsers.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        )
        return user ?? null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.sub as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

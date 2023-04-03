import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials
        // TODO: axios call to backend
        const user = {
          id: '1234',
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'admin@123',
          role: 'admin'
        }
        if (email !== user.email || password !== user.password) {
          throw new Error('invalid credentials')
        }
        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/sign-in'
  }
}

export default NextAuth(authOptions)

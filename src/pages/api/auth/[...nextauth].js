import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials
        // TODO: axios call to backend

        if (email !== 'b@gmail.com' || password !== '123') {
          throw new Error('invalid credentials')
        }

        return {
          id: '1234',
          name: 'Brijesh Thakkar',
          email: 'b@gmail.com',
          role: 'admin'
        }
      }
    })
  ],
  pages: {
    signIn: '/sign-in'
  }
}

export default NextAuth(authOptions)

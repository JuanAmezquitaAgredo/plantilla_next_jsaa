import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          
          const response = await axios.post(`${process.env.API_URL}/auth/login`, {
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = response.data;

          
          if (user) {
            return user;
          }
          
          return null;
        } catch (error) {
          console.error('Error en la autenticación:', error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, 

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
});

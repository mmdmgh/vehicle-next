import User from "../../../../models/userModel.cjs";
import { connectDB } from "../../../../utils/connect";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials"



async function login(credentials) {
  try {
    await connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw (new Error("No such user"), console.log(credentials));
    }
    const isCorrect = await bcrypt.compare(credentials.password, user.password);

    if (!isCorrect) throw new Error("Invalid password");
    return user;
  } catch (error) {
    console.log("error while login");
    throw new Error("Something went wrong");
  }
}

export const authOptions = {
    
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            console.log("Missing credentials:", credentials);
            throw new Error("Must provide all the credentials.");
          }
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

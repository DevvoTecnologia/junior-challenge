import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

import axiosInstance from "./service/axiosInstance";
import type { LoginSuccess } from "./types/User";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      userId: number;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    userId: number;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId: number;
    username: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          placeholder: "Enter your username",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error("Missing username or password");
        }

        const response = await axiosInstance.post<LoginSuccess>(
          "/auth/login",
          credentials,
        );

        return {
          accessToken: response.data.accessToken,
          username: response.data.username,
          userId: response.data.userId,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.userId = user.userId;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.username = token.username;
      session.user.userId = token.userId;

      return session;
    },
  },
});

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { cookies } from "next/headers";
import AppError from "@/lib/utils/app-error";

export const authOptions : NextAuthOptions = {
  pages: {
    signIn: "/auth/login", 
    error: "/auth/error",
  },
  session: {
    strategy: "jwt"
  },
  debug: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });
        const payload: APIResponse<LoginResponse> = await response.json();
        console.log("Payload: ", payload);
      
        // Check if message is "success"
        if (payload.message === "success") {
          // Save the token in cookies separately
          (await cookies()).set("exam_token", payload.token, {
            httpOnly: true,
          });
      
          // Return user data alongside the token
          return {
            token: payload.token,
            ...payload.user,  // Add user data to the return
          };
        }

        // Otherwise, throw the error returned from the backend
        throw new AppError(payload.message, payload.statusCode);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.username = user.username;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.fullName = user.fullName;
        token.role = user.role;
        token.photo = user.photo;
        token.blocked = user.blocked;
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.username = token.username;
      session.email = token.email;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.fullName = token.fullName;
      session.role = token.role;
      session.photo = token.photo;
      session.blocked = token.blocked;
      session.id = token.id;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
import React from "react"
import NextAuthProvider from "./components/next-auth-provider";
import { EmailProvider } from "../context/components/email-context";

type ProviderProps = {
  children: React.ReactNode;
}

export default function Providers({children}: ProviderProps) {
  return (
    <EmailProvider>

    <NextAuthProvider>
      {children}
    </NextAuthProvider>
    </EmailProvider>
  )
}

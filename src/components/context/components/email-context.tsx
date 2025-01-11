"use client"
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type EmailContextProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");

  const value = useMemo(
    () => ({
      email,
      setEmail,
    }),
    [email]
  );

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmailContext must be used within an EmailProvider');
  }
  return context;
}

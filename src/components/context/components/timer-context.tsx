"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type of our context
type TimerContextType = {
  isTimeUp: boolean;
  setIsTimeUp: (value: boolean) => void;
}

// Create the context with undefined as the default value
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// TimerProvider component that provides state to children components
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  return (
    <TimerContext.Provider value={{ isTimeUp, setIsTimeUp }}>
      {children}
    </TimerContext.Provider>
  );
};


// Custom hook to consume the context
export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};

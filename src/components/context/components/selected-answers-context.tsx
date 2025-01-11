"use client"
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the context
type SelectedAnswersType = {
  selectedAnswers: object;
  setSelectedAnswers: Dispatch<SetStateAction<object>>; // Correctly type setSelectedAnswers
};

// Create the context
const SelectedAnswersContext = createContext<SelectedAnswersType | undefined>(undefined);

// Create a provider component
export const SelectedAnswersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<object>({}); // Shared state

  return (
    <SelectedAnswersContext.Provider value={{ selectedAnswers, setSelectedAnswers }}>
      {children}
    </SelectedAnswersContext.Provider>
  );
};

// Custom hook to use the context
export const useSelectedAnswers = () => {
  const context = useContext(SelectedAnswersContext);
  if (!context) {
    throw new Error("useSelectedAnswers must be used within a SelectedAnswersProvider");
  }
  return context;
};

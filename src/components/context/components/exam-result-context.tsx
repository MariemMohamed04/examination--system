/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Define the type of our context
type ExamResultContextType = {
  selectedAnswers: { [key: string]: string | null };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string | null }>>;
  incorrectQuestions: Question[];
  setIncorrectQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  correctAnswersCount: number;
  setCorrectAnswersCount: React.Dispatch<React.SetStateAction<number>>;
  incorrectAnswersCount: number;
  setIncorrectAnswersCount: React.Dispatch<React.SetStateAction<number>>;
  totalQuestionsCount: number;
  setTotalQuestionsCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with undefined as the default value
const ExamResultContext = createContext<ExamResultContextType | undefined>(undefined);

// ExamResultProvider component that provides state to children components
export const ExamResultProvider = ({ children }: { children: ReactNode }) => {
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState<number>(0);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState<number>(0);

const value = useMemo(
  () => ({
    selectedAnswers,
    setSelectedAnswers,
    incorrectQuestions,
    setIncorrectQuestions,
    correctAnswersCount,
    setCorrectAnswersCount,
    incorrectAnswersCount,
    setIncorrectAnswersCount,
    totalQuestionsCount,
    setTotalQuestionsCount,
  }),
  [selectedAnswers, incorrectQuestions, correctAnswersCount, incorrectAnswersCount, totalQuestionsCount]
);

  return (
    <ExamResultContext.Provider value={ value }>
      {children}
    </ExamResultContext.Provider>
  );
};


// Custom hook to consume the context
export const useExamResultContext = () => {
  const context = useContext(ExamResultContext);
  if (!context) {
    throw new Error('useExamResultContext must be used within a ExamResultProvider');
  }
  return context;
};

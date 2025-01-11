"use client"
import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

type ExamContextType = {
  selectedAnswers: { [key: string]: string | null };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string | null }>>;
  incorrectQuestions: Question[];
  setIncorrectQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const useExamContext = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExamContext must be used within an ExamProvider');
  }
  return context;
};

export const ExamProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);
  const [duration, setDuration] = useState(0.5); // or whatever default value you need

  const value = useMemo(
    () => ({
      selectedAnswers,
      setSelectedAnswers,
      incorrectQuestions,
      setIncorrectQuestions,
      duration,
      setDuration,
    }),
    [selectedAnswers, incorrectQuestions, duration]
  );

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

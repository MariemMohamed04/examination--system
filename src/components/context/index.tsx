import React from 'react';
import { TimerProvider } from './components/timer-context';
import { SelectedAnswersProvider } from './components/selected-answers-context';
import { ExamResultProvider } from './components/exam-result-context';


type ContextProvidersProps = {
  children: React.ReactNode;
}

export default function ContextProviders({children}: ContextProvidersProps) {
  return (
    <ExamResultProvider>

    <SelectedAnswersProvider>

    <TimerProvider>
      {children}
    </TimerProvider>
    </SelectedAnswersProvider>
    </ExamResultProvider>
  )
}

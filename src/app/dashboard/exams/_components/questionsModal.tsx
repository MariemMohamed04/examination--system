/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useReducer, useCallback } from 'react';
import Modal from '@/components/custom/modal-component';
import Loading from '@/components/common/loading-component';
import Image from 'next/image';
import Timer from '@/components/custom/timer-component';
import { checkQuestionsAction } from '@/lib/actions/questions.action';
import { useTimerContext } from "@/components/context/components/timer-context";
import QuestionContent from './questionConent';
import { useSelectedAnswers } from '@/components/context/components/selected-answers-context';
import ExamScoreModal from './examScoreModal';
import InstructionsModal from './instructionsModal';
import { useExamResultContext } from '@/components/context/components/exam-result-context';

type State = {
  questions: Question[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: Question[] }
  | { type: 'ERROR'; payload: string };

type QuestionsModalProps = {
  examId: string;
};

// Reducer for managing loading, data, and error states
const questionsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'SUCCESS':
      return { ...state, loading: false, questions: action.payload };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const QuestionsModal = ({ examId }: QuestionsModalProps) => {
  const { isTimeUp, setIsTimeUp } = useTimerContext();
  const { 
    selectedAnswers,
    setSelectedAnswers, 
    setIncorrectQuestions,  
    setCorrectAnswersCount, 
    setIncorrectAnswersCount, 
    setTotalQuestionsCount  } = useExamResultContext();

  // Use reducer to manage state
  const [state, dispatch] = useReducer(questionsReducer, {
    questions: [],
    loading: true,
    error: null,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isInstructionsModelOpen, setIsInstructionsModelOpen] = useState<boolean>(true);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState<boolean>(false);
  const [isExamScoreModalOpen, setIsExamScoreModalOpen] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  const handleStartExam = () => {
    setIsInstructionsModelOpen(false);
    setIsQuestionsModalOpen(true);
  };

  // Fetch questions from API
  const fetchQuestions = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(`/api/questions?exam=${examId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch questions');
      }
      const data = await response.json();
      dispatch({ type: 'SUCCESS', payload: data.questions });
      setDuration(0.5);
    } catch (error: any) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  }, [examId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);


  useEffect(() => {
    if (isTimeUp) {
      const incorrect = state.questions.filter(
        (question) => selectedAnswers[question._id] !== question.correct
      );
      setIncorrectQuestions(incorrect);

      const answersToSubmit = state.questions.map((question) => ({
        questionId: question._id,
        correct: selectedAnswers[question._id] || '',
      }));

      checkQuestionsAction({
        answers: answersToSubmit,
        time: duration,
      });

      setIsQuestionsModalOpen(false);
      setIsExamScoreModalOpen(true);
    }
  }, [isTimeUp, state.questions, selectedAnswers, duration]);


  // Handle answer change
  const handleAnswerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedKey = event.target.value; // The selected answer (e.g., 'A', 'B', etc.)
      const questionId: string = event.target.name; // The ID of the question
  
      // Update the selected answers using the context
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: selectedKey }));
    },
    [setSelectedAnswers]
  );
  

  // Handle next question or finish
  const handleNext = async () => {
    if (currentQuestionIndex < state.questions.length - 1) {
      // Go to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      
      const correctAnswers = state.questions.filter(
        (question) => selectedAnswers[question._id] === question.correct
      ).length;
      
      const incorrectAnswers = state.questions.length - correctAnswers;
      
      setCorrectAnswersCount(correctAnswers);
      setIncorrectAnswersCount(incorrectAnswers);
      setTotalQuestionsCount(state.questions.length);
      
      // End of questions: process and submit answers
      const answersToSubmit = state.questions.map((question: any) => ({
        questionId: question._id,
        correct: selectedAnswers[question._id] || "", // Get the selected answer or an empty string if unanswered
      }));
  
      // Identify incorrect answers
      const incorrect = state.questions.filter(
        (question) => selectedAnswers[question._id] !== question.correct // Compare user answer with correct answer
      );
      
          // Set incorrect questions in the context
          setIncorrectQuestions(incorrect);
  
      // Submit answers to the backend
      await checkQuestionsAction({
        answers: answersToSubmit,
        time: duration, // Include duration if required
      });
  
      // Close the modal, open the score modal, and mark the exam as finished
      setIsQuestionsModalOpen(false);
      setIsExamScoreModalOpen(true);
      setExamFinished(true); // Mark exam as completed
    }
  };
  

  // Handle back to previous question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = state.questions[currentQuestionIndex];

  return (
    <>
      {isInstructionsModelOpen && 
        <InstructionsModal 
          isModalOpen={isInstructionsModelOpen}
          onClose={() => setIsInstructionsModelOpen(false)}
          onOpenModel={handleStartExam}
        />
      }

      {isQuestionsModalOpen && (
        <Modal isModalOpen={true}>
          <div>
            <div className="flex items-center justify-between mb-[27px]">
              <h6 className="text-sm font-medium text-[#4461F2]">
                Question <span>{currentQuestionIndex + 1} of {state.questions.length}</span>
              </h6>
              <div className="flex">
                <Image src="/assets/icons/clock.png" alt="clock" width={24} height={0} className="pr-[3px]" />
                <Timer duration={duration} />
              </div>
            </div>
            {state.loading ? (
              <Loading />
            ) : state.error ? (
              <div className="text-red-500 font-medium">Error: {state.error}</div>
            ) : currentQuestion ? (
              <div>
                <div className="mb-12">
                  <ul className="flex items-center justify-center">
                    {state.questions.map((_, index) => (
                      <li
                        key={index}
                        className={`w-2 h-2 mx-2 rounded-full ${index <= currentQuestionIndex ? 'bg-[#4461F2]' : 'bg-[#D9D9D9]'}`}
                      />
                    ))}
                  </ul>
                </div>
                <QuestionContent
                  question={currentQuestion}
                  selectedAnswers={selectedAnswers}
                  handleAnswerChange={handleAnswerChange}
                />
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={handleBack}
                    type="button"
                    className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentQuestionIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    type="button"
                    className={`w-[295px] h-[56px] rounded-full border text-2xl font-medium ${!selectedAnswers[currentQuestion._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedAnswers[currentQuestion._id]}
                  >
                    {currentQuestionIndex === state.questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </Modal>
      )}

      {isExamScoreModalOpen && (
        <ExamScoreModal
          isModalOpen={isExamScoreModalOpen}
          
        />
      )}
    </>
  );
};

export default QuestionsModal;

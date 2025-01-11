/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useExamResultContext } from "@/components/context/components/exam-result-context";
import React, { useEffect, useState } from "react";

type ExamResultModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

const ExamResultModal: React.FC<ExamResultModalProps> = ({ isModalOpen, onClose }) => {
  const { selectedAnswers, incorrectQuestions } = useExamResultContext();
  if (!isModalOpen) return null;

  const getAnswerClass = (question: Question, answerKey: string): string => {
    const correctKey = question.correct;
    const selectedKey = selectedAnswers[question._id];

    if (answerKey === correctKey) return "correct-answer-bg correct-answer-border";
    if (answerKey === selectedKey && answerKey !== correctKey) return "incorrect-answer-bg incorrect-answer-border";
    return "bg-[#EDEFF3]"; // Default style
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 w-fit h-fit rounded-[20px]">
        <div className="cards-container max-h-[500px] overflow-y-auto">
          <div className="cards grid grid-cols-2 gap-10">
            {incorrectQuestions.map((question) => {
              const selectedAnswer = selectedAnswers[question._id];
              return (
                <div
                  key={question._id}
                  className="shadow-[0px_0px_8px_0px_#2A292940] w-[343px] h-fit py-3 px-2 rounded-[10px] bg-[#f9f9f9]"
                >
                  <h6 className="text-2xl font-medium text-[#0F0F0F] mb-4">{question.question}</h6>
                  <ul>
                    {question.answers.map((answer) => (
                      <li
                        key={answer.key}
                        className={`flex items-center p-5 mb-4 rounded-[10px] text-xl font-normal text-[#0F0F0F] border-2 ${getAnswerClass(question, answer.key)}`}
                      >
                        <input
                          type="radio"
                          id={`custom-radio-${answer.key}`}
                          name={`question-${question._id}`}
                          checked={selectedAnswer === answer.key}
                          disabled
                          className="mr-2"
                        />
                        <label htmlFor={`custom-radio-${answer.key}`}>
                          {answer.answer}
                          {answer.key === question.correct && (
                            <span className="text-green-500 ml-2">(Correct)</span>
                          )}
                          {answer.key === selectedAnswer && answer.key !== question.correct && (
                            <span className="text-red-500 ml-2">(Incorrect)</span>
                          )}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-[#4461F2] rounded-[10px] py-2 px-6 text-white font-medium text-lg mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExamResultModal;

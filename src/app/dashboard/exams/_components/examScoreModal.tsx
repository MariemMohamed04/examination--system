/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from '@/components/custom/modal-component';
import IncorrectAnswersModal from './examResultModal';
import { useExamResultContext } from '@/components/context/components/exam-result-context';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

type ExamScoreModalProps = {
  isModalOpen: boolean;
}

const ExamScoreModal: React.FC<ExamScoreModalProps> = ({
  isModalOpen,
}) => {
  const { correctAnswersCount, incorrectAnswersCount, totalQuestionsCount } = useExamResultContext();
  const correctPercentage = Math.round((correctAnswersCount / totalQuestionsCount) * 100);
  const inCorrectPercentage = Math.round((incorrectAnswersCount / totalQuestionsCount) * 100);
  const data = {
    datasets: [
      {
        label: "Quiz Progress",
        data: [correctPercentage, inCorrectPercentage],
        backgroundColor: ["#02369C", "#CC1010"],
        borderColor: ["#02369C", "#CC1010"],
        borderWidth: 1,
      },
    ],
  };
  const [isExamScoreModalOpen, setIsExamScoreModalOpen] = useState(true);
  const [isIncorrectAnswersModalOpen, setIsIncorrectAnswersModalOpen] = useState(false);

  const handleIncorrectAnswers = () => {
    setIsExamScoreModalOpen(false);
    setIsIncorrectAnswersModalOpen(true);
  }

  return (
    <>
    {
      isExamScoreModalOpen &&
      <Modal isModalOpen={isModalOpen}>
        <div>
          <h3 className="text-2xl font-medium text-[#0F0F0F]">Your Score</h3>
        </div>
        <div className="my-12 flex items-center justify-center gap-20">
          <div className="chart relative" style={{ width: "132px", height: "132px" }}>
            <Doughnut
              data={data}
              options={{
                maintainAspectRatio: false,
              }}
            />
            <p className="absolute inset-0 flex items-center justify-center text-[#373737] font-medium text-xl mt-2">
              {correctPercentage}%
            </p>
          </div>

          <div className="">
            <div className="flex items-center justify-between gap-8 ">
              <p className="text-2xl font-medium text-[#02369C]">Correct</p>
              <p className="text-base font-medium text-[#02369C]">
                {correctAnswersCount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-8 ">
              <p className="text-2xl font-medium text-[#CC1010]" >Incorrect</p>
              <span className="text-base font-medium  text-[#CC1010]">
                {incorrectAnswersCount}
              </span>
            </div>            
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="w-[311px] h-[56px] rounded-[100px] text-[#02369C] text-lg font-medium border border-blue-700"
            onClick={() => {}}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-[#4461F2] w-[311px] h-[56px] rounded-[100px] text-white text-lg font-medium"
            onClick={handleIncorrectAnswers}
          >
            Show Results
          </button>
        </div>
      </Modal>
    }
      {isIncorrectAnswersModalOpen &&
        <IncorrectAnswersModal
          isModalOpen={isIncorrectAnswersModalOpen}
          onClose={() => setIsIncorrectAnswersModalOpen(false)}
        />
      }
    </>
  )
}

export default ExamScoreModal;

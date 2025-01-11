import React from 'react';

type QuestionContentProps = {
  question: Question;
  selectedAnswers: { [key: string]: string | null };
  handleAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const QuestionContent: React.FC<QuestionContentProps> = ({ question, selectedAnswers, handleAnswerChange }) => (
  <div>
    <h2 className="text-[#0F0F0F] font-medium mb-6 text-2xl">{question.question}</h2>
    <ul className="mb-12">
      {question.answers.map((answer, index) => (
        <li
          key={index}
          className="flex items-center bg-[#EDEFF3] p-4 mb-4 rounded-md text-xl font-normal text-[#0F0F0F]"
        >
          <input
            type="radio"
            id={`answer-${index}`}
            name={question._id}
            value={answer.key}
            checked={selectedAnswers[question._id] === answer.key}
            onChange={handleAnswerChange}
            className="mr-3 h-5 w-5 text-[#4461F2] focus:ring-2 focus:ring-[#4461F2] cursor-pointer"
          />
          <label htmlFor={`answer-${index}`} className="cursor-pointer">
            {answer.answer}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default QuestionContent;

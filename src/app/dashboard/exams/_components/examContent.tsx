/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuestionsModal from "./questionsModal";
import dynamic from "next/dynamic";

interface Exam {
  _id: string;
  title: string;
  duration: number;
  numberOfQuestions: number;
  active: boolean;
}

const ExamsContent = () => {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const [exams, setExams] = useState<Exam[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  
  const frontendQuiz = ["HTML Quiz", "CSS Quiz", "Javascript Quiz"];
  const frameworkQuiz = ["React Quiz", "Angular Quiz"];
  const frontendExams = exams.filter((exam) =>
    frontendQuiz.includes(exam.title || "")
  );
  const frameworkExams = exams.filter((exam) =>
    frameworkQuiz.includes(exam.title || "")
  );

  useEffect(() => {
    if (!subjectId) {
      setError("Subject ID is missing");
      return;
    }

    const fetchExams = async () => {
      try {
        const response = await fetch(`/api/exams?subject=${subjectId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch exams");
        }

        const data = await response.json();
        setExams(data.exams || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching exams.");
      }
    };

    fetchExams();
  }, [subjectId]);

  const handleStartExam = (examId: string) => {
    setSelectedExamId(examId);
    setIsQuestionsModalOpen(true);
  };



  if (error) {
    return <div className="text-red-500 font-medium">Error: {error}</div>;
  }

  return (
    <>
      {/* Questions Modal */}
      {isQuestionsModalOpen && selectedExamId && (
  <QuestionsModal
    examId={selectedExamId}
    onClose={() => setIsQuestionsModalOpen(false)}
  />
)}

      <div className="w-[1063px] mb-9">
        <div>
          {frontendExams.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-[#0F0F0F] text-[18px] mb-6">
                Front-End Quiz
              </h4>
              {frontendExams.map((exam) => (
                <div
                  key={exam._id}
                  className="rounded-[10px] h-[103px] py-4 px-6 shadow-[0px_15px_40px_0px_rgba(42,41,41,0.05)] flex items-center justify-between bg-white mb-6"
                >
                  <div>
                    <h6 className="text-base font-medium">{exam.title}</h6>
                    <span className="text-[13px] font-normal">
                      {exam.numberOfQuestions} Questions
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[13px] font-normal">
                      {exam.duration} Minutes
                    </span>
                    <div className="bg-[#4461F2] flex items-center justify-center w-[77px] h-[23px] rounded-[10px] py-1 px-6 mt-2">
                      <button
                        className="text-xs text-white font-medium"
                        type="button"
                        onClick={() => handleStartExam(exam._id)}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {frameworkExams.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-[#0F0F0F] text-[18px] mb-6">
                Framework Quiz
              </h4>
              {frameworkExams.map((exam) => (
                <div
                  key={exam._id}
                  className="rounded-[10px] h-[103px] py-4 px-6 shadow-[0px_15px_40px_0px_rgba(42,41,41,0.05)] flex items-center justify-between bg-white mb-6"
                >
                  <div>
                    <h6 className="text-base font-medium">{exam.title}</h6>
                    <span className="text-[13px] font-normal">
                      {exam.numberOfQuestions} Questions
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[13px] font-normal">
                      {exam.duration} Minutes
                    </span>
                    <div className="bg-[#4461F2] flex items-center justify-center w-[77px] h-[23px] rounded-[10px] py-1 px-6 mt-2">
                      <button
                        className="text-xs text-white font-medium"
                        type="button"
                        onClick={() => handleStartExam(exam._id)}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {frontendExams.length === 0 && frameworkExams.length === 0 && (
            <p className="font-medium text-[#0F0F0F] text-[18px]">
              No exams available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamsContent;

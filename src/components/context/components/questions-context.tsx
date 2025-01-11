// 'use client'
// import { createContext, ReactNode, useState } from "react"

// export const QuestionsContext = createContext(null);


// export default function QuestionsProvider({ children }: { children: ReactNode }) {

// const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);



// const handleAnswerSelect = (questionId: any, answerKey: any) => {
//     const storedanswer=  {
//       questionId:questionId,
//       correct: answerKey
//   }
//     setSelectedAnswers( (prev) => {
//       return [...prev,storedanswer]
//       }
//       );

//     console.log(selectedAnswers)

    
//   };


//   return  <QuestionsContext.Provider value={{handleAnswerSelect,selectedAnswers}}> {children} </QuestionsContext.Provider>
  
// }
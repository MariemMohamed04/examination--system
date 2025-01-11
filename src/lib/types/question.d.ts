declare type Question = {
  question: string;
  answers: Answer[];
  exam: string;
  correct: string;
} & DatabaseFields;

declare type CheckAnswers = {
  questionId: string;
  correct: string;
}
declare type CheckQuestionsFields = {
  answers: CheckAnswers[];
  time: number;
}
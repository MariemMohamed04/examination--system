declare type Exam = {
  title: string,
  duration: number,
  subject: string,
  numberOfQuestions: number,
  active: boolean,
} & DatabaseFields;

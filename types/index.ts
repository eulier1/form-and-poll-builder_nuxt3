export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: Date;
}

export type QuestionType = 'short-answer' | 'long-answer' | 'number' | 'radio';

export interface FormQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For radio questions
}

export interface Form {
  id: string;
  title: string;
  questions: FormQuestion[];
  createdAt: Date;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: {
    questionId: string;
    value: string | number;
  }[];
  submittedAt: Date;
} 
import { create } from "zustand";

export type QuestionType = {
  id: number;
  title: string;
  contents: string;
  writer: string;
  timestamp: number;
  answer: string | null;
};

type StoreState = {
  questions: QuestionType[];

  updateAnswer: (id: number, answer: string | null) => void;
  setQuestion: (questions: QuestionType[]) => void;
};

export const useQuestionInfoStore = create<StoreState>((set, get) => ({
  questions: [],

  updateAnswer: (id, answer) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, answer } : q
      ),
    })),

  setQuestion: (questions) => set({ questions }),
}));

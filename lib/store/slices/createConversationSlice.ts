import { StateCreator } from "zustand";
import type { IQnA } from "../../types/basic";

export interface Conversation {
  breakPoints: number[]
  scriptText: string
  qnas: IQnA[]
}

export interface ConversationActions {
  addBreakPoint: (index: number) => void
  addQuestions: (questions: IQnA[]) => void
  answerQuestions: () => void
  setLastIndex: (index: number) => void
}

export const createConversationSlice: StateCreator<
  Conversation & ConversationActions
> = (set) => ({
  breakPoints: [],
  scriptText: '',
  qnas: [],
  addBreakPoint: (index: number) => set((state) => {
    return { breakPoints: [...state.breakPoints, index] }
  }),
  addQuestions: (questions) => set((state) => {
    return { qnas: [...state.qnas, ...questions] }
  }),
  answerQuestions: () => ([]), // TODO
  setLastIndex: (index: number) => 0 // TODO
})

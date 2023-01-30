import { StateCreator } from "zustand";
import type { IQnA } from "../../types/basic";

export interface Conversation {
  breakPoints: number[]
  scriptText: string
  qnas: IQnA[]
}

export interface ConversationActions {
  addBreakPoint: (index: number) => void
  addQnA: (qna: IQnA) => void
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
  addQnA: (qna: IQnA) => ([]), // TODO
  answerQuestions: () => ([]), // TODO
  setLastIndex: (index: number) => 0 // TODO
})

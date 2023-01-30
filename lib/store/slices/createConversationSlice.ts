import { StateCreator } from "zustand";
import type { IQnA } from "../../types/basic";

export interface Conversation {
    lastIndex: number
    text: string
    qnas: IQnA[]
  }
  
export interface ConversationActions {
    saveText: (text: string) => void
    addQnA: (qna: IQnA) => void
    answerQuestions: () => void
    setLastIndex: (index: number) => void
}

  export const createConversationSlice: StateCreator<
  Conversation & ConversationActions
> = (set) => ({
    lastIndex: -1,
    text: '',
    qnas: [],
    saveText: (text: string) => set({ text }),
    addQnA: (qna: IQnA) => ([]), // TODO
    answerQuestions: () => ([]), // TODO
    setLastIndex: (index: number) => 0 // TODO
  })

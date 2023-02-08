import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { IQnA, BetweenBreakPoints, IParagraph } from '../../types/basic'

interface IConversation {
    isAILoading: boolean;
    conversations: IQnA[];
}

interface IConversationActions {
    setIsAILoading: (isLoading: boolean) => void
    addQuestion: (question: string) => void
    answerQuestion: (answer: string) => void
}

const useClipboardStore = create<IConversation & IConversationActions>()(
    immer(
        devtools((set) => {
            return ({
                isAILoading: false,
                conversations: [],
                setIsAILoading: (isLoading) => set((state) => {
                    state.isAILoading = isLoading
                }),
                addQuestion: (question) => set((state) => {
                    state.conversations.unshift({
                        question,
                        answer: 'null',
                    })
                }),
                answerQuestion: (answer) => set((state) => {
                    state.conversations[0].answer = answer
                }),
            })
        }
        ))
)

export default useClipboardStore
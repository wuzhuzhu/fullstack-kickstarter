import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { IQnA, BetweenBreakPoints, IParagraph } from '../../types/basic'
interface IConversation {
    isAILoading: boolean;
    breakPoints: number[]
    paragraphs: IParagraph[]
}

interface IConversationActions {
    setIsAILoading: (isLoading: boolean) => void
    addBreakPoint: (index: number) => void
    addQuestions: (questions: string[], betweenBreakPints: BetweenBreakPoints) => void
    answerQuestions: () => void
}

const useConversationStore = create<IConversation & IConversationActions>()(
    immer(
        devtools((set) => {
            return ({
                isAILoading: false,
                breakPoints: [],
                paragraphs: [],
                setIsAILoading: (isLoading) => set((state) => {
                    state.isAILoading = isLoading
                }),
                addBreakPoint: (index: number) => set((state) => {
                    state.breakPoints.push(index)
                }),
                addQuestions: (questions = [], betweenBreakPoints = [0, 0]) => set((state) => {
                    const newQnas = questions
                        .filter(question => question !== 'Null')
                        .map(question => ({ question }))
                    state.paragraphs.push({
                        betweenBreakPoints,
                        qnas: newQnas,
                    })
                }),
                answerQuestions: () => ([]), // TODO
            })
        }
        ))
)

export default useConversationStore
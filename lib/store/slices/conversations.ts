import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { IQnA, BetweenBreakPoints, IParagraph } from '../../types/basic'

interface IConversation {
    breakPoints: number[]
    paragraphs: IParagraph[]
}

interface IConversationActions {
    addBreakPoint: (index: number) => void
    addQuestions: (questions: string[], betweenBreakPints: BetweenBreakPoints) => void
    answerQuestions: () => void
}

const useConversationStore = create<IConversation & IConversationActions>()(
    immer(
        devtools((set) => {
            return ({
                breakPoints: [],
                paragraphs: [],
                addBreakPoint: (index: number) => set((state) => {
                    state.breakPoints.push(index)
                }),
                addQuestions: (questions, betweenBreakPoints) => set((state) => {
                    const newQnas = questions.map(question => ({ question }))
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
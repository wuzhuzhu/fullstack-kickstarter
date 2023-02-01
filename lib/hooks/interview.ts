import React, { useState, useEffect } from "react";
import fetcher from "../fetcher";
import { BREAK_POINTS_REDUNDANT } from "../utils/config";
import useConversationStore from "../store/slices/conversations";

export const useOpenAIFetch = (textToSend: string) => {
    debugger
    const isAILoading = useConversationStore.getState().isAILoading
    const setIsAILoading = useConversationStore.getState().setIsAILoading
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState(null);

    debugger
    if (!textToSend) return;
    if (isAILoading) return;
    useEffect(() => {
        setIsAILoading(true);
        fetcher(
            "/api/interview/get-questions",
            "post",
            {
                text: textToSend,
            })
            .then(({ questions }) => {
                debugger
                setQuestions(questions);
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setIsAILoading(false);
            })
    }, [textToSend]);
    return { questions, error };
};

export const goGetQuestions1 = (transcript: string) => {
    const isAILoading = useConversationStore((state) => state.isAILoading);
    const setIsAILoading = useConversationStore((state) => state.setIsAILoading);
    const breakPoints = useConversationStore((state) => state.breakPoints);
    const addBreakPoint = useConversationStore((state) => state.addBreakPoint);
    const addQuestions = useConversationStore((state) => state.addQuestions);
    if (isAILoading) return;
    // 1. get current transcript length as a new break point, add to brewkPoints array
    const currentLength = transcript.length;
    const lastBreakPointIndex = breakPoints[breakPoints.length - 1] || 0;
    if (
        currentLength > 0 &&
        currentLength > lastBreakPointIndex // has some new content
    ) {
        // 2. get the piece of text of transcript between the last 2 breakpoints
        // bring a little bit more text to the AI, make the input more likely complete
        const sliceStartPoint = getSliceStartPoint(lastBreakPointIndex);

        const textToSend = transcript.slice(sliceStartPoint, currentLength);
        console.log("textToSend", textToSend);
        // 3. send that piece of text to the AI
        const { questions, error } = useOpenAIFetch(textToSend);
        debugger
        addQuestions(questions, [sliceStartPoint, currentLength]);
        addBreakPoint(currentLength);


    };
}

// functions
function getSliceStartPoint(lastBreakPointIndex: number): number {
    return lastBreakPointIndex - BREAK_POINTS_REDUNDANT > 0
        ? lastBreakPointIndex - BREAK_POINTS_REDUNDANT
        : lastBreakPointIndex;
}
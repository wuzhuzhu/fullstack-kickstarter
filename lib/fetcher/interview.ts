import fetcher from "../../lib/fetcher";

export async function getAnswerByQuestionFetcher(question: string) {
    // console.log(1.1)
    try {
        const { answer } = await fetcher(
            "/api/interview/get-answer-clipboard",
            'post',
            {
                question
            }
        )
        // console.log(1.2, answer)
        return answer
    } catch (e) {
        console.error('GetAnswerByQuestionFetcher error', e.message)
        throw new Error(e.message)
    }

}
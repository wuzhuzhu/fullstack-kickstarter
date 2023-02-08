import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import openai from '../../../lib/openai';
import { DEFAULT_OPENAI_PARAMS, QUESTION_PREFIX } from '../../../lib/utils/config';
import type { CreateCompletionRequest, CreateCompletionResponse } from 'openai'
import { PromptConfig } from '../../../lib/types/basic'

interface IGeneratePromptParams {
    question: string
    config?: PromptConfig
}

const defaultConfig: PromptConfig = {
    knowledgeDomain: 'frontend',
    language: 'zh-CN',
    programmingLanguage: 'javascript',
    framework: 'react'
}

const generateGetQuestionsPrompt = ({ question, config = defaultConfig }: IGeneratePromptParams) => {
    const prompt = `
    Act as an expert professional candidate. I will ask me the interview question for the ${config.knowledgeDomain} position, I want you to only reply as the candidate.
    reply me ONLY the formatted code in ${config.framework} framwork in ${config.programmingLanguage} language. 
    add some comment in code for explanation if you think it's necessary.
    my question is: ${question}
  `
    return prompt
}

export default async function getAnswersOfClipboard(req: NextApiRequest, res: NextApiResponse<{ message: string, answer?: string }>) {
    const session = await getSession({ req })
    const { question, prevQuestions } = req.body
    console.log('text from textarea', question)
    if (session) {
        try {
            const response = await openai.createCompletion({
                ...DEFAULT_OPENAI_PARAMS,
                // model: 'code-davinci-002',
                prompt: generateGetQuestionsPrompt({ question }),
            });
            const answer = response?.data?.choices?.[0]?.text
            console.log('Log in next api route', { question, answer })
            res.status(200).json({ message: 'OK', answer })
        } catch (e) {
            console.error('error', e.message)
        }
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}

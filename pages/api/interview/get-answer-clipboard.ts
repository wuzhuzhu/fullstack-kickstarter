import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import openai from '../../../lib/openai';
import { DEFAULT_OPENAI_PARAMS, QUESTION_PREFIX } from '../../../lib/utils/config';
import type { CreateCompletionRequest, CreateCompletionResponse } from 'openai'
import { PromptConfig } from '../../../lib/types/basic'
import fetcher from '../../../lib/fetcher';
import { copyFile } from 'fs';

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
    reply me ONLY the formatted code in ${config.framework} framwork in ${config.programmingLanguage} language, which could been consumed by the react-code-blocks. 
    Do not explain any outside the code block, explain the code with inline comments besides the code.
    my question is: ${question}
  `
    return prompt
}

export default async function getAnswersOfClipboard(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    const { question, prevQuestions } = req.body
    console.log('text from textarea', question)
    if (session) {
        try {
            const response = await openai.createCompletion({
                ...DEFAULT_OPENAI_PARAMS,
                prompt: generateGetQuestionsPrompt({ question }),
            });
            const answer = response?.data?.choices?.[0]?.text
            console.log({ question, answer })
            res.status(200).json({ message: 'OK', answer })
        } catch (e) {
            console.error('error', e.message)
        }
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}

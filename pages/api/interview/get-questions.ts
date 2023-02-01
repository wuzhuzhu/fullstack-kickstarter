import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import openai from '../../../lib/openai';
import { DEFAULT_OPENAI_PARAMS, QUESTION_PREFIX } from '../../../lib/utils/config';
import type { CreateCompletionRequest, CreateCompletionResponse } from 'openai'
import { PromptConfig } from '../../../lib/types/basic'
import { copyFile } from 'fs';

interface IGeneratePromptParams {
  text: string
  prevQuestions: string[]
  config?: PromptConfig
}

const defaultConfig: PromptConfig = {
  knowledgeDomain: 'frontend',
  language: 'zh-CN',
  programmingLanguage: 'javascript',
  framework: 'react'
}

const generateGetQuestionsPrompt = ({ text, prevQuestions = [], config = defaultConfig }: IGeneratePromptParams) => {
  const prompt = `
  Task description: This is the content recognized from the audio clip. You need to strictly follow the 6 requirements below to process this text into a list of questions.
  1,Remove meaningless and non-${config.knowledgeDomain} related parts, correct potential speech recognition errors
  2,Questions translated into: ${config.language}. Eliminate duplicate questions
  3,Result must not include: ${prevQuestions?.length && prevQuestions.join('; ')}
  4,Format: Each question should occupy one line, start with ${QUESTION_PREFIX}, and end with a line break. 
  Make sure that the internal content of each question does not contain the beginning and end identifiers.
  Examples:
  输入：
  例instance,但是永远也不要需要直接创造一个组件实例，因为react帮我们做了这。8, Ract 恩 create class和extends conponents的，就是简要回答下他俩的，区别有哪些？浏览器的渲染原理？
  回答：
  ${QUESTION_PREFIX} React.createClass和 extends Components的区别有哪些？
  ${QUESTION_PREFIX} 浏览器的渲染原理？
  输入：
  开发机嘛？fdasjl，后端大佬希望喜欢😍下班做什么？
  回答：
  ${QUESTION_PREFIX} Null
  输入：${text}
  回答：
  `
  return prompt
}

export default async function getQuestions(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const { text, prevQuestions } = req.body
  console.log('text from voice recognition', text)
  if (session) {
    try {
      const response = await openai.createCompletion({
        ...DEFAULT_OPENAI_PARAMS,
        prompt: generateGetQuestionsPrompt({ text, prevQuestions }),
      });
      console.log(response?.data?.choices?.[0]?.text)
      const questions = response?.data?.choices?.[0]?.text?.split('\n')
        .map(item => item.trim())
        .filter((item) => item.startsWith(QUESTION_PREFIX))
        .map(item => item.replace(QUESTION_PREFIX, ''))
      res.status(200).json({ message: 'OK', questions })
    } catch (e) {
      console.error('error', e.message)
    }
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
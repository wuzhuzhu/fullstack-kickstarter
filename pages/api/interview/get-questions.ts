import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import openai from '../../../lib/openai';
import { OPENAI_DEFAULT_MODEL } from '../../../lib/utils/config';

export default async function getQuestions(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const { text, tada } = req.body
  console.log('text', text, tada)
  if (session) {
    console.log('a registered user', session.user?.name)
    const response = await openai.createCompletion({
      model: OPENAI_DEFAULT_MODEL,
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 7,
    });
    console.log(response.data)
    res.status(200).json({ message: 'OK', res: response.data })
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
import { CreateCompletionRequest } from 'openai'
// open-ai

// The number of redundant characters brought to the OpenAI API.
export const BREAK_POINTS_REDUNDANT = 10

// The prefix of each generated questions
export const QUESTION_PREFIX = "[Question]: "

// the params of openai sdk
export const DEFAULT_OPENAI_PARAMS: Omit<CreateCompletionRequest, 'prompt'> = {
    // possible options: [text-ada-001, text-babbage-001, text-curie-001, text-davinci-003]
    model: 'text-davinci-003',
    temperature: 0.7,
    max_tokens: 1000,
}
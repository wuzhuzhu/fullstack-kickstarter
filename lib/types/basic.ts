export type PositiveNumber = number & { __positiveNumberBrand: any };
export type NonNegativeNumber = number & { __nonNegativeNumberBrand: any };

export type BetweenBreakPoints = [number, number]

export interface IParagraph {
    betweenBreakPoints: BetweenBreakPoints
    qnas: IQnA[]
}
export interface IQnA {
    question: string
    answer?: string
    betweenBreakPoints: BetweenBreakPoints
}

export interface PromptConfig {
    knowledgeDomain: 'frontend' | 'backend' | 'fullstack' | 'design' | 'product' | 'operations' | 'hr' | 'other'
    language: 'zh-CN' | 'en-US'
    programmingLanguage: 'javascript' | 'typescript' | 'python' | 'ruby' | 'java' | 'csharp' | 'go' | 'php' | 'swift' | 'kotlin' | 'scala' | 'rust' | 'dart' | 'other'
    framework: 'react' | 'vue' | 'angular' | 'ember' | 'svelte' | 'next' | 'nuxt' | 'gatsby' | 'other'
}
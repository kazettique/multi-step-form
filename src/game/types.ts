import type { FormQuestionModel } from './validator'

export enum Party {
  DPP = 'DPP',
  KMT = 'KMT',
  TPP = 'TPP',
  GTM = 'GTM',
  // KMT_TPP_COMBI = 'KMT_TPP_COMBI',
  // TPP_KMT_COMBI = 'TPP_KMT_COMBI'
}

export type PartyType = `${Party}`

export interface QuestionBase {
  questionId: number
}

export interface OptionBase {
  title: string
}

export interface CommonOption extends OptionBase {
  party: PartyType[]
}

export interface RawCommonQuestion {
  title: string
  options: [CommonOption, CommonOption, CommonOption]
}

export interface CommonQuestion extends RawCommonQuestion, QuestionBase {}

export interface RawPartyQuestion {
  title: string
  answerId: number
  options: [OptionBase, OptionBase, OptionBase]
}

export interface PartyQuestion extends RawPartyQuestion, QuestionBase {}

export interface QuestionItem {
  questionId: number
  answerId: number
  playerAnswer: number
  options: {
    optionId: number
    title: string
  }[]
  title: string
}

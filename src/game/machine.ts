import { assign, createMachine } from 'xstate'
import {
  commonQuestionList,
  dppQuestionList,
  gtmQuestionList,
  kmtQuestionList,
  rawDppQuestionList,
  rawGtmQuestionList,
  rawKmtQuestionList,
  rawTppQuestionList,
  tppQuestionList
} from './constants'
import type {
  CommonQuestion,
  PartyQuestion,
  PartyType,
  QuestionItem,
  RawPartyQuestion
} from './types'
import type { FormQuestionModel } from './validator'
import { genPartyQuestionList, shuffle } from '@/utils'

// enum Question {
//   Q01 = 'Q01',
//   Q02 = 'Q02',
//   Q03 = 'Q03',
//   Q04 = 'Q04',
//   Q05 = 'Q05',
//   Q06 = 'Q06',
//   Q07 = 'Q07',
//   Q08 = 'Q08',
//   Q09 = 'Q09',
//   Q10 = 'Q10'
// }

enum Question {
  Q01 = 1,
  Q02,
  Q03,
  Q04,
  Q05,
  Q06,
  Q07,
  Q08,
  Q09,
  Q10
}

type QuestionKey = `${Question}`

export type MachineContext = {
  form: {
    [questionKey in QuestionKey]: FormQuestionModel | null
  }
  chosenParty: PartyType | null
  result: number
  resultFromBackEnd: number
}

export type MachineEvent =
  | { type: 'TO_Q01'; formValues: PartyType }
  | { type: 'TO_Q02'; formValues: FormQuestionModel }
  | { type: 'TO_Q03'; formValues: FormQuestionModel }
  | { type: 'TO_Q04'; formValues: FormQuestionModel }
  | { type: 'TO_Q05'; formValues: FormQuestionModel }
  | { type: 'TO_Q06'; formValues: FormQuestionModel }
  | { type: 'TO_Q07'; formValues: FormQuestionModel }
  | { type: 'TO_Q08'; formValues: FormQuestionModel }
  | { type: 'TO_Q09'; formValues: FormQuestionModel }
  | { type: 'TO_Q10'; formValues: FormQuestionModel }
  | { type: 'TO_PREV' }
  | { type: 'RESTART' }

export type MachineState =
  | { context: MachineContext; value: 'START' }
  | { context: MachineContext; value: Question.Q01 }
  | { context: MachineContext; value: Question.Q02 }
  | { context: MachineContext; value: Question.Q03 }
  | { context: MachineContext; value: Question.Q04 }
  | { context: MachineContext; value: Question.Q05 }
  | { context: MachineContext; value: Question.Q06 }
  | { context: MachineContext; value: Question.Q07 }
  | { context: MachineContext; value: Question.Q08 }
  | { context: MachineContext; value: Question.Q09 }
  | { context: MachineContext; value: Question.Q10 }
  | { context: MachineContext; value: 'RESULT' }

export const INITIAL_CONTEXT: MachineContext = {
  chosenParty: null,
  form: {
    [Question.Q01]: null,
    [Question.Q02]: null,
    [Question.Q03]: null,
    [Question.Q04]: null,
    [Question.Q05]: null,
    [Question.Q06]: null,
    [Question.Q07]: null,
    [Question.Q08]: null,
    [Question.Q09]: null,
    [Question.Q10]: null
  },
  result: 0,
  resultFromBackEnd: 0
}

export const gameMachine = createMachine<MachineContext>(
  {
    id: 'gameMachine',
    initial: Question.Q01,
    context: INITIAL_CONTEXT,
    states: {
      START: {},
      [Question.Q01]: {},
      [Question.Q02]: {},
      [Question.Q03]: {},
      [Question.Q04]: {},
      [Question.Q05]: {},
      [Question.Q06]: {},
      [Question.Q07]: {},
      [Question.Q08]: {},
      [Question.Q09]: {},
      [Question.Q10]: {},
      RESULT: {}
    }
  },
  {
    actions: {
      resetContext: assign(INITIAL_CONTEXT),
      initializeGame: (context, event) => {}
    }
  }
)

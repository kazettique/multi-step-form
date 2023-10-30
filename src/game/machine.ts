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
import { Party } from './types'
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
  // form: {
  //   [questionKey in QuestionKey]: FormQuestionModel | null
  // }
  Q01: FormQuestionModel | null
  Q02: FormQuestionModel | null
  Q03: FormQuestionModel | null
  // Q04: FormQuestionModel | null
  // Q05: FormQuestionModel | null
  // Q06: FormQuestionModel | null
  // Q07: FormQuestionModel | null
  // Q08: FormQuestionModel | null
  // Q09: FormQuestionModel | null
  // Q10: FormQuestionModel | null
  chosenParty: Party
  result: number
  resultFromBackEnd: number
}

export type MachineEvent =
  | { type: 'TO_Q01'; formValues: Party }
  | { type: 'TO_Q02'; formValues: FormQuestionModel }
  | { type: 'TO_Q03'; formValues: FormQuestionModel }
  // | { type: 'TO_Q04'; formValues: FormQuestionModel }
  // | { type: 'TO_Q05'; formValues: FormQuestionModel }
  // | { type: 'TO_Q06'; formValues: FormQuestionModel }
  // | { type: 'TO_Q07'; formValues: FormQuestionModel }
  // | { type: 'TO_Q08'; formValues: FormQuestionModel }
  // | { type: 'TO_Q09'; formValues: FormQuestionModel }
  // | { type: 'TO_Q10'; formValues: FormQuestionModel }
  | { type: 'TO_PREV' }
  | { type: 'RESTART' }

export type MachineState =
  | { context: MachineContext; value: 'START' }
  | { context: MachineContext; value: 'Q01' }
  | { context: MachineContext; value: 'Q02' }
  | { context: MachineContext; value: 'Q03' }
  // | { context: MachineContext; value: 'Q04' }
  // | { context: MachineContext; value: 'Q05' }
  // | { context: MachineContext; value: 'Q06' }
  // | { context: MachineContext; value: 'Q07' }
  // | { context: MachineContext; value: 'Q08' }
  // | { context: MachineContext; value: 'Q09' }
  // | { context: MachineContext; value: 'Q10' }
  | { context: MachineContext; value: 'RESULT' }

export const INITIAL_CONTEXT: MachineContext = {
  chosenParty: Party.DPP,
  Q01: null,
  Q02: null,
  Q03: null,
  // Q04: null,
  // Q05: null,
  // Q06: null,
  // Q07: null,
  // Q08: null,
  // Q09: null,
  // Q10: null,
  result: 0,
  resultFromBackEnd: 0
}

export const gameMachine = createMachine<MachineContext, MachineEvent, MachineState>(
  {
    id: 'gameMachine',
    initial: 'START',
    context: INITIAL_CONTEXT,
    states: {
      START: {
        on: {
          TO_Q01: {
            target: 'Q01',
            actions: assign({ chosenParty: (context, event) => event.formValues })
          }
        }
      },
      Q01: {
        on: {
          TO_Q02: {
            target: 'Q02',
            actions: assign({ Q01: (context, event) => event.formValues })
          }
        }
      },
      Q02: {
        on: {
          TO_Q03: {
            target: 'Q03',
            actions: assign({ Q02: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q01'
          }
        }
      },
      Q03: {},
      // Q04: {},
      // Q05: {},
      // Q06: {},
      // Q07: {},
      // Q08: {},
      // Q09: {},
      // Q10: {},
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

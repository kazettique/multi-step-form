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
import { Party, type QuestionItem } from './types'
import type { FormQuestionModel } from './validator'
import { genPartyQuestionList, genQuestionSet, shuffle } from '@/utils'

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
  Q04: FormQuestionModel | null
  Q05: FormQuestionModel | null
  Q06: FormQuestionModel | null
  Q07: FormQuestionModel | null
  Q08: FormQuestionModel | null
  Q09: FormQuestionModel | null
  Q10: FormQuestionModel | null
  questionSet: QuestionItem[]
  chosenParty: Party
  result: number
  resultFromBackEnd: number
}

export type MachineEvent =
  | { type: 'TO_Q01'; formValues: Party }
  | { type: 'TO_Q02'; formValues: FormQuestionModel }
  | { type: 'TO_Q03'; formValues: FormQuestionModel }
  | { type: 'TO_Q04'; formValues: FormQuestionModel }
  | { type: 'TO_Q05'; formValues: FormQuestionModel }
  | { type: 'TO_Q06'; formValues: FormQuestionModel }
  | { type: 'TO_Q07'; formValues: FormQuestionModel }
  | { type: 'TO_Q08'; formValues: FormQuestionModel }
  | { type: 'TO_Q09'; formValues: FormQuestionModel }
  | { type: 'TO_Q10'; formValues: FormQuestionModel }
  | { type: 'TO_RESULT'; formValues: FormQuestionModel }
  | { type: 'TO_PREV' }
  | { type: 'RESTART' }

export type MachineState =
  | { context: MachineContext; value: 'START' }
  | { context: MachineContext; value: 'Q01' }
  | { context: MachineContext; value: 'Q02' }
  | { context: MachineContext; value: 'Q03' }
  | { context: MachineContext; value: 'Q04' }
  | { context: MachineContext; value: 'Q05' }
  | { context: MachineContext; value: 'Q06' }
  | { context: MachineContext; value: 'Q07' }
  | { context: MachineContext; value: 'Q08' }
  | { context: MachineContext; value: 'Q09' }
  | { context: MachineContext; value: 'Q10' }
  | { context: MachineContext; value: 'RESULT' }

export const INITIAL_CONTEXT: MachineContext = {
  chosenParty: Party.DPP,
  Q01: null,
  Q02: null,
  Q03: null,
  Q04: null,
  Q05: null,
  Q06: null,
  Q07: null,
  Q08: null,
  Q09: null,
  Q10: null,
  questionSet: [],
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
            actions: [
              assign({ chosenParty: (context, event) => event.formValues }),
              assign({ questionSet: (context, event) => genQuestionSet(event.formValues) })
            ]
          }
        }
      },
      Q01: {
        on: {
          TO_Q02: {
            target: 'Q02',
            actions: [assign({ Q01: (context, event) => event.formValues })]
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
      Q03: {
        on: {
          TO_Q04: {
            target: 'Q04',
            actions: assign({ Q03: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q02'
          }
        }
      },
      Q04: {
        on: {
          TO_Q05: {
            target: 'Q05',
            actions: assign({ Q04: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q03'
          }
        }
      },
      Q05: {
        on: {
          TO_Q06: {
            target: 'Q06',
            actions: assign({ Q05: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q04'
          }
        }
      },
      Q06: {
        on: {
          TO_Q07: {
            target: 'Q07',
            actions: assign({ Q06: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q05'
          }
        }
      },
      Q07: {
        on: {
          TO_Q08: {
            target: 'Q08',
            actions: assign({ Q07: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q06'
          }
        }
      },
      Q08: {
        on: {
          TO_Q09: {
            target: 'Q09',
            actions: assign({ Q08: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q07'
          }
        }
      },
      Q09: {
        on: {
          TO_Q10: {
            target: 'Q10',
            actions: assign({ Q09: (context, event) => event.formValues })
          },
          TO_PREV: {
            target: 'Q08'
          }
        }
      },
      Q10: {
        on: {
          TO_RESULT: {
            target: 'RESULT',
            actions: [assign({ Q10: (context, event) => event.formValues }), 'calculateScore']
          },
          TO_PREV: {
            target: 'Q09'
          }
        }
      },
      RESULT: {
        on: {
          RESTART: {
            target: 'START',
            actions: ['resetContext']
          }
        }
      }
    }
  },
  {
    actions: {
      resetContext: assign(INITIAL_CONTEXT),
      initializeGame: (context, event) => {},
      calculateScore: (context, event) => {}
    }
  }
)

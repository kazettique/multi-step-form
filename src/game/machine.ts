import { assign, createMachine } from 'xstate'
import { Party, type QuestionItem } from './types'
import type { FormQuestionModel } from './validator'
import { genPartyQuestionList, genQuestionSet, genQuestionSet2, shuffle } from '@/utils'
import { INITIAL_FORM_QUESTION } from './constants'

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

export enum Question {
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
  //   [questionKey in QuestionKey]: QuestionItem | null
  // }
  Q01: QuestionItem
  Q02: QuestionItem
  Q03: QuestionItem
  Q04: QuestionItem
  Q05: QuestionItem
  Q06: QuestionItem
  Q07: QuestionItem
  Q08: QuestionItem
  Q09: QuestionItem
  Q10: QuestionItem
  // questionSet: QuestionItem[]
  // test: any
  chosenParty: Party
  // result: number
  // resultFromBackEnd: number
}

export type MachineEvent =
  | { type: 'TO_Q01'; formValues: Party }
  | { type: 'TO_Q02'; formValues: QuestionItem }
  | { type: 'TO_Q03'; formValues: QuestionItem }
  | { type: 'TO_Q04'; formValues: QuestionItem }
  | { type: 'TO_Q05'; formValues: QuestionItem }
  | { type: 'TO_Q06'; formValues: QuestionItem }
  | { type: 'TO_Q07'; formValues: QuestionItem }
  | { type: 'TO_Q08'; formValues: QuestionItem }
  | { type: 'TO_Q09'; formValues: QuestionItem }
  | { type: 'TO_Q10'; formValues: QuestionItem }
  | { type: 'TO_RESULT'; formValues: QuestionItem }
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
  Q01: INITIAL_FORM_QUESTION,
  Q02: INITIAL_FORM_QUESTION,
  Q03: INITIAL_FORM_QUESTION,
  Q04: INITIAL_FORM_QUESTION,
  Q05: INITIAL_FORM_QUESTION,
  Q06: INITIAL_FORM_QUESTION,
  Q07: INITIAL_FORM_QUESTION,
  Q08: INITIAL_FORM_QUESTION,
  Q09: INITIAL_FORM_QUESTION,
  Q10: INITIAL_FORM_QUESTION
  // form: {
  //   1: null,
  //   2: null,
  //   3: null,
  //   4: null,
  //   5: null,
  //   6: null,
  //   7: null,
  //   8: null,
  //   9: null,
  //   10: null
  // }
  // result: 0,
  // resultFromBackEnd: 0
}

const keys = Object.values(Question).filter((value) => isNaN(Number(value)))

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
              assign((context, event) => {
                const questionSet = genQuestionSet(event.formValues)

                const parsedQuestionSet = Object.fromEntries(
                  questionSet.map((item, index) => [Question[index + 1], item])
                )

                // const parsedQuestionSet2 = Object.fromEntries(
                //   questionSet.map((item, index) => [index + 1, item])
                // ) as {
                //   [questionKey in QuestionKey]: QuestionItem
                // }

                // console.log('parsedQuestionSet2', parsedQuestionSet2)

                return { ...parsedQuestionSet }
              })
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
      // initializeGame: assign((context, event) => {
      //   console.log('event', event.formValues)

      //   const questionSet = genQuestionSet(event.formValues)

      //   return {
      //     ...context,
      //     Q01: questionSet[0],
      //     Q02: questionSet[1],
      //     Q03: questionSet[2],
      //     Q04: questionSet[3],
      //     Q05: questionSet[4],
      //     Q06: questionSet[5],
      //     Q07: questionSet[6],
      //     Q08: questionSet[7],
      //     Q09: questionSet[8],
      //     Q10: questionSet[9]
      //   }
      // }),
      calculateScore: (context, event) => {}
    }
  }
)

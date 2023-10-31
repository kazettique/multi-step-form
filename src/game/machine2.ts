import { genQuestionSet } from '@/utils'
import { Party } from './types'
import { createMachine } from 'xstate'
import { Question } from './machine'

const questionSet = genQuestionSet(Party.DPP)

const keys = Object.values(Question).filter((value) => !isNaN(Number(value))) as number[]

const keys2 = [0, 1, 2, 3, 4]

const states = keys2.map((item) => ({
  [item]: {
    on: {
      NEXT: {
        target: item + 1
      }
    }
  }
}))

export const testMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgBc4CBZAQwGMALASwzHxAActYaCasNGAPRAWgBs6AJ4DByNCCKxSlWvQB0AZQAqAQQBKqxizYcuvRABYATKMQAOAIyKArJMlA */
  id: 'testMachine',
  initial: 'START',
  states: {
    START: {},
    ...states
    // ...keys2.map((item) => ({
    //   [item]: {
    //     on: {
    //       NEXT: {
    //         target: item + 1
    //       }
    //     }
    //   }
    // }))
  }
})

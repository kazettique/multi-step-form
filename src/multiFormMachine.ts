import { assign, createMachine } from 'xstate'
import type { Form1Model, Form2Model, Form3Model } from './types'
import { form1InitialValues, form2InitialValues, form3InitialValues } from './default'

type MachineEvent =
  | { type: 'NEXT_TO_STEP_2'; formValues: Form1Model }
  | { type: 'NEXT_TO_STEP_3'; formValues: Form2Model }
  | { type: 'NEXT_TO_STEP_RESULT'; formValues: Form3Model }
  | { type: 'PREV' }

export type MachineContext = {
  form1Values: Form1Model
  form2Values: Form2Model
  form3Values: Form3Model
}

type MachineState =
  | { context: MachineContext; value: 'step1' }
  | { context: MachineContext; value: 'step2' }
  | { context: MachineContext; value: 'step3' }
  | { context: MachineContext; value: 'stepResult' }

const INITIAL_MACHINE_CONTEXT: MachineContext = {
  form1Values: form1InitialValues,
  form2Values: form2InitialValues,
  form3Values: form3InitialValues
}

export const multiStepFormMachine = createMachine<MachineContext, MachineEvent, MachineState>({
  id: 'multiStepForm',
  initial: 'step1',
  context: INITIAL_MACHINE_CONTEXT,
  states: {
    step1: {
      on: {
        NEXT_TO_STEP_2: {
          target: 'step2',
          actions: assign({
            form1Values: (context, event) => event.formValues
          })
        }
      }
    },
    step2: {
      on: {
        NEXT_TO_STEP_3: {
          target: 'step3',
          actions: assign({
            form2Values: (context, event) => event.formValues
          })
        },
        PREV: {
          target: 'step1'
        }
      }
    },
    step3: {
      on: {
        NEXT_TO_STEP_RESULT: {
          target: 'stepResult',
          actions: assign({
            form3Values: (context, event) => event.formValues
          })
        },
        PREV: {
          target: 'step2'
        }
      }
    },
    stepResult: {
      on: {
        PREV: {
          target: 'step3'
        }
      }
    }
  }
})

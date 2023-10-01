import { assign, createMachine } from 'xstate'
import type { Form1Model, Form2Model, Form3Model, SubmitData } from './types'
import { FORM_1_INITIAL_VALUES, FORM_2_INITIAL_VALUES, FORM_3_INITIAL_VALUES } from './default'
import { sendFormData } from './utils'

type MachineEvent =
  | { type: 'NEXT_TO_STEP_2'; formValues: Form1Model }
  | { type: 'NEXT_TO_STEP_3'; formValues: Form2Model }
  | { type: 'NEXT_TO_STEP_CONFIRM'; formValues: Form3Model }
  | { type: 'PREV' }
  | { type: 'SUBMIT' }
  | { type: 'RESTART' }

export type MachineContext = {
  form1Values: Form1Model
  form2Values: Form2Model
  form3Values: Form3Model
  payload: SubmitData | null
  error: string | null
}

const INITIAL_MACHINE_CONTEXT: MachineContext = {
  form1Values: FORM_1_INITIAL_VALUES,
  form2Values: FORM_2_INITIAL_VALUES,
  form3Values: FORM_3_INITIAL_VALUES,
  payload: null,
  error: null
}

type MachineState =
  | { context: MachineContext; value: 'step1' }
  | { context: MachineContext; value: 'step2' }
  | { context: MachineContext; value: 'step3' }
  | { context: MachineContext; value: 'stepConfirm' }
  | { context: MachineContext; value: 'stepConfirm.submitting' }
  | { context: MachineContext; value: 'complete' }

export const multiStepFormMachine = createMachine<MachineContext, MachineEvent, MachineState>(
  {
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
          NEXT_TO_STEP_CONFIRM: {
            target: 'stepConfirm',
            actions: assign({
              form3Values: (context, event) => event.formValues
            })
          },
          PREV: {
            target: 'step2'
          }
        }
      },
      stepConfirm: {
        initial: 'preSubmit',
        states: {
          preSubmit: {
            entry: assign({
              payload: (context, event) => ({
                ...context.form1Values,
                ...context.form2Values,
                ...context.form3Values
              })
            }),
            on: {
              SUBMIT: {
                target: 'submitting'
              }
            }
          },
          submitting: {
            invoke: {
              src: 'formSubmit',
              onDone: {
                target: '#multiStepForm.complete',
                actions: 'resetContext'
              },
              onError: {
                target: 'errored',
                actions: assign({
                  error: (context, event) => event.data.error
                })
              }
            }
          },
          errored: {
            on: {
              SUBMIT: {
                target: 'submitting'
              }
            }
          }
        },
        on: {
          PREV: {
            target: 'step3'
          }
        }
      },
      complete: {
        entry: 'resetContext',
        on: {
          RESTART: {
            target: 'step1'
          }
        }
      }
    }
  },
  {
    actions: {
      resetContext: assign(INITIAL_MACHINE_CONTEXT)
    },
    services: {
      formSubmit: async (context, event) => {
        if (context.payload) {
          return await sendFormData(context.payload)
        } else {
          return await new Promise((resolve, reject) => reject('Context cannot be null.'))
        }
      }
    }
  }
)

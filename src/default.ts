import type { MachineContext } from './multiStepFormMachine'
import type { Form1Model, Form2Model, Form3Model } from './types'

export const FORM_1_INITIAL_VALUES: Form1Model = { channels: [] }

export const FORM_2_INITIAL_VALUES: Form2Model = {
  name: '',
  age: 0,
  email: '',
  gender: 'male'
}

export const FORM_3_INITIAL_VALUES: Form3Model = {
  cardNo: '',
  expireMonth: '1',
  expireYear: '2023',
  cvc: ''
}

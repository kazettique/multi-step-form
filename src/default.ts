import type { Form1Model } from './validators/form1'
import type { Form2Model } from './validators/form2'
import type { Form3Model } from './validators/form3'

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

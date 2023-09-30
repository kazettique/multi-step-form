import type { Form1Model, Form2Model, Form3Model } from './types'

export const form1InitialValues: Form1Model = { channels: [] }

export const form2InitialValues: Form2Model = { name: '', age: 0, email: '' }

export const form3InitialValues: Form3Model = {
  cardNo: '',
  expireMonth: '1',
  expireYear: '2023',
  cvc: ''
}

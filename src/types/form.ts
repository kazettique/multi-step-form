export interface Form1Model {
  channels: number[]
}

export interface Form2Model {
  name: string
  age: number
  email: string
  gender: string
}
export interface Form3Model {
  cardNo: string
  expireMonth: string
  expireYear: string
  cvc: string
}

export interface SubmitData extends Form1Model, Form2Model, Form3Model {}

export interface SubmitResponse {
  data: SubmitData
  status: boolean
  error: string | null
}

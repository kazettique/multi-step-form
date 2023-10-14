import type { Form1Model } from '@/validators/form1'
import type { Form2Model } from '@/validators/form2'
import type { Form3Model } from '@/validators/form3'

export interface SubmitData extends Form1Model, Form2Model, Form3Model {}

export interface SubmitResponse {
  data: SubmitData
  status: boolean
  error: string | null
}

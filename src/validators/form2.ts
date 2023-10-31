import z from 'zod'

export const Form2Validator = z.object({
  name: z.string().min(1, 'Please enter your name'),
  age: z.number().min(1, 'Please enter your age'),
  email: z.string().email('Please enter right email format').min(1, 'Please enter your email'),
  gender: z.string().min(1, 'Please select your gender')
})

export type Form2Model = z.infer<typeof Form2Validator>

import z from 'zod'

export const form3Validator = z.object({
  cardNo: z.string().min(1, 'Please enter your credit card number'),
  expireMonth: z.string(),
  expireYear: z.string(),
  cvc: z.string().min(1, 'Please enter your cvc code')
})

export type Form3Model = z.infer<typeof form3Validator>

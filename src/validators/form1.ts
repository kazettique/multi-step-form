import z from 'zod'

export const Form1Validator = z.object({
  channels: z.number().array().min(1, 'Please choose at least one channel.')
})

export type Form1Model = z.infer<typeof Form1Validator>

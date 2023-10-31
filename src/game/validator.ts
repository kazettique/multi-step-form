import { z } from 'zod'
import { Party } from './types'

export const formCandidateValidator = z.object({
  party: z.nativeEnum(Party)
})

// export const formQuestionValidator = z.object({
//   questionId: z.number(),
//   answerId: z.number().min(0).max(2)
// })

export const formQuestionValidator = z.object({
  questionId: z.number().min(0),
  answerId: z.number().min(0).max(2),
  playerAnswer: z
    .number()
    .min(0, 'please choose one answer')
    .max(2),
  options: z.array(
    z.object({
      optionId: z.number(),
      title: z.string()
    })
  ),
  title: z.string(),
  type: z.enum(['DPP', 'KMT', 'TPP', 'GTM', 'COMMON'])
})

export type FormQuestionModel = z.infer<typeof formQuestionValidator>

export type FormCandidateModel = z.infer<typeof formCandidateValidator>

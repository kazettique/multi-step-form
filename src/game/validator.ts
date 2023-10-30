import { z } from 'zod'
import { Party } from './types'

export const formCandidateValidator = z.object({
  party: z.nativeEnum(Party)
})

export const formQuestionValidator = z.object({
  questionId: z.number(),
  answerId: z.number().min(0).max(2)
})

export type FormQuestionModel = z.infer<typeof formQuestionValidator>

export type FormCandidateModel = z.infer<typeof formCandidateValidator>

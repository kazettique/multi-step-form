import z from 'zod'
import { Party } from './types'

export const FormCandidateValidator = z.object({
  party: z.nativeEnum(Party)
})

export const FormQuestionValidator = z.object({
  questionId: z.number(),
  answerId: z.number().min(0).max(2),
  // playerAnswer: z.number().min(0).max(2),
  // options: z.array(
  //   z.object({
  //     optionId: z.number(),
  //     title: z.string()
  //   })
  // ),
  // title: z.string()
})

export type FormQuestionModel = z.infer<typeof FormQuestionValidator>

export type FormCandidateModel = z.infer<typeof FormCandidateValidator>

import {
  commonQuestionList,
  rawDppQuestionList,
  rawGtmQuestionList,
  rawKmtQuestionList,
  rawTppQuestionList
} from './game/constants'
import type {
  RawCommonQuestion,
  CommonQuestion,
  RawPartyQuestion,
  PartyQuestion,
  PartyType,
  QuestionItem
} from './game/types'
import type { FormQuestionModel } from './game/validator'
import type { SubmitData, SubmitResponse } from './types'

export async function sendFormData(payload: SubmitData): Promise<SubmitResponse> {
  return await new Promise<SubmitResponse>((resolve, reject) =>
    setTimeout(() => {
      // sometimes API goes wrong.
      if (Math.random() > 0.5) {
        reject({ data: payload, status: false, error: 'Error occurs!' })
      } else {
        resolve({ data: payload, status: true, error: null })
      }
    }, 2000)
  )
}

export function generateArray(arrayLength: number): string[] {
  return Array.from(Array(arrayLength).fill(''))
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

// gen common function
export function genCommonQuestionList(list: RawCommonQuestion[], party: PartyType): QuestionItem[] {
  return list.map((item, index) => {
    const answerId = item.options.findIndex((option) => new Set(option.party).has(party))

    return {
      questionId: index,
      answerId,
      options: item.options.map((option, optionId) => ({ title: option.title, optionId })),
      title: item.title,
      playerAnswer: -1
    }
  })
}

// gen party function
export function genPartyQuestionList(list: RawPartyQuestion[]): QuestionItem[] {
  return list.map((item, index) => ({
    ...item,
    questionId: index,
    options: item.options.map((option, optionId) => ({ title: option.title, optionId })),
    playerAnswer: -1
  }))
}

// generate question set from chosen party
export function genQuestionSet(chosenParty: PartyType): QuestionItem[] {
  const clonedCommonQuestionList: QuestionItem[] = JSON.parse(JSON.stringify(commonQuestionList))

  let rawPartyQuestion: RawPartyQuestion[] = []
  let clonedPartyQuestionList: QuestionItem[] = []

  switch (chosenParty) {
    case 'DPP':
      rawPartyQuestion = rawDppQuestionList
      break
    case 'GTM':
      rawPartyQuestion = rawGtmQuestionList
      break
    case 'KMT':
      rawPartyQuestion = rawKmtQuestionList

      break
    case 'TPP':
      rawPartyQuestion = rawTppQuestionList
      break
    case 'KMT_TPP_COMBI':
    case 'TPP_KMT_COMBI':
    default:
  }

  clonedPartyQuestionList = JSON.parse(JSON.stringify(genPartyQuestionList(rawPartyQuestion)))

  const selectedCommonQuestionList = shuffle(clonedCommonQuestionList).slice(0, 5)
  const selectedPartyQuestionList = shuffle(clonedPartyQuestionList).slice(0, 5)

  return shuffle([...selectedCommonQuestionList, ...selectedPartyQuestionList])
}

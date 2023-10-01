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

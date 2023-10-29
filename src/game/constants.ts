import { genCommonQuestionList, genPartyQuestionList, generateArray, shuffle } from '@/utils'
import type { PartyType, RawCommonQuestion, RawPartyQuestion } from './types'
import type { FormQuestionModel } from './validator'

export const rawCommonQuestionList: RawCommonQuestion[] = generateArray(20).map((item, index) => ({
  title: `經濟 ${index + 1}`,
  options: [
    {
      party: ['DPP'],
      title: `${
        index + 1
      } 列子曾說過一句意義深遠的話，天地無全功，聖人無全能，萬物無全用。他會這麼說是有理由的。我們要學會站在別人的角度思考。深入的探討經濟，是釐清一切的關鍵。對於一般人來說，經濟究竟象徵著什麼呢？我們要從本質思考，從根本解決問題。老舊的想法已經過時了。問題的關鍵究竟為何？需要考慮周詳經濟的影響及因應對策。若到今天結束時我們都還無法釐清經濟的意義，那想必我們昨天也無法釐清。`
    },
    {
      party: ['KMT', 'TPP'],
      title: `${
        index + 1
      } 若能夠欣賞到經濟的美，相信我們一定會對經濟改觀。經濟，發生了會如何，不發生又會如何。泰戈爾曾說過，人生雖只有幾十春秋，但它決不是夢一般的幻滅，而是有著無窮可歌可頌的深長意義的; 附和真理，生命便會得到永生。希望大家能從這段話中有所收穫。儘管經濟看似不顯眼，卻佔據了我的腦海。瓦維洛夫曾經提到過，當科學達到某個高峰的時候，它的面前會出現通向新的高峰的廣闊前景，通向進一步發展的嶄新道路。這句話幾乎解讀出了問題的根本。`
    },
    {
      party: ['GTM'],
      title: `${
        index + 1
      } 動機，可以說是最單純的力量。要想清楚，經濟，到底是一種怎麼樣的存在。老舊的想法已經過時了。帶著這些問題，我們一起來審視經濟。可是，即使是這樣，經濟的出現仍然代表了一定的意義。做好經濟這件事，可以說已經成為了全民運動。經濟的存在，令我無法停止對他的思考。石川磐曾經說過，不需要檢查的管理是理想的管理。這影響了我的價值觀。陳涉相信，燕雀安知鴻鵠之志哉！ 這激勵了我。`
    }
  ]
}))

// * raw party dpp
export const rawDppQuestionList: RawPartyQuestion[] = generateArray(20).map((item, index) => ({
  title: `政治 ${index + 1}`,
  answerId: index % 3,
  options: [
    {
      title: `${
        index + 1
      } 面對如此難題，我們必須設想周全。由於，對於政治，我們不能不去想，卻也不能走火入魔。世界上若沒有政治，對於人類的改變可想而知。政治勢必能夠左右未來。我們不得不面對一個非常尷尬的事實，那就是，從這個角度來看，政治似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說，已經成為了我生活的一部分。莫泊桑曾經提過，真實有時可以不像真的。這句話語雖然很短，但令我浮想聯翩。經過上述討論，馬克思說過一句經典的名言，時間是人類發展的空間。但願諸位理解後能從中有所成長。話雖如此，我們卻也不能夠這麼篤定。這必定是個前衛大膽的想法。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。伏爾泰曾說過，妄自尊大隻不過是無知的假面具而已。這句話把我們帶到了一個新的維度去思考這個問題。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說有著舉足輕重的地位，必須要嚴肅認真的看待。這是不可避免的。布萊希特說過一句很有意思的話，科學的唯一目的，在於減輕人類生存的艱辛。這句話反映了問題的急切性。我們需要淘汰舊有的觀念，我們不妨可以這樣來想: 每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮政治的各種可能。生活中，若政治出現了，我們就不得不考慮它出現了的事實。`
    }
  ]
}))

export const rawKmtQuestionList: RawPartyQuestion[] = generateArray(20).map((item, index) => ({
  title: `兩岸 ${index + 1}`,
  answerId: index % 3,
  options: [
    {
      title: `${
        index + 1
      } 面對如此難題，我們必須設想周全。由於，對於政治，我們不能不去想，卻也不能走火入魔。世界上若沒有政治，對於人類的改變可想而知。政治勢必能夠左右未來。我們不得不面對一個非常尷尬的事實，那就是，從這個角度來看，政治似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說，已經成為了我生活的一部分。莫泊桑曾經提過，真實有時可以不像真的。這句話語雖然很短，但令我浮想聯翩。經過上述討論，馬克思說過一句經典的名言，時間是人類發展的空間。但願諸位理解後能從中有所成長。話雖如此，我們卻也不能夠這麼篤定。這必定是個前衛大膽的想法。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。伏爾泰曾說過，妄自尊大隻不過是無知的假面具而已。這句話把我們帶到了一個新的維度去思考這個問題。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說有著舉足輕重的地位，必須要嚴肅認真的看待。這是不可避免的。布萊希特說過一句很有意思的話，科學的唯一目的，在於減輕人類生存的艱辛。這句話反映了問題的急切性。我們需要淘汰舊有的觀念，我們不妨可以這樣來想: 每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮政治的各種可能。生活中，若政治出現了，我們就不得不考慮它出現了的事實。`
    }
  ]
}))

export const rawTppQuestionList: RawPartyQuestion[] = generateArray(20).map((item, index) => ({
  title: `國際 ${index + 1}`,
  answerId: index % 3,
  options: [
    {
      title: `${
        index + 1
      } 面對如此難題，我們必須設想周全。由於，對於政治，我們不能不去想，卻也不能走火入魔。世界上若沒有政治，對於人類的改變可想而知。政治勢必能夠左右未來。我們不得不面對一個非常尷尬的事實，那就是，從這個角度來看，政治似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說，已經成為了我生活的一部分。莫泊桑曾經提過，真實有時可以不像真的。這句話語雖然很短，但令我浮想聯翩。經過上述討論，馬克思說過一句經典的名言，時間是人類發展的空間。但願諸位理解後能從中有所成長。話雖如此，我們卻也不能夠這麼篤定。這必定是個前衛大膽的想法。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。伏爾泰曾說過，妄自尊大隻不過是無知的假面具而已。這句話把我們帶到了一個新的維度去思考這個問題。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說有著舉足輕重的地位，必須要嚴肅認真的看待。這是不可避免的。布萊希特說過一句很有意思的話，科學的唯一目的，在於減輕人類生存的艱辛。這句話反映了問題的急切性。我們需要淘汰舊有的觀念，我們不妨可以這樣來想: 每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮政治的各種可能。生活中，若政治出現了，我們就不得不考慮它出現了的事實。`
    }
  ]
}))

export const rawGtmQuestionList: RawPartyQuestion[] = generateArray(20).map((item, index) => ({
  title: `民生 ${index + 1}`,
  answerId: index % 3,
  options: [
    {
      title: `${
        index + 1
      } 面對如此難題，我們必須設想周全。由於，對於政治，我們不能不去想，卻也不能走火入魔。世界上若沒有政治，對於人類的改變可想而知。政治勢必能夠左右未來。我們不得不面對一個非常尷尬的事實，那就是，從這個角度來看，政治似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說，已經成為了我生活的一部分。莫泊桑曾經提過，真實有時可以不像真的。這句話語雖然很短，但令我浮想聯翩。經過上述討論，馬克思說過一句經典的名言，時間是人類發展的空間。但願諸位理解後能從中有所成長。話雖如此，我們卻也不能夠這麼篤定。這必定是個前衛大膽的想法。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。伏爾泰曾說過，妄自尊大隻不過是無知的假面具而已。這句話把我們帶到了一個新的維度去思考這個問題。`
    },
    {
      title: `${
        index + 1
      } 政治對我來說有著舉足輕重的地位，必須要嚴肅認真的看待。這是不可避免的。布萊希特說過一句很有意思的話，科學的唯一目的，在於減輕人類生存的艱辛。這句話反映了問題的急切性。我們需要淘汰舊有的觀念，我們不妨可以這樣來想: 每個人都不得不面對這些問題。在面對這種問題時，務必詳細考慮政治的各種可能。生活中，若政治出現了，我們就不得不考慮它出現了的事實。`
    }
  ]
}))

export const commonQuestionList = genCommonQuestionList(rawCommonQuestionList, 'DPP')
export const dppQuestionList = genPartyQuestionList(rawDppQuestionList)
export const kmtQuestionList = genPartyQuestionList(rawKmtQuestionList)
export const tppQuestionList = genPartyQuestionList(rawTppQuestionList)
export const gtmQuestionList = genPartyQuestionList(rawGtmQuestionList)


// todo: move to machine actions later
// export const getMachineContext = (party: PartyType): FormGameModel[] => {
//   const clonedCommonQuestionList: FormGameModel[] = JSON.parse(JSON.stringify(commonQuestionList))

//   let rawPartyQuestion: RawPartyQuestion[] = []
//   let clonedPartyQuestionList: FormGameModel[] = []

//   switch (party) {
//     case 'DPP':
//       rawPartyQuestion = rawDppQuestionList
//       break
//     case 'GTM':
//       rawPartyQuestion = rawGtmQuestionList
//       break
//     case 'KMT':
//       rawPartyQuestion = rawKmtQuestionList

//       break
//     case 'TPP':
//       rawPartyQuestion = rawTppQuestionList
//       break
//     case 'KMT_TPP_COMBI':
//     case 'TPP_KMT_COMBI':
//     default:
//   }

//   clonedPartyQuestionList = JSON.parse(JSON.stringify(genPartyQuestionList(rawPartyQuestion)))

//   const selectedCommonQuestionList = shuffle(clonedCommonQuestionList).slice(0, 5)
//   const selectedPartyQuestionList = shuffle(clonedPartyQuestionList).slice(0, 5)

//   return shuffle([...selectedCommonQuestionList, ...selectedPartyQuestionList])
// }

<template>
  <div :class="`${props.class}`">
    <div class="flex">
      <div class="w-7/12">
        <ChooseCandidate
          v-if="state.matches('START')"
          :initial-values="{ party: state.context.chosenParty }"
          @step-next="send('TO_Q01', { formValues: $event.party })"
        />

        <QuestionComp
          v-if="state.matches('Q01')"
          :question-item="state.context.Q01"
          :index="0"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q02', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q02')"
          :question-item="state.context.Q02"
          :index="1"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q03', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q03')"
          :question-item="state.context.Q03"
          :index="2"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q04', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q04')"
          :question-item="state.context.Q04"
          :index="3"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q05', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q05')"
          :question-item="state.context.Q05"
          :index="4"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q06', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q06')"
          :question-item="state.context.Q06"
          :index="5"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q07', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q07')"
          :question-item="state.context.Q07"
          :index="6"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q08', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q08') "
          :question-item="state.context.Q08"
          :index="7"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q09', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q09') "
          :question-item="state.context.Q09"
          :index="8"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_Q10', { formValues: $event })"
        />
        <QuestionComp
          v-if="state.matches('Q10') "
          :question-item="state.context.Q10"
          :index="9"
          @prev-step="send('TO_PREV')"
          @next-step="send('TO_RESULT', { formValues: $event })"
        />

        <Result
          v-if="state.matches('RESULT')"
          @next-step="send('RESTART')"
          :machine-context="state.context"
        />
      </div>

      <div class="w-5/12">
        <pre>{{ state.context }}</pre>
      </div>

      <!-- <pre>{{ Question[Question.Q01] }}</pre> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { gameMachine } from './machine'
import ChooseCandidate from '@/game/ChooseCandidate.vue'
import QuestionComp from '@/game/Question.vue'
import Result from './Result.vue'
import { Question } from '@/game/machine'
import TestFrom from './TestFrom.vue'

interface Props {
  class?: string
}

interface Emits {
  (event: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const { state, send } = useMachine(gameMachine)

// const keys = Object.values(Question).filter((value) => !isNaN(Number(value))) as number[]

// const states = keys.map((item) => ({
//   [item]: {
//     on: {
//       NEXT: {
//         target: item + 1
//       }
//     }
//   }
// }))

// console.log('states', states)
</script>

<style scoped lang="scss"></style>

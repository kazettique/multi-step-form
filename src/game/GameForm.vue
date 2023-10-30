<template>
  <div :class="` ${props.class}`">
    <ChooseCandidate
      v-if="state.matches('START')"
      :initial-values="{ party: state.context.chosenParty }"
      @step-next="send('TO_Q01', { formValues: $event })"
    />

    <Question />
  </div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { commonQuestionList, dppQuestionList } from './constants'
import { gameMachine } from './machine'
import ChooseCandidate from '@/game/ChooseCandidate.vue'
import Question from '@/game/Question.vue'

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
</script>

<style scoped lang="scss"></style>

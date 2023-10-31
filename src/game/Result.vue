<template>
  <div :class="`${props.class}`">
    <div class="text-2xl">this is result</div>

    <div>
      <span>You've got score:</span>
      <span>{{ score }}</span>
      <span>&nbsp;/&nbsp;10</span>
    </div>

    <button
      class="p-4 bg-slate-800 rounded text-slate-100"
      type="button"
      @click="$emit('nextStep')"
    >
      restart
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { useForm } from 'vee-validate'
import { formQuestionValidator, type FormQuestionModel } from './validator'
import { toTypedSchema } from '@vee-validate/zod'
import type { Party, QuestionItem } from './types'
import type { MachineContext } from './machine'
import { computed } from 'vue'

interface Props {
  class?: string
  machineContext: MachineContext
}

interface Emits {
  (event: 'nextStep'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const isRightAnswer = (questionItem: QuestionItem): boolean =>
  questionItem.answerId === questionItem.playerAnswer

const score = computed<number>(() => {
  let _score = 0

  if (props.machineContext.Q01 && isRightAnswer(props.machineContext.Q01)) _score++
  if (props.machineContext.Q02 && isRightAnswer(props.machineContext.Q02)) _score++
  if (props.machineContext.Q03 && isRightAnswer(props.machineContext.Q03)) _score++
  if (props.machineContext.Q04 && isRightAnswer(props.machineContext.Q04)) _score++
  if (props.machineContext.Q05 && isRightAnswer(props.machineContext.Q05)) _score++
  if (props.machineContext.Q06 && isRightAnswer(props.machineContext.Q06)) _score++
  if (props.machineContext.Q07 && isRightAnswer(props.machineContext.Q07)) _score++
  if (props.machineContext.Q08 && isRightAnswer(props.machineContext.Q08)) _score++
  if (props.machineContext.Q09 && isRightAnswer(props.machineContext.Q09)) _score++
  if (props.machineContext.Q10 && isRightAnswer(props.machineContext.Q10)) _score++

  return _score
})
</script>

<style scoped lang="scss"></style>

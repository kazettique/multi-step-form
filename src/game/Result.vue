<template>
  <div :class="`${props.class}`">
    <div class="text-2xl">this is result</div>

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
import { commonQuestionList, dppQuestionList } from './constants'
import { useForm } from 'vee-validate'
import { formQuestionValidator, type FormQuestionModel } from './validator'
import { toTypedSchema } from '@vee-validate/zod'
import type { Party, QuestionItem } from './types'

interface Props {
  class?: string
}

interface Emits {
  (event: 'nextStep'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.optionCard {
  @apply p-4 text-slate-200;

  &[data-is-active='true'] {
    @apply bg-slate-700;
  }

  &[data-is-active='false'] {
    @apply bg-slate-500 hover:bg-slate-600;
  }
}
</style>

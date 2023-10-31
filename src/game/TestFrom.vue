<template>
  <form :class="`${props.class}`" @submit="onSubmit">
    <div class="grid grid-cols-3 gap-4">
      <button
        type="button"
        class="optionCard"
        :data-is-active="values.answerId === option.optionId"
        v-for="option in questionItem.options"
        :key="option.optionId"
        @click="handleAnswerChange(option.optionId)"
      >
        {{ option.title }}
      </button>
    </div>

    <div class="my-4 flex gap-4">
      <button
        class="p-4 bg-slate-800 rounded text-slate-100"
        type="button"
        @click="$emit('prevStep')"
      >
        prev
      </button>
      <button class="p-4 bg-slate-800 rounded text-slate-100" type="submit">next</button>
    </div>

    <pre>{{ errors }}</pre>

    <pre>{{ meta }}</pre>
  </form>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { useForm } from 'vee-validate'
import { formQuestionValidator, type FormQuestionModel } from './validator'
import { toTypedSchema } from '@vee-validate/zod'
import type { Party, QuestionItem } from './types'

interface Props {
  class?: string
}

interface Emits {
  (event: 'nextStep', formValues: FormQuestionModel): void
  (event: 'prevStep'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const questionItem: QuestionItem = {
  title: 'this is title',
  questionId: 5566,
  answerId: 1,
  playerAnswer: -1,
  type: 'COMMON',
  options: [
    { title: 'aaa', optionId: 0 },
    { title: 'bbb', optionId: 1 },
    { title: 'ccc', optionId: 2 }
  ]
}

const emits = defineEmits<Emits>()

const { handleSubmit, errors, values, setFieldValue, meta } = useForm<FormQuestionModel>({
  initialValues: questionItem,
  validationSchema: toTypedSchema(formQuestionValidator)
})

const handleAnswerChange = (playerAnswer: number) => {
  setFieldValue('playerAnswer', playerAnswer)
}

const onSubmit = handleSubmit((values) => {
  // console.log('values', values)
  emits('nextStep', values)
})
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

<template>
  <form :class="`${props.class}`" @submit="onSubmit">
    <div>
      <span>Q</span>
      <span>{{ props.index }}</span>
      <span>{{ props.questionItem.title }}</span>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <button
        type="button"
        class="optionCard"
        :data-is-active="values.answerId === option.optionId"
        v-for="option in props.questionItem.options"
        :key="option.optionId"
        @click="handleAnswerChange(option.optionId)"
      >
        {{ option.title }}
      </button>
    </div>

    <div class="my-4 flex gap-4">
      <button
        v-if="index !== 0"
        class="p-4 bg-slate-800 rounded text-slate-100"
        type="button"
        @click="$emit('prevStep')"
      >
        prev
      </button>
      <button class="p-4 bg-slate-800 rounded text-slate-100" type="submit">next</button>
    </div>

    <pre>{{ errors }}</pre>
  </form>
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
  questionItem: QuestionItem
  index: number
}

interface Emits {
  (event: 'nextStep', formValues: FormQuestionModel): void
  (event: 'prevStep'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const { handleSubmit, errors, values, setFieldValue } = useForm<FormQuestionModel>({
  initialValues: {
    questionId: props.questionItem.questionId,
    answerId: props.questionItem.playerAnswer
  },
  validationSchema: toTypedSchema(formQuestionValidator)
})

const handleAnswerChange = (answerId: number) => {
  setFieldValue('answerId', answerId)
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

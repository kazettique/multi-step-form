<template>
  <div :class="` ${props.class}`">game form</div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { commonQuestionList, dppQuestionList } from './constants';
import { useForm } from 'vee-validate';
import { FormQuestionValidator, type FormQuestionModel } from './validator';
import { toTypedSchema } from '@vee-validate/zod';
import type { QuestionItem } from './types';

interface Props {
  class?: string
  questionItem: QuestionItem;
}

interface Emits {
  (event: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const { handleSubmit, errors, values, setFieldValue } = useForm<FormQuestionModel>({
  initialValues: props.initialValues,
  validationSchema: toTypedSchema(FormQuestionValidator)
})

const handlePartyChange = (party: Party) => {
  setFieldValue('party', party)
}

const onSubmit = handleSubmit((values) => emits('stepNext', values))
</script>

<style scoped lang="scss"></style>

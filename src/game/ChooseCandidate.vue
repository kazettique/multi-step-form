<template>
  <div :class="` ${props.class}`">game form</div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { commonQuestionList, dppQuestionList } from './constants';

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

console.log('commonQuestionList', commonQuestionList)
console.log('dppQuestionList', dppQuestionList)

// const { state, send } = useMachine(multiStepFormMachine)
</script>

<style scoped lang="scss"></style>

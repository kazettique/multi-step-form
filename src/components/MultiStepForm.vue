<template>
  <div :class="`h-full w-full ${props.class}`">
    <h1 class="title">Multi Step Form Example</h1>

    <div class="grid grid-cols-2 gap-x-6">
      <div>
        <h2 class="subTitle">Form Component</h2>

        <div class="p-4 border border-slate-700 rounded-lg">
          <Form1
            v-if="state.matches('step1')"
            @next="send('NEXT_TO_STEP_2', { formValues: $event })"
            @prev="send('PREV')"
            :initial-values="state.context.form1Values"
          />

          <Form2
            v-if="state.matches('step2')"
            @next="send('NEXT_TO_STEP_3', { formValues: $event })"
            @prev="send('PREV')"
            :initial-values="state.context.form2Values"
          />

          <Form3
            v-if="state.matches('step3')"
            @next="send('NEXT_TO_STEP_RESULT', { formValues: $event })"
            @prev="send('PREV')"
            :initial-values="state.context.form3Values"
          />

          <FormResult
            v-if="state.matches('stepResult')"
            @prev="send('PREV')"
            :machine-context="state.context"
          />
        </div>
      </div>
      <div>
        <p class="subTitle">Current Machine Context</p>
        <pre class="preBlock">{{ state.context }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import Form1 from '@/components/Form1.vue'
import Form2 from '@/components/Form2.vue'
import Form3 from '@/components/Form3.vue'
import FormResult from '@/components/FormResult.vue'
import { multiStepFormMachine } from '@/multiFormMachine'

interface Props {
  class?: string
}

interface Emits {
  (event: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const { state, send } = useMachine(multiStepFormMachine)
</script>

<style scoped lang="scss"></style>

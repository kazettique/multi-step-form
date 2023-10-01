<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Confirm Your Information</h2>
    <p class="my-2 text-slate-700">Payload prepare for Ajax Request shown below:</p>
    <hr class="border-b border-slate-700" />
    <pre class="preBlock">{{ props.payload }}</pre>

    <p class="text-slate-700 my-2">Please confirm your subscription.</p>

    <div class="buttonGroup w-fit">
      <button class="button" type="button" @click="$emit('prev')" :disabled="props.isSubmitting">
        back
      </button>
      <button class="button" type="button" @click="$emit('submit')" :disabled="props.isSubmitting">
        <span v-if="props.isSubmitting">sending...</span>
        <span v-else>confirm</span>
      </button>
    </div>

    <div v-if="props.error" class="error">{{ props.error }}</div>
  </div>
</template>

<script setup lang="ts">
import type { MachineContext } from '@/multStepFormMachine'
import type { SubmitData } from '@/types';
import { computed } from 'vue'

interface Props {
  class?: string
  machineContext: MachineContext
  isSubmitting: boolean
  error: string | null
  payload: SubmitData | null
}

interface Emits {
  (event: 'prev'): void
  (event: 'submit'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  error: null
})

const emits = defineEmits<Emits>()

// const payload = computed(() => ({
//   ...props.machineContext.form1Values,
//   ...props.machineContext.form2Values,
//   ...props.machineContext.form3Values
// }))
</script>

<style scoped lang="scss"></style>
@/multStepFormMachine
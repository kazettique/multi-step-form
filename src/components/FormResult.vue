<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Result</h2>
    <p class="my-2 text-slate-700">Payload prepare for Ajax Request shown below:</p>
    <hr class="border-b border-slate-700" />
    <pre class="preBlock">{{ payload }}</pre>

    <p class="text-slate-700 my-2">Confirm submit the form?</p>

    <div class="buttonGroup">
      <button class="button" type="button" @click="$emit('prev')">back</button>
      <button class="button" type="button" @click="handleRequest" :disabled="isLoading">
        <span v-if="isLoading">sending...</span>
        <span v-else>confirm submit</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MachineContext } from '@/multiFormMachine'
import { computed, ref } from 'vue'

interface Props {
  class?: string
  machineContext: MachineContext
}

interface Emits {
  (event: 'prev'): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const isLoading = ref<boolean>(false)

const payload = computed(() => ({
  ...props.machineContext.form1Values,
  ...props.machineContext.form2Values,
  ...props.machineContext.form3Values
}))

const handleRequest = async () => {
  isLoading.value = true

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(alert('request sent!'))
    }, 3000)
  )

  isLoading.value = false
}
</script>

<style scoped lang="scss"></style>

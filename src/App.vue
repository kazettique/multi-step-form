<template>
  <div class="flex items-center justify-center p-20 w-screen h-screen">
    <MultiStepForm />
  </div>
</template>

<script setup lang="ts">
import MultiStepForm from './components/MultiStepForm.vue'
</script>

<style>
.button {
  @apply bg-slate-700 hover:bg-slate-600 text-gray-200 rounded-full px-4 py-2 uppercase;
}

.buttonGroup {
  @apply flex gap-x-4 mx-auto;
}

.error {
  @apply text-red-500 mx-2;
}

.title {
  @apply text-4xl text-slate-700 mb-6 text-center p-4 bg-slate-300 rounded-lg font-bold;
}

.subTitle {
  @apply text-3xl text-slate-700 font-semibold my-2;
}

.form {
  @apply p-10 flex flex-col justify-center gap-y-4;
}

.formTitle {
  @apply text-2xl text-slate-700;
}

.label {
  @apply mx-2 text-slate-600;
}

.preBlock {
  @apply my-2 bg-slate-100 rounded-lg p-4;
}
</style>

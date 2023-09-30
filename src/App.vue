<template>
  <div class="flex items-center justify-center p-20 w-screen h-screen">
  <MultiStageForm />
  </div>
</template>

<script setup lang="ts">
import MultiStageForm from './components/MultiStageForm.vue'
</script>

<style>
.button {
  @apply bg-slate-700 hover:bg-slate-600 text-gray-200 rounded-full px-4 py-2 w-fit mx-auto;
}

.error {
  @apply text-red-500;
}

.title {
  @apply text-4xl text-slate-700 mb-6;
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

</style>

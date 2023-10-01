<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Complete</h2>
    <p class="text-slate-700 text-2xl text-center my-10 font-semibold">
      Congratulation! You have subscribed our awesome channels!
    </p>

    <div class="buttonGroup w-fit">
      <button class="button" type="button" @click="$emit('restart')">Subscribe channels again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  class?: string
}

interface Emits {
  (event: 'restart'): void
}

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  class: '',
  error: null
})
</script>

<style scoped lang="scss"></style>

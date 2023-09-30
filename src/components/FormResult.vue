<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Result</h2>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="scss"></style>

<template>
  <div :class="`${props.class}`">
    <h1 class="text-3xl">Multi Stage Form Example</h1>
    <Form1 />
    <hr>
    <Form2 />
    <hr>
    <Form3 />
  </div>
</template>

<script setup lang="ts">
import Form1 from '@/components/Form1.vue'
import Form2 from '@/components/Form2.vue'
import Form3 from '@/components/Form3.vue'

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

const handleClick = () => emits('click')
</script>

<style scoped lang="scss"></style>

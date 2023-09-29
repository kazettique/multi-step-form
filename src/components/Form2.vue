<template>
  <div :class="`${props.class}`">
    <h2>Stage 2</h2>
    <form @submit="onSubmit">
      <div>
        <input type="checkbox" id="discovery" :value="1" v-model="channels" />
        <label for="discovery">Discovery</label>

        <input type="checkbox" id="nationGeographic" :value="2" v-model="channels" />
        <label for="nationGeographic">Nation Geographic</label>

        <input type="checkbox" id="bbc" :value="3" v-model="channels" />
        <label for="bbc">BBC</label>

        <input type="checkbox" id="cnn" :value="4" v-model="channels" />
        <label for="cnn">CNN</label>
      </div>

      <div v-if="errors.channels" style="color: red">{{ errors.channels }}</div>

      <button type="submit">go to next</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { FormModel2 } from '@/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import z from 'zod'

interface Props {
  class?: string
}

interface Emits {
  (event: 'submit', values: FormModel2): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const validationSchema = toTypedSchema(
  z.object({
    channels: z.number().array().nonempty('Please choose at least one channel.')
  })
)

const initialValues: FormModel2 = { channels: [] }

const { handleSubmit, errors, values } = useForm<FormModel2>({
  initialValues,
  validationSchema
})

const { value: channels } = useField<number[]>('channels')

const onSubmit = handleSubmit((values) => emits('submit', values))
</script>

<style scoped lang="scss"></style>

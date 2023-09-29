<template>
  <div :class="`${props.class}`">
    <h2>Stage 1</h2>
    <form @submit="onSubmit">
      <div>
        <label>Your Name:</label>
        <input name="name" v-model="name" />
        <div v-if="errors.name" style="color: red">{{ errors.name }}</div>
      </div>

      <div>
        <label>Your Age:</label>
        <input name="age" v-model="age" type="number" />
        <div v-if="errors.age" style="color: red">{{ errors.age }}</div>
      </div>

      <div>
        <label>Your Email:</label>
        <input name="email" v-model="email" />
        <div v-if="errors.email" style="color: red">{{ errors.email }}</div>
      </div>

      <button type="submit">go to next</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { FormModel1 } from '@/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import z from 'zod'

interface Props {
  class?: string
}

interface Emits {
  (event: 'submit', values: FormModel1): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Please enter your name'),
    age: z.number().nonnegative().min(1, 'Please enter your age'),
    email: z.string().email('Please enter right email format').min(1, 'Please enter your email')
  })
)

const initialValues: FormModel1 = { name: '', age: 0, email: '' }

const { handleSubmit, errors, values } = useForm<FormModel1>({
  initialValues,
  validationSchema
})

const { value: name } = useField<string>('name')
const { value: age } = useField<number>('age')
const { value: email } = useField<number>('email')

const onSubmit = handleSubmit((values) => emits('submit', values))
</script>

<style scoped lang="scss"></style>

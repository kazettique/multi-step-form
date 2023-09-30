<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Enter you personal information</h2>
    <form class="form" @submit="onSubmit">
      <div>
        <label class="label">Your Name:</label>
        <input name="name" v-model="name" />
        <div v-if="errors.name" class="error">{{ errors.name }}</div>
      </div>

      <div>
        <label class="label">Your Age:</label>
        <input name="age" v-model="age" type="number" />
        <div v-if="errors.age" class="error">{{ errors.age }}</div>
      </div>

      <div>
        <label class="label">Your Email:</label>
        <input name="email" v-model="email" />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>

      <button type="submit" class="button">next step</button>
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
  (event: 'prev'): void
  (event: 'next', values: FormModel2): void
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

const initialValues: FormModel2 = { name: '', age: 0, email: '' }

const { handleSubmit, errors, values } = useForm<FormModel2>({
  initialValues,
  validationSchema
})

const { value: name } = useField<string>('name')
const { value: age } = useField<number>('age')
const { value: email } = useField<number>('email')

const onSubmit = handleSubmit((values) => emits('next', values))
</script>

<style scoped lang="scss"></style>

<template>
  <div :class="`${props.class}`">
    <h2>Stage 3</h2>
    <form @submit="onSubmit">
      <div>
        <label>Credit Card Number:</label>
        <input name="cardNo" v-model="cardNo" />
        <div v-if="errors.cardNo" style="color: red">{{ errors.cardNo }}</div>
      </div>

      <div>
        <label>Expire Month:</label>
        <select name="expireMonth" v-model="expireMonth">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <div v-if="errors.expireMonth" style="color: red">{{ errors.expireMonth }}</div>
      </div>

      <div>
        <label>Expire Year:</label>
        <select name="expireYear" v-model="expireYear">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <span v-if="errors.expireYear" style="color: red">{{ errors.expireYear }}</span>
      </div>

      <div>
        <label>CVC:</label>
        <input name="cvc" v-model="cvc" />
        <div v-if="errors.cvc" style="color: red">{{ errors.cvc }}</div>
      </div>

      <button type="submit">go to next</button>
    </form>

    <pre>{{ values }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { FormModel3 } from '@/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import z from 'zod'

interface Props {
  class?: string
}

interface Emits {
  (event: 'submit', values: FormModel3): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const validationSchema = toTypedSchema(
  z.object({
    cardNo: z.string().min(1, 'Please enter your credit card number'),
    expireMonth: z.string(),
    expireYear: z.string(),
    cvc: z.string().min(1, 'Please enter your cvc code')
  })
)

const initialValues: FormModel3 = { cardNo: '', expireMonth: '1', expireYear: '2023', cvc: '' }

const { handleSubmit, errors, values } = useForm<FormModel3>({
  initialValues,
  validationSchema
})

const { value: cardNo } = useField<string>('cardNo')
const { value: expireMonth } = useField<string>('expireMonth')
const { value: expireYear } = useField<string>('expireYear')
const { value: cvc } = useField<number>('cvc')

const onSubmit = handleSubmit((values) => emits('submit', values))
</script>

<style scoped lang="scss"></style>

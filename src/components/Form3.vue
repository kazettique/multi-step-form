<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Enter you credit card information</h2>
    <form class="form" @submit="onSubmit">
      <div>
        <label class="label">Credit Card Number:</label>
        <input name="cardNo" v-model="cardNo" />
        <div v-if="errors.cardNo" class="error">{{ errors.cardNo }}</div>
      </div>

      <div>
        <label class="label">Expire Month:</label>
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
        <div v-if="errors.expireMonth" class="button">{{ errors.expireMonth }}</div>
      </div>

      <div>
        <label class="label">Expire Year:</label>
        <select name="expireYear" v-model="expireYear">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <span v-if="errors.expireYear" class="error">{{ errors.expireYear }}</span>
      </div>

      <div>
        <label class="label">CVC:</label>
        <input name="cvc" v-model="cvc" />
        <div v-if="errors.cvc" class="error">{{ errors.cvc }}</div>
      </div>

      <div class="buttonGroup">
        <button class="button" type="button" @click="$emit('prev')">back</button>
        <button type="submit" class="button">next step</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { form3Validator, type Form3Model } from '@/validators/form3'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'

interface Props {
  class?: string
  initialValues: Form3Model
}

interface Emits {
  (event: 'prev'): void
  (event: 'next', values: Form3Model): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const { handleSubmit, errors } = useForm<Form3Model>({
  initialValues: props.initialValues,
  validationSchema: toTypedSchema(form3Validator)
})

const { value: cardNo } = useField<Form3Model['cardNo']>('cardNo')
const { value: expireMonth } = useField<Form3Model['expireMonth']>('expireMonth')
const { value: expireYear } = useField<Form3Model['expireYear']>('expireYear')
const { value: cvc } = useField<Form3Model['cvc']>('cvc')

const onSubmit = handleSubmit((values) => emits('next', values))
</script>

<style scoped lang="scss"></style>

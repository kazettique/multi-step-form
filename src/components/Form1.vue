<template>
  <div :class="`${props.class}`">
    <h2 class="formTitle">Choose channels you like</h2>
    <form class="form" @submit="onSubmit">
      <div>
        <input type="checkbox" id="discovery" :value="1" v-model="channels" />
        <label class="label" for="discovery">Discovery</label>
      </div>

      <div>
        <input type="checkbox" id="nationalGeographic" :value="2" v-model="channels" />
        <label class="label" for="nationalGeographic">National Geographic</label>
      </div>

      <div>
        <input type="checkbox" id="espn" :value="3" v-model="channels" />
        <label class="label" for="espn">ESPN</label>
      </div>

      <div>
        <input type="checkbox" id="cartoonNetwork" :value="4" v-model="channels" />
        <label class="label" for="cartoonNetwork">Cartoon Network</label>
      </div>

      <div v-if="errors.channels" class="error">{{ errors.channels }}</div>

      <div class="buttonGroup">
        <button class="button" type="submit">next step</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { Form1Validator, type Form1Model } from '@/validators/form1'

interface Props {
  class?: string
  initialValues: Form1Model
}

interface Emits {
  (event: 'next', values: Form1Model): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const { handleSubmit, errors, values } = useForm<Form1Model>({
  initialValues: props.initialValues,
  validationSchema: toTypedSchema(Form1Validator)
})

const { value: channels } = useField<Form1Model['channels']>('channels')

const onSubmit = handleSubmit((values) => emits('next', values))
</script>

<style scoped lang="scss"></style>

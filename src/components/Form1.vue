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

      <button class="button" type="submit">next step</button>
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
  (event: 'next', values: FormModel1): void
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

const initialValues: FormModel1 = { channels: [] }

const { handleSubmit, errors, values } = useForm<FormModel1>({
  initialValues,
  validationSchema
})

const { value: channels } = useField<number[]>('channels')

const onSubmit = handleSubmit((values) => emits('next', values))
</script>

<style scoped lang="scss"></style>

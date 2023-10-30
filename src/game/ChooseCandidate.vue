<template>
  <form :class="`${props.class}`" @submit="onSubmit">
  <div class="flex gap-4">
    <button
      class="candidate"
      :data-is-active="values.party === Party.DPP"
      type="button"
      @click="handlePartyChange(Party.DPP)"
    >
      DPP
    </button>
    <button
      class="candidate"
      :data-is-active="values.party === Party.KMT"
      type="button"
      @click="handlePartyChange(Party.KMT)"
    >
      KMT
    </button>
    <button
      class="candidate"
      :data-is-active="values.party === Party.TPP"
      type="button"
      @click="handlePartyChange(Party.TPP)"
    >
      TPP
    </button>
    <button
      class="candidate"
      :data-is-active="values.party === Party.GTM"
      type="button"
      @click="handlePartyChange(Party.GTM)"
    >
      GTM
    </button>
    </div>

    <button type="submit">submit</button>

    <div v-if="errors">errors: {{ errors }}</div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { formCandidateValidator, type FormCandidateModel } from './validator'
import { Party } from './types'

interface Props {
  class?: string
  initialValues: FormCandidateModel
}

interface Emits {
  (event: 'stepNext', formValues: FormCandidateModel): void
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const emits = defineEmits<Emits>()

const { handleSubmit, errors, values, setFieldValue } = useForm<FormCandidateModel>({
  initialValues: props.initialValues,
  validationSchema: toTypedSchema(formCandidateValidator)
})

const handlePartyChange = (party: Party) => {
  setFieldValue('party', party)
}

const onSubmit = handleSubmit((values) => {
  emits('stepNext', values)
})
</script>

<style scoped>
.candidate {
  @apply p-10 bg-slate-500 transition;

  &[data-is-active='true'] {
    @apply scale-110;
  }

  &[data-is-active='false'] {
    @apply scale-100;
  }
}
</style>

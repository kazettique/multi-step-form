<template>
  <div>
    <div v-if="props.fieldTitle" >{{ props.fieldTitle }}</div>
    <div class="flex items-center">
      <BasicInput
        v-model="value"
        class="h-fit"
        v-bind:name="props.fieldName"
        v-bind:placeholder="props.placeholder"
        v-bind:type="props.type"
        v-bind:disabled="props.disabled"
        v-on:keyup.enter="handleSubmit"
      >
        <template v-slot:prefix>
          <slot name="prefix" />
        </template>
        <template v-slot:suffix>
          <slot name="suffix" />
        </template>
      </BasicInput>
      <slot name="outerSuffix" />
    </div>
    <FormMessage v-bind:field-name="props.fieldName" v-bind:hints="props.hints" />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

import FormMessage from '@/components/FormMessage.vue';

interface Props {
  class?: string;
  disabled?: boolean;
  fieldName: string;
  fieldTitle?: NString;
  hints?: string[];
  placeholder?: string;
}

interface Emits {
  (event: 'submit'): void;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  fieldTitle: null,
  hints: () => [],
  placeholder: '',
  type: 'text',
});

const emits = defineEmits<Emits>();

const handleSubmit = () => emits('submit');

const { value } = useField<string>(props.fieldName);
</script>

<style scoped lang="scss">
</style>

<template>
  <!-- Form -->
  <div class="form-group mb-4">
    <label :for="labelId">{{ label }}</label>
    <div class="input-group" :class="{ 'is-invalid': error.length }">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <font-awesome-icon :icon="icon" />
        </span>
      </div>
      <input
        :id="labelId"
        v-model="model"
        class="form-control"
        :placeholder="placeholder"
        :type="type"
        :aria-label="`field ${label}`"
        :required="required"
        :aria-required="required"
        :name="name"
        @blur="$emit('blur', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div class="invalid-feedback">{{ $t(error) }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface InputFieldProps {
  type: string
  placeholder: string
  labelId: string
  label: string
  icon: Array<string>
  required: Boolean
  value: string
  name: string
  error: string
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: 'default placeholder',
    },
    labelId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'default label',
    },
    icon: {
      type: Array as () => InputFieldProps['icon'],
      default: (): InputFieldProps['icon'] => ['fas', 'question'],
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'input',
    },
    error: {
      type: String,
      default: '',
    },
  },
  computed: {
    model: {
      get() {
        return (this as any).value
      },
      set(v) {
        ;(this as any).$emit('input', v)
      },
    },
  },
})
</script>

<style>
.is-invalid {
  border: 1px solid #a91e2c;
}
</style>

<template>
  <!-- Form -->
  <div class="form-group">
    <label :for="labelId">{{ label }}</label>
    <div class="input-group mb-4">
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
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
      type: Array,
      default: () => ['fas', 'question'],
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
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

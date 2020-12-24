<template>
  <button :class="css">
    <font-awesome-icon v-if="icon" :icon="icon" class="mr-2" />
    <slot />
    <span
      v-if="isLoading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export interface ButtonProps {
  icon?: Array<String>
  css?: String
  isLoading?: Boolean
}

export default Vue.extend({
  props: {
    icon: {
      type: Array as () => ButtonProps['icon'],
      required: false,
      default: undefined,
    },
    css: {
      type: String,
      required: false,
      default: 'btn',
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

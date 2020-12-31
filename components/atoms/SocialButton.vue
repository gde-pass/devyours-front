<template>
  <button
    :class="'btn btn-primary btn-pill btn-icon-only ' + color"
    type="button"
    :aria-label="`${icon[1]} button`"
    :title="`${icon[1]} button`"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export interface SocialButtonProps {
  icon: Array<String>
  color: String
}

export default Vue.extend({
  props: {
    icon: {
      type: Array as () => SocialButtonProps['icon'],
      default: (): SocialButtonProps['icon'] => ['fas', 'question'],
    },
    color: {
      type: String,
      default: '',
    },
  },
})
</script>

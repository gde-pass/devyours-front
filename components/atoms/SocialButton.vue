<template>
  <button
    :class="'btn btn-primary btn-icon-only ' + icon[2]"
    type="button"
    :aria-label="`${icon[1]} button`"
    :title="`${icon[1]} button`"
  >
    <font-awesome-icon :icon="icon.slice(0, -1)" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    icon: {
      type: Array,
      default() {
        return ['fas', 'question']
      },
    },
  },
})
</script>

<template>
  <div class="btn-wrapper my-4 text-center">
    <social-button
      v-for="(icon, index) in icons"
      :key="icon[1] + index"
      :icon="icon"
      :class="{ 'mr-2': index + 1 !== icons.length }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    icons: {
      type: Array,
      default() {
        return [
          ['fas', 'question', 'default1'],
          ['fas', 'question', 'default2'],
          ['fas', 'question', 'default3'],
        ]
      },
    },
  },
})
</script>

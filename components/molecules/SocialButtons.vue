<template>
  <div class="btn-wrapper my-4 text-center">
    <social-button
      v-for="(icon, index) in icons"
      :key="icon[1]"
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
      required: true,
    },
  },
})
</script>

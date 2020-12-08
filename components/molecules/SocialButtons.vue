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

<script>
export default {
  props: {
    icons: {
      type: Array,
      default() {
        return [
          ['fas', 'question'],
          ['fas', 'question'],
          ['fas', 'question'],
        ]
      },
    },
  },
}
</script>

<style></style>

<template>
  <button
    :class="'btn btn-primary btn-icon-only text-' + icon[1]"
    type="button"
    :aria-label="icon[1] + 'button'"
    :title="icon[1] + 'button'"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: Array,
      default() {
        return ['fas', 'question']
      },
    },
  },
}
</script>

<style></style>

<template>
  <h1 class="title" :class="css">{{ content }}</h1>
</template>

<script>
export default {
  name: 'H1',
  props: {
    content: {
      type: String,
      default: null,
    },
    css: {
      type: String,
      default: 'default',
    },
  },
}
</script>

<style lang="scss" scoped>
.default {
  font-weight: 400;
  color: $black;
}
</style>

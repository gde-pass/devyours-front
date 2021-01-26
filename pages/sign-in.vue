<template>
  <sign-in-form />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SignIn', // bug warning fix, see: https://github.com/nuxt-community/router-module/issues/67
})
</script>

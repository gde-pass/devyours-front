<template>
  <div class="mt-6">
    <pre>{{ isConnected }}</pre>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="toggle">{{ isConnected }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  computed: {
    ...mapGetters({ isConnected: 'user/getStatus' }),
  },
  methods: {
    ...mapMutations({
      toggle: 'user/toggle',
      increment: 'user/increment',
      decrement: 'user/decrement',
    }),
  },
})
</script>

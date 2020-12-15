<template>
  <div class="m-6">
    <div class="container text-center">
      <button @click="toggle">Status: {{ isConnected }}</button>
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
    }),
  },
})
</script>

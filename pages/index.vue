<template>
  <div class="m-6">
    <div class="container text-center">
      <button @click="toggle">Status: {{ isConnected }}</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ isConnected: 'user/getStatus' }),
  },
  methods: {
    ...mapMutations({
      toggle: 'user/toggle',
    }),
  },
}
</script>

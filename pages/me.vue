<template>
  <pre class="p-6 bg-gray-100">{{ JSON.stringify(me, null, 2) }}</pre>
</template>

<script lang="ts">
import Vue from 'vue'
import meQuery from '~/gql/queries/me.gql'

export default Vue.extend({
  middleware: ['authenticated'],
  apollo: {
    me: {
      query: meQuery,
    },
  },
})
</script>

<template>
  <pre class="p-6 bg-gray-100">{{ JSON.stringify(me, null, 2) }}</pre>
</template>

<script>
import meQuery from '~/gql/queries/me.gql'

export default {
  middleware: ['protected'],
  data: () => ({
    me: {},
  }),
  apollo: {
    me: {
      query: meQuery,
    },
  },
}
</script>

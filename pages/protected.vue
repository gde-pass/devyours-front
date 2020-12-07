<template>
  <pre class="p-4 bg-gray-100">{{ JSON.stringify(me, null, 2) }}</pre>
</template>

<script>
import meQuery from '~/queries/me.gql'

export default {
  middleware: ['protected', 'updateUserStatus'],
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

<template>
  <div class="container mx-auto">
    <div class="flex">
      <div class="w-full p-8">
        <pre class="p-4 bg-gray-100">{{ JSON.stringify(me, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import meQuery from '~/queries/me.gql'

export default {
  middleware: ['authenticated'],
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

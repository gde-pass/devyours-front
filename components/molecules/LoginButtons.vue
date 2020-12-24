<template>
  <client-only>
    <div v-if="!isConnected" class="d-flex align-items-center">
      <NuxtLink to="/sign-in" class="btn btn-primary text-secondary mr-3">
        Sign In
      </NuxtLink>
      <NuxtLink to="/sign-up" class="btn btn-primary d-md-inline-block">
        <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" />
        Sign Up
      </NuxtLink>
    </div>
    <div v-else>
      <Button
        :icon="['fas', 'sign-out-alt']"
        css="btn btn-primary d-md-inline-block"
        @click.native="logout()"
        >Log out</Button
      >
    </div>
  </client-only>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  computed: {
    ...mapGetters({ isConnected: 'user/getStatus' }),
  },
  methods: {
    ...mapMutations({
      toggle: 'user/toggle',
    }),
    async logout() {
      await this.$apolloHelpers.onLogout()
      this.toggle()
      this.$router.push('/')
    },
  },
})
</script>

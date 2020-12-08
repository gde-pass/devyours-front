<template>
  <header class="header-global">
    <nav
      id="navbar-main"
      aria-label="Primary navigation"
      class="navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-light"
    >
      <div class="container position-relative">
        <logo />
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
          <button class="btn btn-primary d-md-inline-block" @click="logout()">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
            Log out
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['isConnected']),
  methods: {
    async logout() {
      // clear apollo-token from cookies to make sure user is fully logged out
      await this.$apolloHelpers.onLogout()

      // Change store path
      this.$store.commit('switchOffUserConnexionStatus')
      this.$router.push('/')
    },
  },
}
</script>

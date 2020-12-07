<template>
  <header class="header-global mb-6">
    <nav
      id="navbar-main"
      aria-label="Primary navigation"
      class="navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-light"
    >
      <div class="container position-relative">
        <a
          class="navbar-brand shadow-soft py-2 px-3 rounded border border-light mr-lg-4"
          href="index.html"
        >
          <img class="navbar-brand-dark" src="/dark.svg" alt="Logo light" />
          <img class="navbar-brand-light" src="/dark.svg" alt="Logo dark" />
        </a>
        <div class="d-flex align-items-center">
          <NuxtLink to="/login" class="btn btn-primary text-secondary mr-3">
            Log In
          </NuxtLink>
          <NuxtLink to="/signin" class="btn btn-primary d-md-inline-block">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" />
            Sign In
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      // clear apollo-token from cookies to make sure user is fully logged out
      await this.$apolloHelpers.onLogout()
      this.$store.commit('switchOffUserConnexionStatus')
      this.$router.push('/')
    },
  },
}
</script>

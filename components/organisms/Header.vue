<template>
  <header>
    <nav class="is-flex" role="navigation" aria-label="main navigation">
      <div class="navbar-brand shadow-soft rounded border border-light">
        <nuxt-link class="navbar-item" to="/">
          <Logo />
        </nuxt-link>

        <!-- <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-data-target"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> -->
      </div>
      <!-- <div id="navbar-data-target" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"> Home </a>

          <a class="navbar-item"> Documentation </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> About </a>
              <a class="navbar-item"> Jobs </a>
              <a class="navbar-item"> Contact </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>
        </div>
      </div> -->
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="!this.$store.state.isConnected">
              <NuxtLink to="/login" class="button is-primary">
                <strong>Sign up</strong>
              </NuxtLink>
              <NuxtLink to="/login" class="button is-light">Log in</NuxtLink>
            </div>
            <div v-else>
              <a class="button is-primary" @click.prevent="logout()">Log out</a>
            </div>
          </div>
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

<style>
header {
  max-height: 3.5rem;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: space-between;
}
</style>

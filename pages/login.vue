<template>
  <div>
    <SignInForm />
  </div>
</template>

<script>
export default {
  async mounted() {
    // clear apollo-token from cookies to make sure user is fully logged out
    await this.$apolloHelpers.onLogout()
  },
}
</script>

<style></style>

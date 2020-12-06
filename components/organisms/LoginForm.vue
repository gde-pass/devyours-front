<template>
  <form
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    @submit.prevent="login()"
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username"
        >Username</label
      >
      <input
        id="username"
        v-model="form.identifier"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
        >Password</label
      >
      <input
        id="password"
        v-model="form.password"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        placeholder="******************"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign In
      </button>
      <a
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
        >Forgot Password?</a
      >
    </div>
  </form>
</template>

<script>
import loginQuery from '~/queries/login.gql'

export default {
  data: () => ({
    form: {
      identifier: '',
      password: '',
    },
  }),
  methods: {
    async login() {
      const credentials = this.form
      try {
        const {
          data: {
            login: { jwt },
          },
        } = await this.$apollo.mutate({
          mutation: loginQuery,
          variables: credentials,
        })
        // set the jwt to the this.$apolloHelpers.onLogin
        await this.$apolloHelpers.onLogin(jwt)
        // set store variable
        this.$store.commit('switchOnUserConnexionStatus')
        this.$router.push('/')
      } catch (e) {
        // console.error(e)
      }
    },
  },
}
</script>

<style></style>

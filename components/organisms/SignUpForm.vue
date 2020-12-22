<template>
  <!-- Section -->
  <section class="min-vh-100 d-flex bg-primary align-items-center section">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 justify-content-center">
          <div class="card bg-primary shadow-soft border-light p-4">
            <div class="card-header text-center pb-0">
              <h2 class="h4">Create Account</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="signUp()">
                <!-- Email -->
                <input-field
                  v-model="form.email"
                  label-id="email"
                  label="Your email"
                  placeholder="example@company.com"
                  type="email"
                  :icon="['fas', 'envelope']"
                  :required="true"
                />

                <!-- Username -->
                <input-field
                  v-model="form.username"
                  label-id="username"
                  label="Username"
                  placeholder="DevYours"
                  type="text"
                  :icon="['fas', 'user']"
                  :required="true"
                />

                <!-- Password -->
                <input-field
                  v-model="form.password"
                  label-id="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  :icon="['fas', 'unlock-alt']"
                  :required="true"
                />

                <!-- Confirm Password -->
                <input-field
                  v-model="form.confirmPassword"
                  label-id="confirmPassword"
                  label="Confirm password"
                  placeholder="Confirm password"
                  type="password"
                  :icon="['fas', 'unlock-alt']"
                  :required="true"
                />

                <div class="form-check mb-4">
                  <input
                    id="defaultCheck6"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label class="form-check-label" for="defaultCheck6">
                    I agree to the <a href="#">terms and conditions</a>
                  </label>
                </div>
                <button type="submit" class="btn btn-block btn-primary">
                  Sign in
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </form>
              <div class="mt-3 mb-4 text-center">
                <span class="font-weight-normal">or</span>
              </div>
              <social-buttons
                :icons="[
                  ['fab', 'facebook-f'],
                  ['fab', 'twitter'],
                  ['fab', 'github'],
                ]"
                :colors="['text-facebook', 'text-twitter', 'text-github']"
              />
              <div
                class="d-block d-sm-flex justify-content-center align-items-center mt-4"
              >
                <span class="font-weight-normal">
                  Already have an account?
                  <NuxtLink to="/sign-in" class="font-weight-bold"
                    >Login here</NuxtLink
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import createUserMutation from '~/gql/mutations/createUser.gql'

export default Vue.extend({
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    isLoading: false,
  }),
  async mounted() {
    // clear apollo-token from cookies to make sure user is fully logged out
    await this.$apolloHelpers.onLogout()
    window.localStorage.removeItem('vuex')
  },
  methods: {
    async signUp() {
      const credentials = this.form

      try {
        this.isLoading = true
        await this.$apollo.mutate({
          mutation: createUserMutation,
          variables: credentials,
        })
        this.isLoading = false
        this.$router.push('/')
      } catch (e) {
        // console.error(e)
      }
    },
  },
})
</script>

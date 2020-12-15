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
                <!-- Form -->
                <div class="form-group">
                  <label for="email">Your email</label>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                      </span>
                    </div>
                    <input
                      id="email"
                      v-model="form.email"
                      class="form-control"
                      placeholder="example@company.com"
                      type="email"
                      aria-label="email adress"
                    />
                  </div>
                </div>
                <!-- Form -->
                <div class="form-group">
                  <label for="username">Username</label>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <font-awesome-icon :icon="['fas', 'user']" />
                      </span>
                    </div>
                    <input
                      id="username"
                      v-model="form.username"
                      class="form-control"
                      placeholder="DevYours"
                      type="text"
                      aria-label="username"
                    />
                  </div>
                </div>
                <!-- End of Form -->
                <div class="form-group">
                  <!-- Form -->
                  <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <font-awesome-icon :icon="['fas', 'unlock-alt']" />
                        </span>
                      </div>
                      <input
                        id="password"
                        v-model="form.password"
                        class="form-control"
                        placeholder="Password"
                        type="password"
                        aria-label="Password"
                        required
                      />
                    </div>
                  </div>
                  <!-- End of Form -->
                  <!-- Form -->
                  <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <font-awesome-icon :icon="['fas', 'unlock-alt']" />
                        </span>
                      </div>
                      <input
                        id="confirmPassword"
                        v-model="form.confirmPassword"
                        class="form-control"
                        placeholder="Confirm password"
                        type="password"
                        aria-label="Password"
                        required
                      />
                    </div>
                  </div>
                  <!-- End of Form -->
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
                  ['fab', 'facebook-f', 'text-facebook'],
                  ['fab', 'twitter', 'text-twitter'],
                  ['fab', 'github', 'text-github'],
                ]"
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

<template>
  <!-- Section -->
  <section class="min-vh-100 d-flex bg-primary align-items-center section">
    <div class="container">
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
              />
              <div
                class="d-block d-sm-flex justify-content-center align-items-center mt-4"
              >
                <span class="font-weight-normal">
                  Already have an account?
                  <a href="#" class="font-weight-bold">Login here</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import createUserMutation from '~/gql/mutations/createUser.gql'

export default {
  name: 'SignUpForm',
  data: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  }),
  async mounted() {
    // clear apollo-token from cookies to make sure user is fully logged out
    await this.$apolloHelpers.onLogout()
  },
  methods: {
    async signUp() {
      const credentials = this.form
      try {
        await this.$apollo.mutate({
          mutation: createUserMutation,
          variables: credentials,
        })

        this.$router.push('/#')
      } catch (e) {
        // console.error(e)
      }
    },
  },
}
</script>

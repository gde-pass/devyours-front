<template>
  <main>
    <!-- Section -->
    <section class="min-vh-100 d-flex bg-primary align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6 justify-content-center">
            <div class="card bg-primary shadow-soft border-light p-4">
              <div class="card-header text-center pb-0">
                <h2 class="h4">Sign in to our platform</h2>
              </div>
              <div class="card-body">
                <form action="#" class="mt-4">
                  <!-- Form -->
                  <div class="form-group">
                    <label for="exampleInputIcon3">Your email</label>
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <font-awesome-icon :icon="['fas', 'envelope']" />
                        </span>
                      </div>
                      <input
                        id="exampleInputIcon3"
                        class="form-control"
                        placeholder="example@company.com"
                        type="text"
                        aria-label="email adress"
                      />
                    </div>
                  </div>
                  <!-- End of Form -->
                  <div class="form-group">
                    <!-- Form -->
                    <div class="form-group">
                      <label for="exampleInputPassword6">Password</label>
                      <div class="input-group mb-4">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <font-awesome-icon :icon="['fas', 'unlock-alt']" />
                          </span>
                        </div>
                        <input
                          id="exampleInputPassword6"
                          class="form-control"
                          placeholder="Password"
                          type="password"
                          aria-label="Password"
                          required
                        />
                      </div>
                    </div>
                    <!-- End of Form -->
                    <div
                      class="d-block d-sm-flex justify-content-between align-items-center mb-4"
                    >
                      <div class="form-check">
                        <input
                          id="defaultCheck5"
                          class="form-check-input"
                          type="checkbox"
                          value=""
                        />
                        <label class="form-check-label" for="defaultCheck5">
                          Remember me
                        </label>
                      </div>
                      <div>
                        <a href="#" class="small text-right">Lost password?</a>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-block btn-primary">
                    Sign in
                  </button>
                </form>
                <div class="mt-3 mb-4 text-center">
                  <span class="font-weight-normal">or login with</span>
                </div>
                <div class="btn-wrapper my-4 text-center">
                  <button
                    class="btn btn-primary btn-icon-only text-facebook mr-2"
                    type="button"
                    aria-label="facebook button"
                    title="facebook button"
                  >
                    <font-awesome-icon :icon="['fab', 'facebook-f']" />
                  </button>
                  <button
                    class="btn btn-primary btn-icon-only text-twitter mr-2"
                    type="button"
                    aria-label="twitter button"
                    title="twitter button"
                  >
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                  </button>
                  <button
                    class="btn btn-primary btn-icon-only text-facebook"
                    type="button"
                    aria-label="github button"
                    title="github button"
                  >
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </button>
                </div>
                <div
                  class="d-block d-sm-flex justify-content-center align-items-center mt-4"
                >
                  <span class="font-weight-normal">
                    Not registered?
                    <a href="#" class="font-weight-bold">Create account</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
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

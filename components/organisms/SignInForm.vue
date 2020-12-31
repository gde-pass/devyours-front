<template>
  <!-- Section -->
  <section class="min-vh-100 d-flex bg-primary align-items-center section">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 justify-content-center">
          <div class="card bg-primary shadow-soft border-light p-4">
            <div class="card-header text-center pb-0">
              <h2 class="h4">{{ $t('SignInForm.title') }}</h2>
            </div>
            <div class="card-body">
              <form class="mt-4" @submit.prevent="SignIn()">
                <!-- Email -->
                <input-field
                  v-model="form.identifier"
                  label-id="email"
                  :label="$t('SignInForm.labels.email')"
                  :placeholder="$t('SignInForm.placeholders.email')"
                  type="email"
                  :icon="['fas', 'envelope']"
                  :required="true"
                />

                <!-- Password -->
                <input-field
                  v-model="form.password"
                  label-id="password"
                  :label="$t('SignInForm.labels.password')"
                  :placeholder="$t('SignInForm.placeholders.password')"
                  type="password"
                  :icon="['fas', 'unlock-alt']"
                  :required="true"
                />

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
                      {{ $t('SignInForm.remember') }}
                    </label>
                  </div>
                  <div>
                    <a href="#" class="small text-right">
                      {{ $t('SignInForm.lostPassword') }}
                    </a>
                  </div>
                </div>
                <Button
                  :is-loading="isLoading"
                  css="btn btn-block btn-primary"
                  @click="SignIn()"
                >
                  {{ $t('SignInForm.submit') }}
                </Button>
              </form>
              <div class="mt-3 mb-4 text-center">
                <span class="font-weight-normal">
                  {{ $t('SignInForm.alternatives') }}
                </span>
              </div>
              <SocialButtons
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
                  {{ $t('SignInForm.noAccount') }}
                  <NuxtLink
                    :to="localeRoute('sign-up')"
                    class="font-weight-bold"
                  >
                    {{ $t('SignInForm.toSignUpForm') }}
                  </NuxtLink>
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
import { mapMutations } from 'vuex'
import signInMutation from '~/gql/mutations/login.gql'

export default Vue.extend({
  data: () => ({
    form: {
      identifier: '',
      password: '',
    },
    isLoading: false,
  }),
  methods: {
    ...mapMutations({
      toggle: 'user/toggle',
    }),
    async SignIn() {
      const credentials = this.form
      try {
        this.isLoading = true

        // clear apollo-token from cookies and clear local storage to make sure user is fully logged out
        await this.$apolloHelpers.onLogout()
        // window.localStorage.removeItem('vuex')
        // get jwt token from apollo->strapi
        const {
          data: {
            login: { jwt },
          },
        } = await this.$apollo.mutate({
          mutation: signInMutation,
          variables: credentials,
        })

        // set the jwt to the this.$apolloHelpers.onLogin
        await this.$apolloHelpers.onLogin(jwt)
        // set isConnedted store variable
        this.toggle()
        this.isLoading = false
        // redirect user to homepage
        this.$router.push(this.localePath('index'))
      } catch (e) {
        // console.error(e)
      }
    },
  },
})
</script>

<template>
  <!-- Section -->
  <section class="min-vh-100 d-flex bg-primary align-items-center section">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 justify-content-center">
          <div class="card bg-primary shadow-soft border-light p-4">
            <div class="card-header text-center pb-0">
              <h2 class="h4">{{ $t('SignUpForm.title') }}</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="signUp()">
                <!-- Email -->
                <input-field
                  v-model="form.email"
                  label-id="email"
                  :label="$t('SignUpForm.labels.email')"
                  :placeholder="$t('SignUpForm.placeholders.email')"
                  type="email"
                  :icon="['fas', 'envelope']"
                  :required="true"
                />

                <!-- Username -->
                <input-field
                  v-model="form.username"
                  label-id="username"
                  :label="$t('SignUpForm.labels.username')"
                  :placeholder="$t('SignUpForm.placeholders.username')"
                  type="text"
                  :icon="['fas', 'user']"
                  :required="true"
                />

                <!-- Password -->
                <input-field
                  v-model="form.password"
                  label-id="password"
                  :label="$t('SignUpForm.labels.password')"
                  :placeholder="$t('SignUpForm.placeholders.password')"
                  type="password"
                  :icon="['fas', 'unlock-alt']"
                  :required="true"
                />

                <!-- Confirm Password -->
                <input-field
                  v-model="form.confirmPassword"
                  label-id="confirmPassword"
                  :label="$t('SignUpForm.labels.confirmPassword')"
                  :placeholder="$t('SignUpForm.placeholders.confirmPassword')"
                  type="password"
                  :icon="['fas', 'unlock-alt']"
                  :required="true"
                />

                <div class="form-check mb-4">
                  <input
                    id="defaultCheck6"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="defaultCheck6">
                    <i18n path="SignUpForm.term1">
                      <a href="#">{{ $t('SignUpForm.term2') }}</a>
                    </i18n>
                  </label>
                </div>
                <Button
                  :is-loading="isLoading"
                  css="btn btn-block btn-primary"
                  @click.native="signUp()"
                >
                  {{ $t('SignUpForm.submit') }}
                </Button>
              </form>
              <div class="mt-3 mb-4 text-center">
                <span class="font-weight-normal">
                  {{ $t('SignUpForm.alternatives') }}
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
                  {{ $t('SignUpForm.alreadyRegistered') }}
                  <NuxtLink
                    :to="localeRoute('/sign-in')"
                    class="font-weight-bold"
                  >
                    {{ $t('SignUpForm.toSignInForm') }}
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
        this.$router.push(this.localePath('index'))
      } catch (e) {
        // console.error(e)
      }
    },
  },
})
</script>

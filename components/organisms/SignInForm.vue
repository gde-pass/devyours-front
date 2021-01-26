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
              <form
                class="mt-4"
                name="signInForm"
                novalidate
                @submit.prevent="SignIn()"
              >
                <!-- Email -->
                <input-field
                  v-model="form.email"
                  label-id="email"
                  :label="$t('SignInForm.labels.email')"
                  :placeholder="$t('SignInForm.placeholders.email')"
                  type="email"
                  :icon="['fas', 'envelope']"
                  :required="true"
                  name="email"
                  :error="errors.email"
                  @blur="validate('email')"
                  @input="validate('email')"
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
                  name="password"
                  :error="errors.password"
                  @blur="validate('password')"
                  @input="validate('password')"
                />

                <div
                  class="d-block d-sm-flex justify-content-between align-items-center mb-4"
                >
                  <div class="form-check">
                    <input
                      id="defaultCheck5"
                      class="form-check-input"
                      type="checkbox"
                      :value="form.rememberMe"
                      name="rememberMe"
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
import { object, string, boolean } from 'yup'
import signInMutation from '~/gql/mutations/login.gql'

// Create a yup schema to check form fields validity with
// Customs errors messages are i18n keys
const signInFormSchema = object().shape({
  email: string()
    .required('SignInForm.errors.email.required')
    .email('SignInForm.errors.email.invalid')
    .lowercase(),
  password: string()
    .min(6, 'SignInForm.errors.password.short')
    .max(128, 'SignInForm.errors.password.long')
    .required('SignInForm.errors.password.required'),
  rememberMe: boolean(),
})

interface Errors {
  [key: string]: string
}

export default Vue.extend({
  name: 'SignInForm',
  data: () => ({
    form: {
      email: '',
      password: '',
      rememberMe: false,
    },
    errors: {
      email: '',
      password: '',
      rememberMe: '',
    },
    isLoading: false,
  }),
  methods: {
    ...mapMutations({
      toggle: 'user/toggle',
    }),
    validate(field: string) {
      // use the yup schema created to check a single field validity
      signInFormSchema
        .validateAt(field, this.form)
        .then(() => {
          // When the field is valid we clean the error message
          ;(this.errors as Errors)[field] = ''
        })
        .catch((err) => {
          // When the field is invalid we setup the given error message
          ;(this.errors as Errors)[field] = err.message
        })
    },
    async SignIn() {
      try {
        // make the spinner button appear while logging in
        this.isLoading = true

        // clear apollo-token from cookies to make sure user is fully logged out
        await this.$apolloHelpers.onLogout()

        // check form validity
        signInFormSchema
          .validate(this.form, { abortEarly: false })
          .then(async () => {
            // login the user
            // get jwt token from apollo->strapi
            const {
              data: {
                login: { jwt },
              },
            } = await this.$apollo.mutate({
              mutation: signInMutation,
              variables: {
                identifier: this.form.email,
                password: this.form.password,
              },
            })

            // set the jwt as a cookie
            await this.$apolloHelpers.onLogin(jwt)
            // set isConnedted store variable
            this.toggle()
            this.isLoading = false
            // redirect user to homepage
            this.$router.push(this.localePath('index'))
          })
          .catch((err) => {
            err.inner?.forEach((error: Errors) => {
              ;(this.errors as Errors)[error.path] = error.message
            })
            this.isLoading = false
          })
      } catch (e) {
        // console.error(e)
      }
    },
  },
})
</script>

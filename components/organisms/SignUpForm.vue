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
              <form name="signUpForm" novalidate @submit.prevent="signUp()">
                <!-- Email -->
                <input-field
                  v-model="form.email"
                  label-id="email"
                  :label="$t('SignUpForm.labels.email')"
                  :placeholder="$t('SignUpForm.placeholders.email')"
                  type="email"
                  :icon="['fas', 'envelope']"
                  :required="true"
                  name="email"
                  :error="errors.email"
                  @blur="validate(['email'])"
                  @input="validate(['email'])"
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
                  name="password"
                  :error="errors.password"
                  @blur="validate(['password', 'confirmPassword'])"
                  @input="validate(['password', 'confirmPassword'])"
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
                  name="confirmPassword"
                  :error="errors.confirmPassword"
                  @blur="validate(['confirmPassword', 'password'])"
                  @input="validate(['confirmPassword', 'password'])"
                />

                <div class="form-check mb-4">
                  <input
                    id="defaultCheck6"
                    class="form-check-input"
                    type="checkbox"
                    :checked="form.terms"
                    name="terms"
                    @change=";(form.terms = !form.terms), validate(['terms'])"
                  />
                  <label class="form-check-label" for="defaultCheck6">
                    <i18n path="SignUpForm.term1">
                      <a href="#">{{ $t('SignUpForm.term2') }}</a>
                    </i18n>
                  </label>
                  <div class="invalid-feedback">{{ $t(errors.terms) }}</div>
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
import { object, string, boolean, ref } from 'yup'

import createUserMutation from '~/gql/mutations/createUser.gql'

// Create a yup schema to check form fields validity with
// Customs errors messages are i18n keys
const signUpFormSchema = object().shape({
  email: string()
    .required('SignUpForm.errors.email.required')
    .email('SignUpForm.errors.email.invalid')
    .lowercase(),
  password: string()
    .min(6, 'SignUpForm.errors.password.short')
    .max(128, 'SignUpForm.errors.password.long')
    .required('SignUpForm.errors.password.required'),
  confirmPassword: string()
    .oneOf([ref('password'), ''], 'SignUpForm.errors.confirmPassword.match')
    .required('SignUpForm.errors.confirmPassword.required'),
  terms: boolean().oneOf([true], 'SignUpForm.errors.terms.checked'),
})

interface Errors {
  [key: string]: string
}

export default Vue.extend({
  name: 'SignUpForm',
  data: () => ({
    form: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    errors: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    },
    isLoading: false,
  }),
  async mounted() {
    // clear apollo-token from cookies to make sure user is fully logged out
    await this.$apolloHelpers.onLogout()
    window.localStorage.removeItem('vuex')
  },
  methods: {
    validate(fields: Array<string>) {
      // use the yup schema created to check a single field validity
      fields.forEach((field) => {
        signUpFormSchema
          .validateAt(field, this.form)
          .then(() => {
            // When the field is valid we clean the error message
            ;(this.errors as Errors)[field] = ''
          })
          .catch((err) => {
            // When the field is invalid we setup the given error message
            ;(this.errors as Errors)[field] = err.message
          })
      })
    },
    signUp() {
      try {
        this.isLoading = true
        // check form validity
        signUpFormSchema
          .validate(this.form, { abortEarly: false })
          .then(async () => {
            // Create user
            await this.$apollo.mutate({
              mutation: createUserMutation,
              variables: {
                username: this.form.email,
                email: this.form.email,
                password: this.form.password,
              },
            })
            this.isLoading = false
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
